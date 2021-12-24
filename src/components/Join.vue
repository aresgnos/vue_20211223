<template>
    <div>



    <h3>회원가입</h3>

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="아이디" label-width="120px">
      <el-input v-model="member.userid" placeholder="아이디"></el-input>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" plain>중복확인</el-button>
    </el-form-item>
    </el-form>
    

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호" label-width="120px">
      <el-input v-model="member.userpw" placeholder="암호"></el-input>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="암호확인" label-width="120px">
      <el-input v-model="member.userpw1" placeholder="암호확인"></el-input>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px" >
    <el-form-item label="이름" label-width="120px">
      <el-input v-model="member.name" placeholder="이름"></el-input>
    </el-form-item>
     </el-form>
    

    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="나이" label-width="120px">
      <el-input-number v-model="member.age" :min="1" :max="99"
        controls-position="right" @change="handleChange"/>
    </el-form-item>
     </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-15px">
    <el-form-item label="생년월일" label-width="120px">
        <el-date-picker v-model="member.birth" type="date" placeholder="날짜를 고르세요.">
    </el-date-picker>
    </el-form-item>
    </el-form>


    <el-form  :inline="true" label-width="120px" style="margin-bottom:-20px">
        <el-form-item label="이메일">
        <el-input v-model="member.email"></el-input>
        </el-form-item>
        <el-form-item label="">
            <label>@</label>
        </el-form-item>    
        <el-form-item label="">
            <el-select v-model="member.usermail" placeholder="이메일을 선택해주세요.">
                <el-option v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>    


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-30px">
    <el-form-item label="관심분야" label-width="120px">
    <el-checkbox-group v-model="member.type">
    <el-checkbox v-for="tmp in typeoption" :key="tmp" :label="tmp"></el-checkbox>
    </el-checkbox-group>
    </el-form-item>
    </el-form>


    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
    <el-form-item label="성별" label-width="120px">
    <el-radio v-model="member.radio" label="남">남잡니까</el-radio>
    <el-radio v-model="member.radio" label="여">여잡니까</el-radio>
    </el-form-item>
    </el-form>

    
    <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
    <el-form-item label="약관내용" label-width="120px">
    <el-input v-model="member.textarea" :rows="6" type="textarea" style="width:400px" placeholder="약관내용"/>
    </el-form-item>
    <el-form-item label=" " style="margin-top:100px">
    <el-checkbox v-model="member.chk1" label="약관동의"></el-checkbox>
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

            handleJoin(){
                // 유효성 검사

                const url = '/api/join';
                const headers = {"Content-Type":"application/json"};
                const body = {
                    userid : this.userid,
                    userpw : this.userpw,
                    email : this.email + "@" + this.email,
                };
                const response = this.axios.post(url, body, {headers:headers});
                console.log(response);

                if(response.data.ret === 'y'){
                    alert('회원가입되었습니다.');
                     this.$router.push({name:'Home'});
                }

                this.axios
            }
        },

     data(){
         return {
             member : {
                userid : '',
                userpw : '',
                userpw1 : '',
                name : '',
                age : 1,
                type : [],
                chk1 : false,
                radio : false,
                textarea :'',
                birth:'',
                email:'',
                usermail:'',
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