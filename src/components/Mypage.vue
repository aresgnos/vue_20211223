<template>
    <div>
        
    <el-card shadow="always">

    <h3>마이페이지</h3>
    
    <el-tabs @tab-click="handleClick">
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

        <!-- <el-form  :inline="true" label-width="120px" style="margin-bottom:-20px">
        <el-form-item label="이메일">
        <el-input v-model="member.mail"></el-input>
        </el-form-item>
        <el-form-item label="">
            <label>@</label>
        </el-form-item>    
        <el-form-item label="">
            <el-select v-model="member.mail" placeholder="이메일을 선택해주세요.">
                <el-option v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>     -->
        
        <el-form ref="member">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary">수정</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>
    </el-tab-pane>
    

    <el-tab-pane label="비밀번호 변경">
       <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="현재 비밀번호" label-width="200px"> 
            <el-input v-model="member.userpw1" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="변경할 비밀번호" label-width="200px"> 
            <el-input v-model="member.userpw1" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="변경할 비밀번호 확인" label-width="200px"> 
            <el-input v-model="member.userpw1" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

        <el-form ref="member" style="margin-top:30px">
            <el-form-item label=" " label-width="200px"> 
            <el-button type="primary">수정</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>


    </el-tab-pane>
    <el-tab-pane label="회원 탈퇴">
        <el-form ref="member" style="margin-bottom:-15px; margin-top:30px;" >
            <el-form-item label="비밀번호" label-width="120px"> 
            <el-input v-model="member.userpw" style="width:300px;"></el-input>
        </el-form-item>
        </el-form>

         <el-form ref="member" style="margin-top:30px">
            <el-form-item label=" " label-width="120px"> 
            <el-button type="primary">탈퇴</el-button>
            <el-button type="primary">취소</el-button>
        </el-form-item>
        </el-form>

    </el-tab-pane>

  </el-tabs>

    </el-card>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                member:{
                    name:'',
                    email:'',
                    userpw:'',
                    uswerpw1:'',
                    mail:'',
                
                },
                emailoption : ['hanmail.net', 'naver.com', 'gmail.com'],
            }
        },

        methods:{
           handleClick(tab, event) {
            console.log(tab, event)
            },
        }
        
    }
</script>

<style scoped>

</style>