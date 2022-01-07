<template>
    <div>
        <!-- <input type="text" placeholder="검색어 입력" />
        <input type="button" value="검색" /> -->

        <el-form :inline="true" class="demo-form-inline" >
            <el-form-item label=" ">
                <el-input size="small" v-model="text" placeholder="검색어 입력" @keyup.enter="handleData" align="right"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" align="right" size="small" @click="handleData">검색</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="items" size="small" width="max" style="cursor:pointer;">
        <el-table-column prop="_id" label="글번호" width="180" />
        <el-table-column prop="title" label="제목" width="180" />
        <el-table-column prop="writer" label="작성자" width="180" />
        <el-table-column prop="hit" label="조회수" width="180" />
        <el-table-column prop="regdate" label="날짜" width="180" />
        </el-table>
        

        <el-row style="margin-top:10px">
        <el-col :span="20"><el-pagination layout="prev, pager, next" :total="200"
        @current-change="currentChange"></el-pagination></el-col>
        <el-col :span="4">
        </el-col>
        </el-row>


    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },

        data(){
            return{
                items : [], // 게시물 내용
                page: 1, // 현재 페이지 번호
                total : '', // 페이지네이션에서 전체 게시물 수 
                text : '', // 입력한 검색어
            }
        },

        methods : {

            async handleData() {
            const url = "/board/select";
            const headers = {"Content-Type":"application/json"};

            // /board/select?page=1&text=aaa 이렇게 백엔드에 전달됨. = query방식
            const response = await this.axios.get(
                url, 
                { params : {page : this.page, text : this.text } },
                { headers : headers }
            );
            console.log(response.data);
            if(response.data.status === 200){
                this.items = response.data.result;
                this.total = response.data.total;
                }   
            },

            currentChange(page) {
                console.log('Menu2.vue => currentChange', page);
                this.page = page;
                this.handleData();
            },

        }
        
    }
</script>

<style scoped>

</style>