<template>
  <div class="counseling-container">
    <div class="header">
      <button class="back-btn" @click="router.push('/')">← 메인으로 돌아가기</button>
      <h2>💬 전체 상담 내역</h2>
    </div>

    <div class="filter-section">
      <div class="filter-group">
        <label>학생 이름 검색</label>
        <input type="text" v-model="searchName" placeholder="학생 이름 입력..." />
      </div>
      
      <div class="filter-group">
        <label>날짜 필터</label>
        <div class="date-inputs">
          <input type="date" v-model="startDate" />
          <span>~</span>
          <input type="date" v-model="endDate" />
        </div>
      </div>
    </div>

    <div class="table-container">
      <table class="counseling-table">
        <thead>
          <tr>
            <th>상담 일자</th>
            <th>학생 이름</th>
            <th>상담 주요 내용</th>
            <th>다음 계획</th>
            <th>학부모 공유</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredCounselings" :key="item._id">
            <td>{{ item.counseling_date.substring(0, 10) }}</td>
            <td>{{ item.student_name }}</td>
            <td class="content-cell">{{ item.main_content }}</td>
            <td class="content-cell">{{ item.next_plan }}</td>
            <td>
              <span :class="['badge', item.shared_with_parent_YN === 'Y' ? 'badge-y' : 'badge-n']">
                {{ item.shared_with_parent_YN === 'Y' ? '공개' : '비공개' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="filteredCounselings.length === 0" class="empty-msg">조건에 맞는 상담 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import axios from 'axios';

const router = useRouter();

// 필터 상태
const searchName = ref('');
const startDate = ref('');
const endDate = ref('');

// 상담 데이터 (실제로는 백엔드에서 가져와야 함)
const counselings = ref([]);

onMounted(async () => {
  // TODO: 실제 백엔드 연동 시 아래 코드를 사용합니다.
  // const res = await axios.get('http://localhost:3000/api/counselings');
  // counselings.value = res.data;

  // 화면 테스트를 위한 임시 더미 데이터 (백엔드 연결 전까지 눈으로 확인하기 위함)
  counselings.value = [
    {
      _id: "1",
      counseling_date: "2026-03-20T10:00:00.000Z",
      student_name: "김철수",
      main_content: "수학 성적 하락에 대한 원인 분석 및 상담",
      next_plan: "방과 후 보충 수업 참여 독려",
      shared_with_parent_YN: "Y"
    },
    {
      _id: "2",
      counseling_date: "2026-03-24T14:30:00.000Z",
      student_name: "이영희",
      main_content: "교우 관계 문제로 인한 스트레스 호소",
      next_plan: "1주일 뒤 2차 상담 진행, 주의 깊게 관찰",
      shared_with_parent_YN: "N"
    }
  ];
});

// 이름 검색과 날짜 필터링이 동시에 적용되는 마법의 computed 속성!
const filteredCounselings = computed(() => {
  return counselings.value.filter(item => {
    // 1. 이름 필터
    const matchName = item.student_name.includes(searchName.value);
    
    // 2. 날짜 필터 (문자열 비교를 위해 T 앞의 날짜부분만 자름)
    const itemDate = item.counseling_date.substring(0, 10);
    let matchDate = true;
    
    if (startDate.value && endDate.value) {
      matchDate = itemDate >= startDate.value && itemDate <= endDate.value;
    } else if (startDate.value) {
      matchDate = itemDate >= startDate.value;
    } else if (endDate.value) {
      matchDate = itemDate <= endDate.value;
    }

    return matchName && matchDate;
  });
});
</script>

<style scoped>
.counseling-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 15px; }
.back-btn { padding: 8px 12px; border: 1px solid #ddd; background: #fff; border-radius: 4px; cursor: pointer; }
.back-btn:hover { background: #f8f9fa; }
h2 { margin: 0; color: #333; }

/* 필터 영역 스타일 */
.filter-section { display: flex; gap: 30px; background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
.filter-group { display: flex; flex-direction: column; gap: 8px; }
.filter-group label { font-size: 13px; font-weight: bold; color: #555; }
.filter-group input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
.date-inputs { display: flex; align-items: center; gap: 10px; }

/* 테이블 스타일 */
.table-container { overflow-x: auto; }
.counseling-table { width: 100%; border-collapse: collapse; }
.counseling-table th, .counseling-table td { padding: 12px; border-bottom: 1px solid #eee; text-align: left; }
.counseling-table th { background-color: #f1f3f5; font-weight: 600; color: #444; }
.content-cell { max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* 뱃지(토글 상태) 스타일 */
.badge { padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; }
.badge-y { background: #e6f4ea; color: #1e8e3e; }
.badge-n { background: #fce8e6; color: #d93025; }

.empty-msg { text-align: center; padding: 30px; color: #888; }
</style>