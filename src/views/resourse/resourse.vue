<template>
  <div class="resourse">
    <site-header></site-header>
    <search title="Our Resourse" index="2"></search>
    <div class="title wrap1300">
      <h1>What resources do we have?</h1>
      <h6>TASSEL SCHOLAR make cooperation with below journal publishers to provide academic paper information searching and retrieving</h6>
    </div>
    <div class="box wrap1300">
      
    </div>
  </div>
</template>

<script>
import siteHeader from '../../components/header.vue'
import search from '../../components/search.vue'
export default {
  name: 'resourse',
  data() {
    return {

    }
  },
  components: { siteHeader, search },
}
</script>

<style scoped lang="scss">
.title{
  h1{
    height: 92px;
    line-height: 110px;
    font-size: 28px;
    color: #29697E;
  }
  p{
    font-size: 18px;
    color: #2D3F45;
  }
}
.box{
  width: 
}

</style>


