<template>
    <div>
        <h3>물품일괄수정</h3>
            <hr />
            {{items}}

            <el-button size="small" type="primary" @click="handleUpdateBatchAction">물품일괄수정</el-button>
            
            <el-table :data="items" style="width: 100%;" size="mini" >

                <el-table-column label="번호" width="120">
                    <template #default="scope">
                        {{scope.$index+1}}
                    </template>                     
                </el-table-column>

                <el-table-column label="물품명" width="120">
                    <template #default="scope">
                        <el-input size="mini" v-model="items[scope.$index].name"></el-input>
                    </template>                     
                </el-table-column>

                <el-table-column label="물품내용">
                    <template #default="scope">
                        <el-input size="mini" v-model="items[scope.$index].content"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="가격" width="120">
                    <template #default="scope">
                        <el-input size="mini" v-model="items[scope.$index].price"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="수량" width="80">
                    <template #default="scope">
                        <el-input size="mini" v-model="items[scope.$index].quantity"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="이미지" width="340">
                    <template #default="scope">
                        <img :src="items[scope.$index].image" style="width:50px"/>
                        <input type="file" @change="handleImage($event, scope.$index)" />
                    </template>
                </el-table-column>  
            </el-table>    
    </div>
</template>

<script>
    export default {
        
        mounted() { //F5 새로고침 처리
            if(typeof this.code === 'undefined') {
                this.$router.back();
            }
            else { // 최초1회만 수행
                this.handleData();
            }
        },
        data() {
            return {
                items : [],
                code  : this.$route.params.code, // JSON.parse(   )
            }
        },
        methods:{

            async handleUpdateBatchAction(){
                const url =`/item/updatebatch`;
                const headers = {"Content-Type":"multipart-formdata"};
                const body = new FormData();
                for(let tmp of this.items){
                    body.append("code",tmp._id);
                    body.append("name",tmp.name);
                    body.append("content",tmp.content);
                    body.append("price",tmp.price);
                    body.append("quantity",tmp.quantity);
                    body.append("file",tmp.imagedata);
                }
                const response = await this.axios.put(url, body, {headers:headers});
                console.log( response.data);
                if(response.data.status === 200){
                    alert('일괄수정되었습니다.');
                    this.$router.push({name:"Seller"});
                }
            },

            // e 실제 파일의 정보
            // idx는 위치정보
            handleImage(e, idx){
                console.log("ItemUpdateBatch.vue => handleImage")
                console.log(e, idx);
                // image => 수정 전의 이미지
                // imagedata => 수정하는 이미지 파일 (데이터)
                // image1 => 수정하는 이미지 미리보기 URL
                // image에 있는 것을 하나 더 백업해서 원본은 건드리지 않는다.
                if(e.target.files.length > 0 ) { //첨부함
                    this.items[idx]['imagedata'] = e.target.files[0];
                    this.items[idx]['image1']
                    = URL.createObjectURL( e.target.files[0] );
                }
                else { // 첨부하지 않음
                    this.items[idx]['imagedata'] = null;
                    this.items[idx]['image1'] = this.items[idx]['image'];
                }
            },
            async handleData(){
                console.log("ItemUpdateBatch.vue => handleData");
                
                // string -> object로 변환
                this.code = JSON.parse(this.code);

                // [{code:1},{code:2}]  => [1,2,3]
                let arr = [];  
                for(let tmp of this.code){
                    arr.push(tmp.code); 
                }
                console.log(arr);

                const url =`/item/selectcheck`;
                const headers = {"Content-Type":"application/json"};
                const body = {chks : arr };
                const response = await this.axios.post(url, body, {headers:headers});
                console.log( response.data);
                if(response.data.status === 200){
                    this.items = response.data.result;
                    // 미리보기를 위한 새로운 image1키 추가
                    for(let tmp of this.items){
                        tmp['image1'] = tmp['image'];
                        tmp['imagedata'] = null;
                    }
                }
            }
            
        }
    }
</script>

<style scoped>

</style>