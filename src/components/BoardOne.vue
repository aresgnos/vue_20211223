<template>
    <div>
    <h3>BoardOne</h3>
   

    <el-descriptions  :column="2" border span="30" >
      
        <el-descriptions-item label="글번호" label-align="center">{{item._id}}</el-descriptions-item>
        <el-descriptions-item label="조회수" label-align="center">{{item.hit}}</el-descriptions-item>
        <el-descriptions-item label="작성자" label-align="center">{{item.writer}}</el-descriptions-item>
        <el-descriptions-item label="날짜" label-align="center">{{item.regdate}}</el-descriptions-item>
        <el-descriptions-item label="글제목" label-align="center">{{item.title}}</el-descriptions-item>
        <el-descriptions-item label="내용" label-align="center">{{item.content}}</el-descriptions-item>
        <el-descriptions-item label="이미지" label-align="center"><el-image :src="item.img" style="width:70%" /> 
        </el-descriptions-item>
      
    </el-descriptions>
  

   <el-form :inline="true" class="demo-form-inline" style="margin-top:20px" align="right" >
        <el-button type="primary" plain size="small" @click="handlePre">이전글</el-button>
        <el-button type="primary" plain size="small" @Click="handleNext">다음글</el-button>
        <el-button type="primary" plain size="small" @click="handleDelete">삭제</el-button>
        <el-button type="primary" plain size="small" @click="handleUpdate">수정</el-button>
        <router-link to="/board"><el-button type="primary" plain size="small" style="margin-left:10px">목록으로</el-button></router-link>
   </el-form>

   <el-dialog v-model="dialogVisible"
    title="수정하시겠습니까?" width="50%">
    <el-form label-width="80px"> 
    <el-form-item label="글번호">{{item._id}}</el-form-item>
    <el-form-item label="제목">
    <el-input v-model="item1.title" input-style="width:200px" size="mini"></el-input>
    </el-form-item>
    <el-form-item label="내용">
    <el-input v-model="item1.content" :rows="10" type="textarea"></el-input>
    </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleUpdateAction">확인</el-button>
        <el-button @click="dialogVisible=false">취소</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog v-model="dialogDelete"
    title="삭제하시겠습니까?" width="30%">
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleDeleteAction(item._id)">확인</el-button>
        <el-button @click="dialogDelete=false">취소</el-button>
      </span>
    </template>
  </el-dialog>

    </div>
</template>

<script>

    export default {

        created() {
             this.handleData();

        },

        data() {
            return{
              bno : Number(this.$route.query.bno),
              no : Number(this.$route.query.no),
              item : '',
              item1 : '',
              dialogVisible : false,
              dialogDelete : false,
              name:'',
              title:'',
              content:'',
            }
        },

       methods:{
        async handlePre(){
              // 현재 글번호 전달
              const url = `/board/preno?cno=${this.no}`;
              const headers = {"Content-Type":"application/json" };

              const response
                = await this.axios.get(url, {headers:headers});  
              if(response.data.status === 200){
                if(response.data.no <= 0){
                  alert('이전 글이 없습니다.');
                }
                else {
                  this.no = response.data.no;

                  // 현재페이지 -> 같은 페이지로 push는 데이터
                  // 생명주기 created, mounted가 호출되지 않는다.

                  // replace는 뒤로가기가 없다. (기록을 안 남김)
                  this.$router.push({
                    name :'BoardOne',
                    query : {bno: 1, no: this.no}
                  });
                  this.handleData()
                }
            }

          },

        async handleNext(){
              // 현재 글번호 전달
              const url = `/board/nextno?cno=${this.no}`;
              const headers = {"Content-Type":"application/json" };

              const response
                = await this.axios.get(url, {headers:headers});  
              if(response.data.status === 200){
                if(response.data.no <= 0){
                  alert('다음 글이 없습니다.');
                }
                else {
                  this.no = response.data.no;
                  this.handleData()
                }
            }

          },

        async handleUpdateAction(){
              const url = `/board/update`;
              const headers = {"Content-Type":"application/json" };
              const body = {
                no : this.item1._id,
                title : this.item1.title,
                content : this.item1.content
              };
              const response = await this.axios.put(url, body, {headers:headers});
              if(response.data.status === 200){
                alert('수정되었습니다.');
                this.dialogVisible = false; // 다이얼로그 숨기기
                this.handleData();
              }
          },

        async handleDeleteAction(no){ 
              const url = `/board/delete?no=${no}`;
              const headers = {"Content-Type":"application/json" };
              const body = {};

              // 삭제 : axios.delete(url, {headers:headers, data{}});
              const response = await this.axios.delete(
                url, {headers:headers, data:body});
              console.log(response.data);
                
              if(response.data.status === 200){
                  alert('삭제되었습니다.');
                  this.dialogDelete = false;
                  // 목록으로 보내기
                  this.$router.push({name:"Board"});
              }
          },

        handleUpdate(){
               // item에 받은 값을 표시
               this.dialogVisible = true;
          },

        handleDelete(){
              this.dialogDelete = true;
          },

        async handleData(){
                const url = `board/selectone?no=${this.no}`;
                const headers = {"Content-Type":"application/json" };
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                
                if(response.data.status === 200){
                    // 출력 용도
                    this.item = response.data.result;

                    // 수정시 사용할 용도
                    this.item1 = Object.create(this.item);
                }
          },
            
        async handleHit(){
              const url = `/board/updatehit?no=${this.no}`;
              const headers = {"Content-Type":"application/json" };
              const response
                = await this.axios.put(
                  url,
                  { },
                  {headers:headers});

              if(response.data.status === 200){
                console.log('조회수 증가 성공')
            }
          }
        }   
    }    
</script>

<style scoped>

</style>