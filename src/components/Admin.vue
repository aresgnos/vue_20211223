<template>
    <div>
    <h3>Admin</h3>
    <div>
        <input type="button" value="메뉴1" @click="changeMenu(1)" />
        <input type="button" value="메뉴2" @click="changeMenu(2)" />
    </div>

    {{cnt}}
    <button @click="handleSetStore">store변경</button>

    <hr />

    <div v-if="menu ===1">
        <menu-1></menu-1>
    </div>

    <div v-if="menu ===2">
        <menu-2></menu-2>
    </div>
    </div>
</template>

<script>
    import {useStore} from 'vuex';
    // 컴포넌트 import
    import Menu1 from './admin/Menu1.vue';
    import Menu2 from './admin/Menu2.vue';

    export default {
        mounted(){
            // 가져오기
            const store = useStore();
            this.cnt = store.getters.getCounter;

            // store가 변화할 때 자동으로 수행
            this.store.subscribe((mutation, state)=>{
                console.log(mutation, state);

                if(mutation.type==='setCounter'){
                    this.cnt = mutation.payload;
                }
            });
        },

        // 컴포넌트 사용 등록
        components :{
            Menu1, Menu2
        },

        // 상태변수
        data(){
            return{
                menu : 1,
                cnt : 0,
                store : useStore()
            }
        },

        methods : {
            changeMenu(no){
                this.menu = no;
            },
            handleSetStore(){
                // store 변수 변경하기
                this.store.commit('setCounter', 777);
            }
        }
        
    }
</script>

<style scoped>

</style>