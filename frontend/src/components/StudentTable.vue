<template>
  <div class="table-container">
    <table class="student-table">
      <thead>
        <tr>
          <th>학년</th>
          <th>반</th>
          <th>번호</th>
          <th>이름</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student._id">
          <td>{{ student.grade_year }}</td>
          <td>{{ student.class_num }}</td>
          <td>{{ student.student_num }}</td>
          <td>{{ student.name }}</td>
          <td>
            <button class="detail-btn" @click="$emit('row-click', student._id)">상세보기</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="students.length === 0" class="empty-msg">조회된 학생이 없습니다.</p>
  </div>
</template>

<script setup>
defineProps({
  students: {
    type: Array,
    required: true
  }
});
defineEmits(['row-click']);
</script>

<style scoped>
.table-container { overflow-x: auto; }
.student-table { width: 100%; border-collapse: collapse; margin-top: 10px; background: white; }
.student-table th, .student-table td { padding: 12px; border-bottom: 1px solid #ddd; text-align: center; }
.student-table th { background-color: #f8f9fa; font-weight: 600; }
.detail-btn { padding: 6px 12px; background: #4A90E2; color: white; border: none; border-radius: 4px; cursor: pointer; }
.empty-msg { text-align: center; padding: 20px; color: #777; }
</style>