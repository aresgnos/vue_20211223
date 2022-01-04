<template>
    <div>
        <h3>물품 상세 정보</h3>

    <el-descriptions  :column="2" border span="30" >

        <el-descriptions-item label="물품코드" label-align="center">{{item._id}}</el-descriptions-item>
        <el-descriptions-item label="물품명" label-align="center">{{item.name}}</el-descriptions-item>
        <el-descriptions-item label="가격" label-align="center">{{item.price}}</el-descriptions-item>
        <el-descriptions-item label="재고수량" label-align="center">{{item.quantity}}</el-descriptions-item>
        <el-descriptions-item label="등록일" label-align="center">{{item.regdate}}</el-descriptions-item>
        <el-descriptions-item label="물품내용" label-align="center">{{item.content}}</el-descriptions-item>
        <el-descriptions-item label="이미지" label-align="center"><el-image :src="item.image" style="width:60%" /> 
        </el-descriptions-item>
      
    </el-descriptions>
    </div>
</template>

<script>
    export default {
        created(){
            this.handleData();
        },

        data(){
            return{
                item : '',
                code : this.$route.query.code, // 목록에서 전달되는 코드를 보관
            }
        },

        methods:{
           async handleData(){
                const url = `/item/selectone?code=${this.code}`;
                const headers = {"Content-Type":"application/json"};

                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);
                if(response.data.status=== 200) {
                    // state변수 item에 보관
                    this.item = response.data.result;
                    console.log(this.item); //확인용
                }
                }
            }
        }
</script>

<style scoped>

</style>
