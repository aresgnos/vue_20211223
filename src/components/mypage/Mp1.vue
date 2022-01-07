<template>
    <div>
        {{member}}
        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="나이" label-width="120px"> 
            <el-input v-model="member.userage" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" :inline="true" style="margin-top:30px;" >
            <el-form-item label="이메일" label-width="120px"> 
            <el-input v-model="member.useremail1" style="width:300px;"></el-input>
            <el-form-item label=" ">
            <label>@</label>
            </el-form-item>    
            
            <el-select v-model="member.useremail2" placeholder="이메일을 선택해주세요.">
                <el-option v-for="tmp in emailOption" :key="tmp" :label="tmp" :value="tmp">
                </el-option>
            </el-select>
        
        </el-form-item>
        </el-form>
        
        <el-form ref="member">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary" @click="handleUpdate">수정</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },
    
        data(){
            return {
            // 로그인 시에 저장했던 TOKEN 정보를 읽음.
            token : sessionStorage.getItem("TOKEN"), //누구인지 정보를 주기위해
            emailOption : ['hanmail.net', 'naver.com', 'gmail.com'],
            member : {
                userage: '',
                useremail: '',
            }
                
            }
        },

        methods:{
            async handleData() {
                const url = `/member/selectone`;
                const headers = {
                    "Content-Type":"application/json",
                    "token": this.token
                }
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    this.member = response.data.result;
                    const tmp = this.member.useremail.split("@");
                    console.log(tmp);
                    this.member['useremail1'] = tmp[0];
                    this.member['useremail2'] = tmp[1];
                }
            },

            async handleUpdate(){

                if(this.member.userage ===""){
                    alert('나이를 입력하세요.');
                    this.$refs.member.userage.focus();
                    return false;
                }
                 if(this.member.useremail ===""){
                    alert('이메일을을 입력하세요.');
                    this.$refs.member.useremail.focus();
                    return false;
                }

                const url = `/member/mypage?menu=1`;
                const headers = {
                    "Content-Type":"application/json",
                    // 백엔드에서 토큰 검증
                    "token": this.token
                }
                
                const body = {
                    // userid는 token으로 온다.
                    userage : this.member.userage,
                    useremail : this.member.useremail1+"@"+this.member.useremail2 
                    // 화면 디자인으로 인해 2개로 분할되어 있어서 하나로 합침
                    // 앞에 userage, 이런 것들은 백엔드와 이름을 맞춰야함
                }
                const response = await this. axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('수정되었습니다.');
                    // 주소 변경 없이 내용만 다시 갱신
                    this.handleData();
                }
            }
        }    
    }
               
               
                // if(this.member.name ===""){
                //     alert('나이를 입력하세요.');
                //     this.$refs.member.uage.focus();
                //     return false;
                // }
                //  if(this.member.email ===""){
                //     alert('이메일을을 입력하세요.');
                //     this.$refs.member.uemail.focus();
                //     return false;
                // }

                // // 유효성 검사(화면에서 1차 검증, 데이터가 제대로 입력됐는지)
                // // 유효성 검사는 백엔드에 넘기기 전에 해야한다.

            

            //     //get(조회), post(추가), put(수정), delete(삭제)
            //     //조회 : await this.axios.get(url, body, {headers:headers});
            //     //추가 : await this.axios.post(url, body, {headers:headers});
            //     //수정 : await this.axios.put(url, body, {headers:headers});
            //     //삭제 : await this.axios.delete(url, body, {headers:headers});
        
</script>

<style scoped>

</style>