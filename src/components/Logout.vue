<template>
    <div>

    </div>
</template>

<script>

    import {useStore} from 'vuex';

    export default {
        data(){
            return{
                store : useStore,
            }
        },
        created()  {
            // 세션에서 토큰 지우기
            sessionStorage.removeItem("TOKEN");

            // 알림창 표시
            alert('로그아웃 되었습니다.');

            const store = useStore();
            store.commit('setMenu', 'home');

            // 부모 컴포넌트(App.vue)의 로그인 상태 변경
            // this.$emit('changeLogged', 'home');  위에 const~가 대체 
        }
        
    }
</script>

<style scoped>

</style>