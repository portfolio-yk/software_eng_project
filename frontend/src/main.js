import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // 아까 만든 라우터 연결

const app = createApp(App)

app.use(createPinia()) // Pinia(로그인 상태 관리) 사용
app.use(router)        // 라우터(페이지 이동) 사용

app.mount('#app')