<template>
  <div>
    <h3>Home.vue</h3>
    <!-- <vueper-slides class="excentermode" arrows-outside bullets-outside transition-speed="250">
      <vueper-slide
        v-for="(tmp,idx) in items"
        :key="idx"
        :title="tmp.title"
        :image="tmp.image" />
</vueper-slides> -->

    <vueper-slides 3d fixed-height="300px" arrows-outside bullets-outside>
      <vueper-slide v-for="(tmp,idx) in items" :key="idx" :title="tmp.title" :image="tmp.image" />
    </vueper-slides>
    </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides';
  import 'vueperslides/dist/vueperslides.css';
  export default {
    components: { 
      VueperSlides, VueperSlide 
    },
    data(){
      return {
        items :[
          { title:'돌아라', content:'돌아가라', image: 'https://images.unsplash.com/photo-1484278786775-527ac0d0b608?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80'},
          { title:'돌려', content:'돌려', image: 'https://images.unsplash.com/photo-1520262454473-a1a82276a574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
          { title:'돌림', content:'판', image: 'https://images.unsplash.com/photo-1640781934489-bf7f40881479?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'},
        ]
      }
    }
  }
</script>


<style scoped>
.excentermode {
  width: 600px;
  max-width: 100%;
  margin: auto;
}

</style>