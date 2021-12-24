// node_modules로부터 필요한 라이브러리 import
import { createRouter, createWebHistory } from "vue-router";

// 추가하고자 하는 컴포넌트들
import Home from '@/components/Home.vue';
import Join from '@/components/Join.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Mypage from '@/components/Mypage.vue';
// import Admin from '@/components/Admin.vue';
import Board from '@/components/Board.vue';


// URL과 컴포넌트의 연결
const routes = [
    
    { path : '/', redirect:'/home' },
    { path : '/home', name:'Home', component:Home },
    { path : '/join', name:'Join', component:Join },
    { path : '/login', name:'Login', component:Login },
    { path : '/logout', name:'Logout', component:Logout },
    { path : '/mypage', name:'Mypage', component:Mypage },
    // { path : '/admin', name:'Admin', component:Admin },
    { path : '/board', name:'Board', component:Board },
]


// 실제 라우트 적용
const router = createRouter({
    //localhost:8080/login
    //localhost:8080/#login
    history : createWebHistory(), 
    routes,
});

// 프로젝트에서 적용하기 위해
export default router;