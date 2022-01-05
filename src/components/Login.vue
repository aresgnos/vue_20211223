<template>
    <div>
    
    <h3>로그인</h3>

    {{member}}

    <el-form :inline="true"  class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="아이디" label-width="120px">
      <el-input v-model="member.uid" placeholder="아이디"></el-input>
    </el-form-item>
    </el-form>
    
    <el-form :inline="true"  class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호" label-width="120px">
      <el-input v-model="member.upw" show-password placeholder="암호"></el-input>
    </el-form-item>
     </el-form>

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
        <el-form-item label=" " label-width="120px">
        <el-button type="primary" @click="handleLogin">로그인</el-button>
        <el-button type="primary" @click="handleHome">홈</el-button>
        </el-form-item>
    </el-form>

    


    </div>
</template>

<script>
import {useStore} from 'vuex';

    export default {
        methods:{

            handleHome(){
                this.$router.push({name:'Home'});

                // App.vue로 메뉴가 변경된 것을 통보해야함.
                // App.vue가 상단 메뉴를 바꾸게 됨.
                this.store.commit('setMenu', 'home');
            },

            async handleLogin(){
                
                const url = `/member/select`;
                const headers = {"Content-type":"application/json"};
                const body = this.member;

                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    alert('로그인 되었습니다.');

                    // 1. 토큰을 저장소에 보관
                    sessionStorage.setItem("TOKEN", response.data.result.token);

                    // 2. 홈으로 이동한다.
                    this.$router.push({name:'Home'});

                    // 3. App.vue에 메뉴의 상태를 통지함.
                    this.store.commit('setMenu', 'home');
                }
                else{
                    alert('아이디 또는 암호가 틀립니다.');
                }

                // this.token = '43987f398j3fu..생략..98h3r8';
                // sessionStorage.setItem("TOKEN", this.token);
                
                // alert('로그인 되었습니다.');
                
                // this.store.commit('setMenu', 'home');

                // 부모컴포넌트로 이벤트를 발생시킴 
                // (이벤트명은 changeLogged('home'))
                // changelogged라는 페이지를 home으로 조작할 수 있다.
                // this.$emit('changeLogged','home'); 위에 cost~가 대체       
            }
        },

        data (){
            return {
                member : {
                    uid : '',
                    upw : '',
                    token : '', /* 로그인 성공시에 발행되는 인증키 */
                },
                store : useStore()
            }
        }
        
    }
</script>

<style scoped>

</style>