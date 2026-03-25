import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth' // Pinia 로그인 스토어
import LoginView from '../views/LoginView.vue'
import MainDashboard from '../views/MainDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'main',
      component: MainDashboard,
      meta: { requiresAuth: true } // 로그인이 필요한 페이지 표시
    },
    {
      path: '/student/:id', // :id 부분에 학생 ID가 들어갑니다
      name: 'studentDetail',
      component: () => import('../views/StudentDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/counseling',
      name: 'counselingList',
      component: () => import('../views/CounselingList.vue'), // 이 파일도 껍데기만 하나 만들어주세요!
      meta: { requiresAuth: true }
    }
  ]
})

// 네비게이션 가드: 로그인 안 한 사용자가 메인 페이지로 가려고 하면 로그인 창으로 튕겨냄
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.user) {
    next('/login') // 로그인 안 했으면 로그인 페이지로
  } else {
    next() // 통과
  }
})

export default router