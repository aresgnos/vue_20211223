<template>
    <div>
        <h3>게시판</h3>
    
        <el-tabs tab-position="left" style="padding:20px">
            <el-tab-pane label="자유게시판">
                <board-1></board-1>

            </el-tab-pane>
            <el-tab-pane label="질문 및 답변">
                <board-2></board-2>
                    
            </el-tab-pane>
        </el-tabs>
    
    </div>
</template>

<script>
import Board1 from './board/Board1.vue';
import Board2 from './board/Board2.vue';



import axios from 'axios';

    export default {

        components:{
            Board1, Board2,
                
        },

        created() {
            this.handleData()
        },

        // 상태변수
        data(){
            return{
                // page : 1,
            }
        },
        

        methods:{

            rowClick(row){
                console.log('Board.vue => rowClick', row);
                this.$router.push({
                    name :'',
                    query : {no : row.no}
                });
            },

            currentChange(page){
                console.log('Board.vue => currentChange', page);

                this.page = page;
                this.handleData();
            },

             async handleData(){
                const url = `http://ihongss.com/json/board.json?page=${this.page}`;
                const headers = {"Content-Type":"application/json"};

                const response = await axios.get(url, {headers:headers});
                if(response.data.ret === 'y') {
                    this.items = response.data.data;
                    
                    console.log(url);
                }
                
            }

           
        
        }
    }
</script>

<style scoped>

</style>