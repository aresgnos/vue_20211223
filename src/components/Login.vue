<template>
    <div>
       
   

    
    <h3>로그인</h3>

    <el-form :inline="true"  class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="아이디" label-width="120px">
      <el-input v-model="member.userid" placeholder="아이디"></el-input>
    </el-form-item>
    </el-form>
    
    <el-form :inline="true"  class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호" label-width="120px">
      <el-input v-model="member.userpw" placeholder="암호"></el-input>
    </el-form-item>
     </el-form>

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
        <el-form-item label=" " label-width="120px">
        <el-button type="primary" @click="handleLogin">로그인</el-button>
        </el-form-item>
    </el-form>


    </div>
</template>

<script>
import {useStore} from 'vuex';

    export default {
        methods:{
            handleLogin(){
                this.token = '43987f398j3fu..생략..98h3r8';
                sessionStorage.setItem("TOKEN", this.token);
                
                alert('로그인 되었습니다.');
                
                this.store.commit('setMenu', 'home');

                // 부모컴포넌트로 이벤트를 발생시킴 
                // (이벤트명은 changeLogged('home'))
                // changelogged라는 페이지를 home으로 조작할 수 있다.
                // this.$emit('changeLogged','home'); 위에 cost~가 대체       
            }
        },

        data (){
            return {
                member : {
                    userid : '',
                    userpw : '',
                    token : '', /* 로그인 성공시에 발행되는 인증키 */
                },
                store : useStore()
            }
        }
        
    }
</script>

<style scoped>

</style>