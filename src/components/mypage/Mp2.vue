<template>
    <div>

         <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="현재 비밀번호" label-width="200px"> 
            <el-input v-model="member.userpw" style="width:300px;" show-password></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="변경할 비밀번호" label-width="200px"> 
            <el-input v-model="member.userpw1" style="width:300px;" show-password></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="변경할 비밀번호 확인" label-width="200px"> 
            <el-input v-model="member.userpw2" style="width:300px;" show-password></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-top:30px">
            <el-form-item label=" " label-width="200px"> 
            <el-button type="primary" @click="handleUpdate">수정</el-button>
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
                    userpw1:'',
                    userpw2:'',
                },

                token : sessionStorage.getItem("TOKEN"), //누구인지 정보를 주기위해
            }
        },

        methods:{
            async handleUpdate(){

                if(this.member.userpw ===""){
                    alert('비밀번호를 입력하세요.');
                    this.$refs.member.userpw.focus();
                    return false;
                }

                if(this.member.userpw1 ===""){
                    alert('변경할 비밀번호를 입력하세요.');
                    this.$refs.member.userpw1.focus();
                    return false;
                }

                 if(this.member.userpw2 ===""){
                    alert('변경할 비밀번호를 한번 더 입력하세요.');
                    this.$refs.member.userpw2.focus();
                    return false;
                } 

                if(this.member.userpw1 !== this.member.userpw2) {
                        alert('암호가 일치하지 않습니다.')
                        this.$refs.member.userpw1.focus();
                        return false;
                }
                
                // 백엔드에서 token 검증
                const url = `/member/mypage?menu=2`;

                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token 
                };

                const body = this.member;

                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response.data);
                
                if(response.data.status === 200){
                    alert('수정되었습니다.');
                    this.member.userpw = '';
                    this.member.userpw1 = '';
                    this.member.userpw2 = '';
                }
            }
        }
        
    }
</script>

<style scoped>

</style>