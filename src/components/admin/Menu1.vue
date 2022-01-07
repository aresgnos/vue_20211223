<template>
    <div>
        <el-table :data="items" size="small" width="max" >
        <el-table-column prop="_id" label="아이디" width="180" />
        <el-table-column prop="userpw" label="비밀번호" width="180" />
        <el-table-column prop="userage" label="나이" width="180" />
        <el-table-column prop="useremail" label="이메일" width="180" />
        <el-table-column prop="usercheck" label="취향" width="180" />
        <el-table-column prop="usergender" label="성별" width="180" />
        <el-table-column prop="username" label="이름" width="180" />
        <el-table-column prop="userbirth" label="생일" width="180" />
        </el-table>
    </div>
</template>

<script>
    export default {
        created() {
            this.handleData();
        },

        data(){
            return{
                items : [],
                page : 1,
                total : 0,
            }
        },

        methods :{
            async handleData() {
                const url =  `member/select?page=${this.page}`;
                const headers = {"Content-Type":"application/json" };
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);

        }
    }
}
        
    
</script>

<style scoped>

</style>