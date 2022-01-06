<template>
    <div>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="비밀번호" label-width="120px"> 
            <el-input v-model="member.userpw3" style="width:300px;" show-password></el-input>
        </el-form-item>
        </el-form>

         <el-form ref="member" style="margin-top:30px">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary" @click="getOut">탈퇴</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                member:{
                    name:'',
                    email:'',
                    mail:'',
                    userpw:'',
                    userpw1:'',
                    userpw2:'',
                    userpw3:'',
                },

                emailoption : ['hanmail.net', 'naver.com', 'gmail.com'],
                token : sessionStorage.getItem("TOKEN"), //누구인지 정보를 주기위해
            }
        },

        methods:{
            async getOut(){

                if(this.member.userpw3 ===""){
                    alert('비밀번호를 입력하세요.');
                    this.$refs.member.userpw3.focus();
                    return false;
                }
                // 백엔드에서 token 검증
                const url = '주소'

                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token 
                };

                const body = {
                    userpw3 : this.member.userpw3,
                };

                const response = await this.axios.delete(url, body, {headers:headers});
                console.log(response);
            }
        }
        
    }
</script>

<style scoped>

</style>