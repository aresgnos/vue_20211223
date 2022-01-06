<template>
    <div>

    <h3>마이페이지</h3>
    
    <el-tabs>
    <el-tab-pane label="정보 수정">
        <mp-1></mp-1>
    </el-tab-pane>
    


    <el-tab-pane label="비밀번호 변경">
       <mp-2></mp-2>
    </el-tab-pane>


    <el-tab-pane label="회원 탈퇴">
       <mp-3></mp-3>
    </el-tab-pane>

  </el-tabs>


    
    </div>
</template>

<script>
import Mp1 from './mypage/Mp1.vue'
import Mp2 from './mypage/Mp2.vue'
import Mp3 from './mypage/Mp3.vue'

    export default {
  components: { Mp1, Mp2, Mp3 },
    }
    
</script>

<style scoped>

</style>