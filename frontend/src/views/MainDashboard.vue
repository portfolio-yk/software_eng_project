<template>
  <div class="dashboard">
    <div class="header">
      <h2>👋 {{ authStore.user?.name }}님, 환영합니다 ({{ authStore.user?.role === 'teacher' ? '교사' : '학부모' }})</h2>
      <div class="actions">
        <button @click="router.push('/counseling')" class="counsel-btn">상담 내역 보기</button>
        <button @click="logout">로그아웃</button>
      </div>
    </div>

    <div class="filter-bar">
      <input type="text" placeholder="학생 이름 검색..." v-model="searchQuery" />
    </div>

    <StudentTable :students="filteredStudents" @row-click="goToDetail" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import StudentTable from '../components/StudentTable.vue';

const students = ref([]);
const searchQuery = ref('');
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/api/students', {
    params: { role: authStore.user.role, user_id: authStore.user.user_id }
  });
  students.value = res.data;
});

// 검색 필터링 로직
const filteredStudents = computed(() => {
  return students.value.filter(s => s.name.includes(searchQuery.value));
});

const goToDetail = (studentId) => {
  router.push(`/student/${studentId}`);
};

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.counsel-btn { background: #9b59b6; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-right: 10px; cursor: pointer; }
.filter-bar { margin-bottom: 15px; }
.filter-bar input { padding: 10px; width: 300px; border: 1px solid #ddd; border-radius: 4px; }
</style>