<template>
  <div v-if="student">
    <button @click="router.push('/')">← 목록으로 돌아가기</button>
    <h2>🧑‍🎓 {{ student.name }} 학생 상세 정보</h2>

    <EditableSection 
      title="성적 관리 (Grades)" 
      :canEdit="authStore.user.role === 'teacher'"
      @save="saveGrades"
      @add-row="addNewGrade"
      v-slot="{ isEditing }"
    >
      <table class="detail-table">
        <thead>
          <tr>
            <th>과목</th>
            <th>점수</th>
            <th>학부모 공개 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(grade, index) in grades" :key="index">
            <td>
              <span v-if="!isEditing">{{ grade.subject_name }}</span>
              <input v-else v-model="grade.subject_name" />
            </td>
            <td>
              <span v-if="!isEditing">{{ grade.score }}</span>
              <input v-else type="number" v-model="grade.score" />
            </td>
            <td>
              <SharedToggle v-model="grade.parent_YN" :disabled="!isEditing" />
            </td>
          </tr>
        </tbody>
      </table>
    </EditableSection>
  </div>
  <div v-else>로딩 중...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import EditableSection from '../components/EditableSection.vue';
import SharedToggle from '../components/SharedToggle.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const student = ref(null);
const grades = ref([]);

onMounted(async () => {
  const studentId = route.params.id; // URL에서 학생 ID 가져오기
  
  // TODO: 실제 백엔드 API에서 학생 정보와 성적을 불러와야 합니다.
  // 임시 더미 데이터로 작동 확인
  student.value = { name: "테스트 학생" };
  grades.value = [
    { subject_name: "수학", score: 95, parent_YN: "Y" },
    { subject_name: "영어", score: 88, parent_YN: "N" }
  ];
});

const addNewGrade = () => {
  grades.value.push({ subject_name: "", score: 0, parent_YN: "N" });
};

const saveGrades = async () => {
  alert("성적 데이터가 저장되었습니다! (백엔드 연동 필요)");
  // TODO: axios.post로 백엔드에 수정된 grades.value 전송
};
</script>

<style scoped>
.detail-table { width: 100%; border-collapse: collapse; }
.detail-table th, .detail-table td { padding: 10px; border-bottom: 1px solid #eee; text-align: left; }
.detail-table input { padding: 5px; width: 90%; }
</style>