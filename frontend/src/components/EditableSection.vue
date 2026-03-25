<template>
  <div class="section-card">
    <div class="section-header">
      <h3>{{ title }}</h3>
      <div>
        <button v-if="!isEditing && canEdit" @click="isEditing = true">수정하기</button>
        <button v-if="isEditing" @click="saveData" class="save-btn">저장</button>
        <button v-if="isEditing" @click="cancelEdit">취소</button>
      </div>
    </div>
    
    <slot :isEditing="isEditing"></slot>
    
    <button v-if="isEditing" class="add-btn" @click="$emit('add-row')">+ 항목 추가</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps(['title', 'canEdit']);
const emit = defineEmits(['save', 'add-row']);

const isEditing = ref(false);

const saveData = () => {
  emit('save');
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
  // 실제로는 원본 데이터로 되돌리는 로직이 필요합니다.
};
</script>

<style scoped>
.section-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 20px; }
.section-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }
.section-header h3 { margin: 0; color: #333; }
button { padding: 6px 12px; margin-left: 5px; border-radius: 4px; border: 1px solid #ddd; cursor: pointer; background: white; }
.save-btn { background: #4CAF50; color: white; border: none; }
.add-btn { width: 100%; margin-top: 10px; padding: 10px; background: #f8f9fa; border: 1px dashed #ccc; cursor: pointer; }
</style>