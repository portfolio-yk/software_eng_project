<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* 웹사이트 전체 기본 스타일 (선택사항) */
body {
  margin: 0;
  padding: 0;
  background-color: #f4f7f6; /* 눈이 편안한 옅은 회색 배경 */
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

#app {
  max-width: 1200px; /* 화면이 너무 넓어지지 않게 고정 */
  margin: 0 auto;    /* 가운데 정렬 */
  padding: 20px;
}
</style>