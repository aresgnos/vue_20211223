<template>
    <div>
    <h3>물품등록 페이지</h3>
    <el-form label-width="100px"> 
        <el-form-item label="물품명">
            <el-input v-model="item.name" input-style="width:300px" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="물품가격">
            <el-input v-model="item.price" input-style="width:300px" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="물품내용">
            <el-input v-model="item.content" input-style="width:600px" :rows="5" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="재고수량">
            <el-input v-model="item.quantity" input-style="width:300px" size="mini"></el-input>
        </el-form-item>

        <el-form-item label="이미지">
        <el-upload action="#"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :auto-upload="false">
            <el-icon><plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
            <img style="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        </el-form-item>

        <el-form-item label=" ">
            <el-button type="primary" @click="handleInsert2">확인</el-button>
        
        </el-form-item>

    </el-form>
        
    </div>
</template>

<script>
    import { Plus } from '@element-plus/icons-vue'
    export default {
        components: {
            Plus,
        },

        data(){
            return{
                
                dialogImageUrl: '',
                dialogVisible: false,
                

                item : {
                name : '',
                content : '',
                price : '',
                quantity :'',
                image : null
                }
            }
        },

        methods:{

            async handleInsert2(){
                if(this.item.image === null){
                    alert('이미지 첨부하세요');
                    return false;
                }

                const url = `item/insert`;
                const headers = {"Content-Type":"multipart/form-data"};
                let body = new FormData();
                body.append("file", this.item.image);
                body.append("name", this.item.name);
                body.append("content", this.item.content);
                body.append("price", this.item.price);
                body.append("quantity", this.item.quantity);

                const response = await this.axios.post (url, body, {heders:headers});

                console.log(response.data);
                if(response.data.status === 200) {
                    alert('등록되었습니다');
                    this.$router.push({name : 'Seller'});
                }
            },

            handleChange(file, fileList){
                console.log('handleChange');
                console.log(file, fileList)
                this.item.image = file.raw;
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
                // 삭제
                this.item.image = null;
            },

            handlePreview(file) {
                console.log('handlePreview')
                console.log(file)

                //console.log(URL.createObjectURL(file,raw)); => 수동으로 이미지 주소를 만듦
            
                this.dialogImageUrl = file.url // 임시 이미지 주소
                this.dialogVisible = true // 다이얼로그 표시
            },

        }
    }   
    
</script>

<style scoped>

</style>