<template>
    <div>

    <h3>회원가입</h3>

    <!-- 내용 잘 들어가는지 확인 -->
    {{member}} 

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="아이디" label-width="120px">
      <el-input v-model="member.uid" placeholder="아이디"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" plain @click="handleIDCheck">중복확인</el-button>
    </el-form-item>
    </el-form>
    

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호" label-width="120px">
      <el-input v-model="member.upw" show-password placeholder="암호"></el-input>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호확인" label-width="120px">
      <el-input v-model="member.pw2" show-password placeholder="암호확인"></el-input>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="이름" label-width="120px">
      <el-input v-model="member.uname" placeholder="이름"></el-input>
    </el-form-item>
     </el-form>
    

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="나이" label-width="120px">
      <el-input-number v-model="member.uage" :min="1" :max="99"
        controls-position="right" @change="handleChange"/>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="생년월일" label-width="120px">
        <el-date-picker v-model="member.ubirth" type="date" placeholder="날짜를 고르세요.">
    </el-date-picker>
    </el-form-item>
    </el-form>


    <el-form  :inline="true" label-width="120px" style="margin-bottom:-20px">
        <el-form-item label="이메일">
        <el-input v-model="member.useremail"></el-input>
        </el-form-item>
        <el-form-item label="">
            <label>@</label>
        </el-form-item>    
        <el-form-item label="">
            <el-select v-model="member.useremail2" placeholder="이메일을 선택해주세요.">
                <el-option v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>    


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-30px">
    <el-form-item label="관심분야" label-width="120px">
    <el-checkbox-group v-model="member.ucheck">
    <el-checkbox v-for="tmp in typeoption" :key="tmp" :label="tmp"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
    </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
    <el-form-item label="성별" label-width="120px">
        <el-radio-group v-model="member.ugender">
            <el-radio label="1">남</el-radio>
            <el-radio label="2">여</el-radio>
        </el-radio-group>
    </el-form-item>
    </el-form>

    
    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
    <el-form-item label="약관내용" label-width="120px">
    <el-input v-model="member.text" :rows="6" type="textarea" style="width:400px" placeholder="약관내용"/>
    </el-form-item>
    <el-form-item label=" " style="margin-top:100px">
    <el-checkbox v-model="member.chk" label="약관동의"></el-checkbox>
    </el-form-item>
    </el-form>


    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label=" " label-width="120px">
        <el-button type="primary" @click="handleJoin">회원가입</el-button>
        <el-button type="primary">홈으로</el-button>
        </el-form-item>
    </el-form>


        
    </div>
</template>

<script>
    export default {
        methods:{
            handleChange(){

            },

            async handleIDCheck(){

                // 유효성 검사
                if(this.member.uid.length <= 0){ //아이디를 입력 안했다는 것
                    alert('아이디를 입력하세요.');
                    return false;
                }

                const url = `/member/idcheck?uid=${this.member.uid}`
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);

                if(response.data.result === 1){
                    this.member.idcheck= false;
                    alert('사용할 수 없는 아이디입니다.');
                }
                else if(response.data.result === 0){
                    this.member.idcheck= true;
                    alert('사용할 수 있는 아이디입니다.');
                }

            },

            async handleJoin(){
                // 유효성 검사
                if(this.member.idcheck === false){
                    alert('아이디 중복확인하세요.');
                    return false;
                }

                if(this.member.chk === false){
                    alert('약관동의하세요.');
                    return false;
                }

                // 이메일 하나로 합쳐셔 uemail변수에 넣기
                this.member.uemail 
                = this.member.useremail +"@" + this.member.useremail2

                // 유효성 통과 후
                const url = '/member/insert';
                const headers = {"Content-Type":"application/json"};
                const body = this.member;
                const response = await this.axios.post(url, body, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    alert('회원가입되었습니다.');
                    this.$router.push({name:'Home'});
                }
            }
        },

     data(){
         return {
             member : {
                
                uid : '', //전송
                upw : '', //전송
                pw2 : '',
                uname : '', //전송
                uage : 1, //전송
                ucheck : [], //전송 여러개
                ugender : '', // 전송
                text :'', 
                ubirth:'', //전송
                uemail:'', //전송
                usermail : '', //임시용
                usermail2: '', //임시용
                idcheck : false,
                chk : false,

                },

                emailoption : ['hanmail.net', 'naver.com', 'gmail.com'],
                typeoption : ['아메리카노', '바닐라라떼', '카푸치노','카페모카']
            
        }
    }
}
    
</script>

<style scoped>
.st1 {
    margin-bottom: -20x;
   
}

</style>