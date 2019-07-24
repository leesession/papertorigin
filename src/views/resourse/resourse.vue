<template>
  <div class="resourse">
    <site-header></site-header>
    <search title="Our Resourse" index="2"></search>
    <h1>What resources do we have?</h1>
    <h6>TASSEL SCHOLAR make cooperation with below journal publishers to provide academic paper information searching and retrieving</h6>
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

</style>


