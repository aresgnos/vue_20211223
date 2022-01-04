<template>
    <div>
        <h3>Board1</h3>
    
    <el-table :data="items" size="small" width="max" style="cursor:pointer;" 
        @row-click="rowClick">
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
        <el-button type="primary" @click="handleWrite" align="right">글쓰기</el-button>
    </el-col>
    </el-row>

    </div>
</template>

<script>

import {useStore} from 'vuex';

    export default {
        created (){
            this.handleData();

        },
        
        data(){
            return{
                items : [],
                page : 1,
                store : useStore(),
            }
        },
        
        methods:{

            async handleData() {
            const url = "/board/select";
            const headers = {"Content-Type":"application/json"};

            const response = await this.axios.get(
                url, 
                {params : {page : this.page} },
                {headers : headers}
            );
            console.log(response.data);
            if(response.data.status === 200){
                this.items = response.data.result;
                this.total = response.data.total;
                }
            },

            handleWrite(){
                 this.$router.push({name : 'BoardWrite'});
            },
             
            async rowClick(row){
                console.log('Board.vue => rowClick', row);
                // 조회수를 1증가 시킴
                const url = `/board/updatehit?no=${row._id}`;
                const headers = {"Content-Type":"application/json"};
                const response = await this.axios.put(
                    url,
                    { }, 
                    {headers:headers}
                );
                
                console.log(response.data);
                if(response.data.status === 200){
                    this.$router.push({
                    name :'BoardOne',
                    query : {bno: 1 ,no : row._id}
                    });
                }  
            },

            // 페이지네이션 컴포넌트에서 페이지를 클릭할 때마다
            // 무슨 페이지를 클릭하는지 알려주는 것
            // 데이터변수로 page를 가지고 있어야함.
            currentChange(page){
                console.log('Board.vue => currentChange', page);
                this.page = page;
                this.handleData();
            },

           
        }
    }
</script>

<style scoped>

</style>