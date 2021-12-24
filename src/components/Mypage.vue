<template>
    <div>

    <h3>마이페이지</h3>
    
    <el-tabs>
    <el-tab-pane label="정보 수정">
        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="이름" label-width="120px"> 
            <el-input v-model="member.name" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" :inline="true" style="margin-top:30px;" >
            <el-form-item label="이메일" label-width="120px"> 
            <el-input v-model="member.email" style="width:300px;"></el-input>
            <el-form-item label=" ">
            <label>@</label>
            </el-form-item>    
            
            <el-select v-model="member.mail" placeholder="이메일을 선택해주세요.">
                <el-option v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                </el-option>
            </el-select>
        
        </el-form-item>
        </el-form>

        
        <el-form ref="member">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary" @click="nameChange">수정</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>
    </el-tab-pane>
    


    <el-tab-pane label="비밀번호 변경">
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
            <el-button type="primary" @click="changePw">수정</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>


    </el-tab-pane>
    <el-tab-pane label="회원 탈퇴">
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

    </el-tab-pane>

  </el-tabs>


    
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
            async nameChange(){

                if(this.member.name ===""){
                    alert('이름을 입력하세요.');
                    this.$refs.member.name.focus();
                    return false;
                }
                 if(this.member.email ===""){
                    alert('이메일을을 입력하세요.');
                    this.$refs.member.email.focus();
                    return false;
                }

                // 유효성 검사(화면에서 1차 검증, 데이터가 제대로 입력됐는지)
                // 유효성 검사는 백엔드에 넘기기 전에 해야한다.

                // 유효성 검사가 완료된 시점에
                // restful 이해도가 높은
                const url = '주소'
                // 백엔드에서 token 검증
                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token 
                };

                const body = {
                    name : this.member.name,
                    email : this.member.email+"@"+this.member.mail
                };

                //get(조회), post(추가), put(수정), delete(삭제)
                //조회 : await this.axios.get(url, body, {headers:headers});
                //추가 : await this.axios.post(url, body, {headers:headers});
                //수정 : await this.axios.put(url, body, {headers:headers});
                //삭제 : await this.axios.delete(url, body, {headers:headers});

                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response);
            },
            
            async changePw(){

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
                const url = '주소'

                const headers = {
                    "Content-Type":"application/json",
                    "TOKEN": this.token 
                };

                const body = {
                    userpw : this.member.userpw,
                    userpw1 : this.member.userpw1,
                    userpw2 : this.member.userpw2,
                };

                const response = await this.axios.put(url, body, {headers:headers});
                console.log(response);
            },

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
            },



        }
        
    }
</script>

<style scoped>

</style>