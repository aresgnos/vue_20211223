<template>
    <div>
        <h3>관리자 페이지</h3>
        <el-tabs>
            <el-tab-pane label="회원관리">
                <menu-1></menu-1>
            </el-tab-pane>
            
            <el-tab-pane label="게시물 관리">
            <menu-2></menu-2>
            </el-tab-pane>

  </el-tabs>

    </div>
</template>

<script>
import Menu1 from './admin/Menu1.vue'
import Menu2 from './admin/Menu2.vue'

export default {
  components: { Menu1, Menu2 },


        
    }
</script>

<style scoped>

</style>