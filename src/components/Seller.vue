<template>
    <div>
        <h3>판매자</h3>

        <p>물품목록</p>
        <router-link to="InsertItem">
        <el-button type="info">물품등록</el-button>
        </router-link>

        <router-link to="ItemInsertBatch">
        <el-button type="info" style="margin-left:10px">물품 일괄 등록</el-button>
        </router-link>

        <el-button type="info" style="margin-left:10px" @click="handleDeleteBatch" >물품 일괄 삭제</el-button>

        <el-button type="info" style="margin-left:10px" @click="handleUpdateBatch" >물품 일괄 수정</el-button>

            <el-table :data="items" size="mini" style="width: 100%;">
                <el-table-column label="체크" width="180">
                    <template #default="scope">
                        <div>
                            <el-checkbox v-model="items[scope.$index].chk1" />
                        </div>
                    </template>
                </el-table-column>

            
            <el-table-column label="코드" width="180">
            <template #default="scope">
                <div @click="handlePage(scope.row._id)">
                {{scope.row._id}}
                </div>
            </template>
            </el-table-column>
            <el-table-column prop="name" label="물품명" width="180" />
            <el-table-column prop="price" label="가격" />
            <el-table-column prop="quantity" label="재고수량" />
            <el-table-column prop="regdate" label="등록일" />

            <el-table-column fixed="right" label="삭제" width="120">
            <template #default="scope">
                <el-button size="small" @click.prevent="deleteRow(scope.$index, scope.row)">
                삭제
                </el-button>
            </template>
            </el-table-column>

            <el-table-column fixed="right" label="수정" width="120">
            <template #default="scope">
                <el-button size="small" @click.prevent="updateRow(scope.$index, scope.row)">
                수정
                </el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="수정" width="50%">
            <el-form label-width="80px"> 
            <el-form-item label="코드">{{itemOne._id}}</el-form-item>
            <el-form-item label="물품명">
                <el-input v-model="itemOne.name" input-style="width:200px" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="물품내용">
                <el-input v-model="itemOne.content" input-style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="가격">
                <el-input v-model="itemOne.price" input-style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="재고수량">
             <el-input v-model="itemOne.quantity" input-style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="이미지">
                <img :src="itemOne.image" style="width:100px" />
                <input type="file" @change="handleImage" />
            </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="handleupdateItem">확인</el-button>
                <el-button @click="dialogVisible=false">취소</el-button>
            </span>
            </template>
        </el-dialog>
        
        <el-row style="margin-top:10px">
        <el-col :span="20"><el-pagination layout="prev, pager, next" :total="200"
        @current-change="currentChange"></el-pagination></el-col>
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
                items : [],
                page : 1,
                total : 0,
                dialogVisible : false,
                itemOne : '', // 백엔드에서 받은 1개의 정보
            }
        },

        methods :{
            handleUpdateBatch(){
                let arr = [];
                //items에 있는 chk1의 값이 true인것 중에서 코드값
                for(let tmp of this.items){
                    // console.log(tmp);
                    if(tmp.chk1 === true){
                        arr.push({code:tmp._id});
                    }
                }
                console.log(arr); //[{code:10001},{code:10002}]

                // 주의) arr변수는 object를 string 변환해서 전송
                this.$router.push({name:'ItemUpdateBatch', 
                        params:{code:JSON.stringify(arr)}});
            },

            async handleDeleteBatch(){
                const ret = confirm('삭제할까요??');
                if(ret === true){
                    let arr = [];
                    //items에 있는 chk1의 값이 true인것 중에서 코드값
                    for(let tmp of this.items){
                        // console.log(tmp);
                        if(tmp.chk1 === true){
                            arr.push({code:tmp._id});
                        }
                    }
                    console.log(arr);

                    const url = `/item/deletebatch`;
                    const headers = { "Content-Type":"application/json" };
                    const body = arr;
                    const response = await this.axios.delete(url, 
                            {headers:headers, data:body});
                    console.log(response.data);
                    if(response.data.status === 200){
                        alert('일괄 삭제 되었습니다.');
                        this.handleData();
                    }
                }

            },

            handleImage(e){
                // e변수에 첨부한 파일의 정보를 가지고 있음
                console.log(e)
                // image1은 백엔드로 전달될 변경되는 이미지
                this.itemOne['image1'] = e.target.files[0];

                // 프론트에서 미리보기용 임시 URL
                this.itemOne['image1Url'] = URL.createObjectURL(e.target.files[0]); // 임시 이미지 주소를 만들어줌

                // dialog img src를 변경하기
                // this.itemOne['image'] = URL.createObjectURL(e.target.files[0]);
            },

            handlePage(code){
                this.$router.push({
                    name:'ItemContent', 
                    query:{code:code}
                });
            },
            
            // 수정할 부분 화면에 띄우는 부분
            async updateRow(idx, row) {
                console.log(idx, row);

                const url = `item/selectone?code=${row._id}`;
                const headers = {"Content-Type":"application/json" };
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    this.itemOne = response.data.result;
                    this.dialogVisible = true;
                }
            },
            // this.itemOne = 받은 값 넣기;

                // 코드를 이용해서 백엔드에서 1개의 정보를 받음
                // 모달창에 v-model연결
                // 모달창 띄우기
            
            // 데이터를 변경하는 부분
            async handleupdateItem(){
                console.log("Seller.vue => handleupdateItem") // 메소드가 작동하는지 꼭 확인!!

                const url = `item/update?code=${this.itemOne._id}`;
                const headers = {"Content-Type":"multipart/form-data" };
                const body = new FormData();
                body.append("name",this.itemOne.name),
                body.append("price", this.itemOne.price),
                body.append("content", this.itemOne.content),
                body.append("quantity", this.itemOne.quantity),
                body.append("file", this.itemOne.image1)
                

                const response = 
                    await this.axios.put(url, body, {headers:headers});
                if(response.data.status === 200){
                    alert('수정되었습니다.');
                    this.dialogVisible = false;
                    this.$refs['file'].clear();
                    this.handleData();

                    // 화면갱신
                }
            },

            async deleteRow(idx, row){
                if(confirm ('삭제하시겠습니까?')) {
                console.log('Seller.vue => deleteRow');
                console.log(idx, row);

                const url =  `item/delete?code=${row._id}`;
                const headers = {"Content-Type":"application/json" };

                const response = await this.axios.delete(url, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    alert('삭제되었습니다.');
                    this.$router.push({name : 'Seller'});
                    this.handleData();
                }
            }
        },
            currentChange(page){
                this.page = page;
                this.handleData();
            },

            async handleData() {
                const url =  `item/select?page=${this.page}`;
                const headers = {"Content-Type":"application/json" };
                const response = await this.axios.get(url, {headers:headers});
                console.log(response.data);

                if(response.data.status === 200){
                    // 5개의 키
                    this.items = response.data.result;
                    this.total = response.data.total;

                    // 6개의 키 (1개 추가)
                    for(let tmp of this.items) {
                        tmp['chk1'] =false;
                    }
                }
            }       
        }    
    }
</script>

<style scoped>

</style>