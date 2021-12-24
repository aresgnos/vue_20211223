<template>
    <div>
        <h3>Menu1</h3>
        
        <button @click="handleSetStore">store변경</button>
    </div>
</template>

<script>
    import {useStore} from 'vuex';

    export default {
        data() {
            return {
                store : useStore()
            }

        },
        
        methods : {

            handleSetStore(){
                // store 변수 변경하기
                this.store.commit('setCounter', 123);
                // 가져오기
                this.cnt = this.store.getters.getCounter;
            }
        }
        
    }
</script>

<style scoped>

</style>