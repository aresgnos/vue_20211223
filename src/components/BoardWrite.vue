<template>
    <div>
        <h3>게시글쓰기</h3>
    {{board}}

  <el-form 
    label-width="120px"
    :model="board">

    <el-form-item label="글제목">
      <el-input v-model="board.title" input-style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="작성자">
      <el-input v-model="board.writer" input-style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="내용">
      <el-input v-model="board.content" :rows="10" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label=" ">
    <el-button type="primary" @click="handleBoardWrite">글쓰기</el-button>
    </el-form-item>
  </el-form>

  

    </div>
</template>

<script>
    export default {
        methods:{

            async handleBoardWrite(){
                // 유효성 검사 통과
                const url = "/board/insert";
                const headers = {"Content-Type":"application/json"};
                // const body = this.board; //=변수
                
                const body = {
                    title: this.board.title,
                    writer: this.board.writer,
                    content: this.board.content
                };

                const response = await this.axios.post(url, 
                                    body, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    alert('글쓰기 성공');
                    this.$router.push({name:"Board"});
                }
                
            }
        },

        data() {
            return {
                board: {
                    title:'',
                    writer:'',
                    content:'',

                }
            }
        }
        
    }
</script>

<style scoped>

</style>