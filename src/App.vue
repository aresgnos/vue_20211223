<template>
  <div>

    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo"
            mode="horizontal" @select="handleSelect" router="ture"> 
            <el-menu-item index="home">홈</el-menu-item>

            <el-menu-item index="login" v-if="!logged">로그인</el-menu-item>
            <el-menu-item index="logout" v-if="logged">로그아웃</el-menu-item>
            <el-menu-item index="join">회원가입</el-menu-item>
            <el-menu-item index="mypage" v-if="logged">마이페이지</el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <router-view @changeLogged="changeLogged"></router-view>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>


  </div>
</template>

<script>
  export default {
    // 생명주기
    created(){
      const tmp = sessionStorage.getItem("activeIndex");
      console.log('created');

      // 초기상태에 아무것도 없어서=null이므로 100으로 설정
      if(tmp===null){
        this.activeIndex='/home';
        this.$router.push({path:'/home'});
      }
      else {
        this.activeIndex = tmp;
      }
    },
    mounted(){
      console.log('mounted');
      
    },
    updated(){
      console.log('updated');
    },

    data(){
      return{
        activeIndex : '',
        logged : false,
      }
    },

    methods:{
      handleSelect(idx){
        console.log('App.vue => handleSelect', idx);

        if(idx === 'join') {
          this.$router.push({name:'Join'});
        }
        else if(idx === 'home') {
          this.$router.push({name:'Home'});
        }
        else if(idx === 'login') {
          this.$router.push({name:'Login'});
        }
        else if(idx === 'logout') {
          this.$router.push({name:'Logout'});
        }
        else if(idx === 'mypage') {
          this.$router.push({name:'Mypage'});
        }
        
        // 세션장소에 현재의 메뉴의 index를 저장
        sessionStorage.setItem('activeIndex', idx);
      },

      changeLogged() { // 현재 로그인 상태를 확인하기
        const token = sessionStorage.getItem("TOKEN");
        if (token === null){
          this.logged = false;
        }
        else {
          this.logged = true;
        }
        this.activeIndex = '100';
      }
    }
    
  }
</script>

<style>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
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