<template>
    <div>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="비밀번호" label-width="120px"> 
            <el-input v-model="member.userpw" style="width:300px;" show-password></el-input>
        </el-form-item>
        </el-form>

         <el-form ref="member" style="margin-top:30px">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary" @click="handleDelete">탈퇴</el-button>
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
                    userpw:'',
                },

                token : sessionStorage.getItem("TOKEN"), //누구인지 정보를 주기위해
            }
        },

        methods:{
            async handleDelete(){
                
                if(this.member.userpw ===""){
                    alert('비밀번호를 입력하세요.');
                    this.$refs.member.userpw.focus();
                    return false;
                }
                const ret = confirm('정말 탈퇴하시겠습니까?');

                if(ret){
                // 백엔드에서 token 검증
                const url = `/member/mypage?menu=3`;

                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token 
                }

                const body = this.member

                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response.data);
                
                if(response.data.status === 200){
                    alert('탈퇴되었습니다.');
                    // 1. 토큰 삭제
                    // 2. 페이지 이동
                    // 3. App.vue의 메뉴 활성화
                    this.$router.push({name:"Logout"});
                   
                }
            }
        }
    }    
}
</script>

<style scoped>

</style>