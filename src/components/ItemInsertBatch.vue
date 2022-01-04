<template>
    <div>
        <h3>물품일괄등록</h3>
        <hr />
        {{items}}
        <el-table :data="items" width="100%" size="small">
             <el-table-column label="번호" width="180">
                <template #default="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>

            <el-table-column label="물품명" width="180">
                <template #default="scope">
                    {{scope.$index}}
                    <el-input size="mini" v-model="items[scope.$index].name"></el-input>
                </template>
            </el-table-column>

            <el-table-column label="물품가격" width="180">
                <template #default="scope">
                    {{scope.$index}}
                    <el-input size="mini" v-model="items[scope.$index].price"></el-input>
                </template>
            </el-table-column>

           <el-table-column label="물품내용" width="180">
                <template #default="scope">
                    {{scope.$index}}
                    <el-input size="mini" v-model="items[scope.$index].content"></el-input>
                </template>
            </el-table-column>
            
            <el-table-column label="재고수량" width="180">
                <template #default="scope">
                    {{scope.$index}}
                    <el-input size="mini" v-model="items[scope.$index].quantity"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="이미지" width="180">
                <template #default="scope">
                    <img :src="items[scope.$index].imageurl" style="width:100px" />
                    <input type="file" @change="handleImage($event, scope.$index)" />
                </template>
            </el-table-column>
        </el-table>

    <el-form :inline="true" class="demo-form-inline" style="margin-top:20px" align="right" >
        <el-button size="small" type="info" @click="handlePlus">항목추가</el-button>
        <el-button size="small" type="info" @click="handleMinus">항목삭제</el-button>
        <el-button size="small" type="info" @click="handleInsertBatch">일괄추가</el-button>
        <el-button size="small" type="info" >목록으로</el-button>
    </el-form>
    </div>
</template>

<script>
    export default {
        created(){

        },

        data(){
            return{
                items : [
                    { name : 'a', content :'1a', price:1, quantity:12, image:'', imageurl : require('../assets/img/aa.jpg')},
                    { name : 'a', content :'1b', price:5, quantity:14, image:'', imageurl : require('../assets/img/aa.jpg')},
                    { name : 'a', content :'1c', price:7, quantity:13, image:'', imageurl : require('../assets/img/aa.jpg')},
                ],
            }
        },

        methods:{
            async handleInsertBatch(){
                console.log("ItemInsertBatch.vue => handleInsertBatch");
                const url = `item/insertbatch`;
                const headers = {"Content-Type":"multipart/form-data"};

                const body = new FormData();

                for(let i=0;i<this.items.length;i++){
                    body.append("name", this.items[i].name);
                    body.append("content", this.items[i].content);
                    body.append("price", this.items[i].price);
                    body.append("quantity", this.items[i].quantity);
                    body.append("file", this.items[i].image);
                }
                const response = await this.axios.post(url, body, {headers:headers});
                if(response.data.status === 200){
                    alert('일괄추가되었습니다.');
                    this.$router.push({name:'Seller'});
                }
            },

            handleImage(e, idx){
                console.log("ItemInsertBatch.vue => handleImage");
                console.log(e, idx);
                if(e.target.file.length > 0) {
                    this.items[idx].image = e.target.files[0];
                    this.items[idx].imageurl = URL.createObjectURL( e.target.file[0] );
                }
                else {
                    this.items[idx].image = null;
                    this.items[idx].imageurl = require('../assets/img/aa.jpg')
                }
            },

            handlePlus(){
                this.items.push({ name : 'a', content :'1c', price:7, quantity:13});
            },

            handleMinus(){
                this.items.pop();
            },

        }

    }
</script>

<style scoped>

</style>