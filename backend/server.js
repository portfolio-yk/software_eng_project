const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB 연결 설정
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db('student_management'); // 만든 데이터베이스 이름
  console.log("✅ MongoDB 연결 성공!");
}
connectDB();

// 1. 로그인 API
app.post('/api/login', async (req, res) => {
  const { login_id, password } = req.body;
  
  console.log(login_id, password);
  // users 컬렉션에서 유저 찾기 (실제론 비밀번호 암호화 필수!)
  const allUsers = await db.collection('users').find().toArray();
  console.log("🚨 현재 DB에 저장된 전체 유저 목록:", allUsers);

  const user = await db.collection('users').findOne({ login_id, password });
  
  if (user) {
    res.json({ success: true, user_id: user._id, role: user.role, name: user.name });
  } else {
    res.status(401).json({ success: false, message: "아이디나 비밀번호가 틀렸습니다." });
  }
});

// 2. 메인 페이지 - 학생 목록 API (권한별 분기)
// 2. 메인 페이지 - 학생 목록 API (권한별 분기 + Users 테이블 조인)
app.get('/api/students', async (req, res) => {
  const { role, user_id } = req.query;

  try {
    // 💡 학생과 유저 정보를 합치는 공통 파이프라인 (Join 로직)
    const lookupPipeline = [
      {
        $lookup: {
          from: 'users',           // 합칠 대상 컬렉션
          localField: 'user_id',   // students 컬렉션의 필드
          foreignField: '_id',     // users 컬렉션의 필드
          as: 'user_info'          // 합쳐진 데이터를 담을 배열 이름
        }
      },
      { $unwind: '$user_info' },   // 배열을 풀어서 객체로 변환
      {
        $addFields: {
          name: '$user_info.name'  // 프론트에서 쓰기 편하게 바로 name 필드로 꺼냄
        }
      },
      {
        $project: {
          user_info: 0             // 불필요한 전체 user_info 객체는 빼고 전송 (용량 최적화)
        }
      }
    ];

    if (role === 'teacher') {
      // 교사: 모든 학생 데이터 + 이름 조회
      const students = await db.collection('students').aggregate(lookupPipeline).toArray();
      res.json(students);

    } else if (role === 'parent') {
      // 학부모: 내 자녀만 필터링한 후 + 이름 조회
      const parent = await db.collection('parents').findOne({ user_id: new ObjectId(user_id) });
      if (!parent || !parent.student_ids || parent.student_ids.length === 0) {
        return res.json([]);
      }
      
      // 학부모용 파이프라인: 조건(match)을 먼저 걸고 조인(lookup) 실행
      const parentPipeline = [
        { $match: { _id: { $in: parent.student_ids } } },
        ...lookupPipeline
      ];
      
      const students = await db.collection('students').aggregate(parentPipeline).toArray();
      res.json(students);

    } else {
      res.status(403).json({ message: "권한이 없습니다." });
    }
  } catch (error) {
    console.error("학생 목록 조회 에러:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 서버가 http://localhost:3000 에서 실행 중입니다.');
});