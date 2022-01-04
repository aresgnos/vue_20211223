<template>
    <div>
        <h3>Board2</h3>

        <el-table :data="items" style="width: 100%;cursor:pointer;" @row-click="rowClick">
        <el-table-column prop="no" label="글번호" width="180" />
        <el-table-column prop="title" label="제목" width="180" />
        <el-table-column prop="writer" label="작성자" width="180" />
        <el-table-column prop="hit" label="조회수" width="180" />
        <el-table-column prop="regdate" label="날짜" width="180" />
    </el-table>

    <el-pagination layout="prev, pager, next" :total="500"
    @current-change="currentChange"></el-pagination>

    </div>
</template>

<script>
import {useStore} from 'vuex';


    export default {
        // state 변수(현재 컴포넌트에 필요한 변수)
        data () {
            return {
                items : [],
                store : useStore(),
                page : 1,
            }
        },
        created() {
            this.handleData();
        },

        methods :{       
             rowClick(row){
                console.log('Board.vue => rowClick', row);
                this.$router.push({
                    name :'BoardOne',
                    query : {bno :2,no : row.no}
                });
            },
            currentChange(page){
                console.log('Board.vue => currentChange', page);

                this.page = page;
                this.handleData();
            },

            async handleData(){
                await this.store.dispatch('handleData', {page:1});
               this.items = this.store.getters.getItems;
            }

        }
    }
    
</script>

<style scoped>

</style>