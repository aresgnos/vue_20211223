<template>
  <div>

    
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo" mode="horizontal" :router ="true"> 
            <el-menu-item index="home" ref="home">홈</el-menu-item>
            <el-menu-item index="login" ref="login" v-show="!logged">로그인</el-menu-item>
            <el-menu-item index="join" ref="join" v-show="!logged">회원가입</el-menu-item>

            <el-menu-item index="logout" ref="logout" v-show="logged">로그아웃</el-menu-item>
            <el-menu-item index="mypage" ref="mypage" v-show="logged">마이페이지</el-menu-item>

            <el-menu-item index="board" ref="board">게시판</el-menu-item>
            <el-menu-item index="seller" ref="seller">판매자</el-menu-item>
            <el-menu-item index="admin" ref="admin">관리자</el-menu-item>
        </el-menu>
      </el-header>

      <!-- v-if는 태그를 생성시키지 않음
      v-show는 태그를 생성, 숨김으로 -->

      <el-main>
        <router-view @changeLogged="changeLogged"></router-view>
      </el-main>
    </el-container>
      <el-footer>Footer</el-footer>
    
   

  </div>
</template>

<script>
import {useStore} from 'vuex';

  export default {
    // 가장 먼저 호출됨, 태그 생성이 완료가 안돼서 태그를 찾거나 클릭이 불가능
    // DOM 접근 불가능 좋은 예는, 백엔드로부터 데이터를 받는 것까지.
    created(){

    },
    
    // DOM 접근이 가능 ex) 태그를 조작, 클릭 등을 수행
    mounted(){
      // localhaost:8080/abc (주소를 찾는 것)
      console.log(window.location.pathname.substr(1));
      const path = window.location.pathname.substr(1); // 슬러시 앞이 생략된 주소를 찾아줌
      this.changeLogged(path);
      // console.log(path);


      // store가 변화할 때 자동으로 수행
      this.store.subscribe((mutation, state)=>{
        console.log(mutation, state);
        
        // 로그인에서 this.store.commit('setMenu', 'home');로 보내면
        if(mutation.type==='setMenu'){
          const tmp = mutation.payload; //"home"
          this.changeLogged(tmp);
          }
      });
    },
      
      // 메소드 -> 로그인 됐는지 안됐는지 체크해서 메뉴를 변경(로그인, 로그아웃)
      // path 클릭을 해야되는 메뉴의 종류를 전달


    data(){
      return{
        logged : false,
        store : useStore(),

      }
    },

    methods:{

      changeLogged(path) { // 현재 로그인 상태를 확인하기
      console.log('changeLogged', path);

        // 세션 저장소로부터 토큰값(인증키)을 읽음
        const token = sessionStorage.getItem("TOKEN");

        if (token === null){ // 로그인을 못 했음
          this.logged = false; // state 변수에 logged를 거짓
        }
        else {
          this.logged = true;
        }

        // 클릭 방식으로 메뉴 활성화
        if(typeof this.$refs[path] !== 'undefined' ){
        this.$refs[path].$el.click();
        }

          // this.$refs.home.click(); === this.$refs['home'].click();
          // this.$refs.login.click(); === this.$refs['login'].click();
          // this.$refs.path.click(); === this.$refs[path].click(); = path 안에 있는걸 찾는다.
        
      }
    }
  }
</script>

<style>


.el-header {
  background-color: #EAD3CB;
}
.el-footer {
  background-color: #90AACB;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #EAD3CB;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  /* text-align: center;
  line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>