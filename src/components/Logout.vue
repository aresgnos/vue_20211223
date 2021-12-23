
<script>
    export default {
        created()  {
            // 세션에서 토큰 지우기
            sessionStorage.removeItem("TOKEN");

            // 알림창 표시
            alert('로그아웃 되었습니다.');

            // 부모 컴포넌트(App.vue)의 로그인 상태 변경
            this.$emit('changeLogged');

            // 홈페이지로 이동
            this.$router.push({name:"Home"});
        }
        
    }
</script>

<style scoped>

</style>