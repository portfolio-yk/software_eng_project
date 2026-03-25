<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h2>학생 관리 시스템</h2>
        <p>환영합니다! 아이디와 비밀번호를 입력해주세요.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="login_id">아이디</label>
          <input 
            type="text" 
            id="login_id"
            v-model="login_id" 
            placeholder="아이디를 입력하세요" 
            required
          />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            placeholder="비밀번호를 입력하세요" 
            required
          />
        </div>

        <button type="submit" class="login-btn">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const login_id = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      login_id: login_id.value,
      password: password.value
    });
    
    if (res.data.success) {
      authStore.login({
        user_id: res.data.user_id,
        role: res.data.role,
        name: res.data.name
      });
      router.push('/'); 
    }
  } catch (error) {
    alert('로그인 실패: ' + (error.response?.data?.message || error.message));
  }
};
</script>

<style scoped>
/* 화면 전체를 채우고 가운데 정렬 */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* App.vue의 패딩을 고려해 살짝 줄임 */
}

/* 하얀색 로그인 카드 디자인 */
.login-card {
  background: white;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
}

/* 제목 영역 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 700;
}

.login-header p {
  margin-top: 8px;
  color: #777;
  font-size: 14px;
}

/* 폼 요소 정렬 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 입력창 그룹 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: #555;
}

/* 입력창 디자인 */
.input-group input {
  padding: 14px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease; /* 부드러운 전환 효과 */
}

/* 입력창 클릭(포커스) 시 효과 */
.input-group input:focus {
  outline: none;
  border-color: #4A90E2; /* 파란색 테두리 */
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

/* 로그인 버튼 디자인 */
.login-btn {
  margin-top: 10px;
  padding: 14px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 버튼 마우스 오버 효과 */
.login-btn:hover {
  background-color: #357ABD;
}

/* 폼 기본 제출(엔터 등) 시 버튼 클릭되도록 설정 */
button:focus {
  outline: none;
}
</style>