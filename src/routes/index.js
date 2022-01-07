// node_modules로부터 필요한 라이브러리 import
import { createWebHashHistory, createRouter } from "vue-router";

// 추가하고자 하는 컴포넌트들
import Home from '@/components/Home.vue';
import Join from '@/components/Join.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Mypage from '@/components/Mypage.vue';
import Board from '@/components/Board.vue';
import BoardOne from '@/components/BoardOne.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import Seller from '@/components/Seller.vue';
import InsertItem from '@/components/InsertItem.vue';
import ItemContent from '@/components/ItemContent.vue';
import ItemInsertBatch from '@/components/ItemInsertBatch.vue';
import ItemUpdateBatch from '@/components/ItemUpdateBatch.vue';
import Admin from '@/components/Admin.vue';


// URL과 컴포넌트의 연결
const routes = [
    
    { path : '/', redirect:'/home' },
    { path : '/home', name:'Home', component:Home },
    { path : '/join', name:'Join', component:Join },
    { path : '/login', name:'Login', component:Login },
    { path : '/logout', name:'Logout', component:Logout },
    { path : '/mypage', name:'Mypage', component:Mypage },
    { path : '/admin', name:'Admin', component:Admin },
    { path : '/board', name:'Board', component:Board },
    { path : '/boardone', name:'BoardOne', component:BoardOne },
    { path : '/boardwrite', name:'BoardWrite', component:BoardWrite },
    { path : '/seller', name:'Seller', component:Seller },
    { path : '/insertitem', name:'InsertItem', component:InsertItem },
    { path : '/itemcontent', name:'ItemContent', component:ItemContent },
    { path : '/iteminsertbatch', name:'ItemInsertBatch', component:ItemInsertBatch },
    { path : '/itemupdatebatch', name:'ItemUpdateBatch', component:ItemUpdateBatch },



]


// 실제 라우트 적용
const router = createRouter({
    //localhost:8080/login
    //localhost:8080/#login
    history : createWebHashHistory(), 
    routes,
});

// 프로젝트에서 적용하기 위해
export default router;