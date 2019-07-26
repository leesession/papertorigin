<template>
  <div class="citation" v-if="show">
    <div class="bg"></div>
    <div class="dialog-msg">
      <div class="dialog-title">
        <i class="icon icon-note fl"></i>
        <span class="fl">Citation</span>
        <i class="el-icon-close icon-close fr"></i>
      </div>
      <div class="dialog-body">
        <ul>
          <li>
            <h4>GB/T7714</h4>
            <p>
              Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He. Experiment study on 
              stimulated scattering of ZnO nanosphere diapered in water[J]. Journal of Nanoparticle
              Research, 2016, 18(1): 1-8.
            </p>
          </li>
          <li>
            <h4>MLA</h4>
            <p>
              Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He. Experiment study on 
              stimulated scattering of ZnO nanosphere diapered in water[J]. Journal of Nanoparticle
              Research, 2016, 18(1): 1-8.
            </p>
          </li>
          <li>
            <h4>APA</h4>
            <p>
              Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He. Experiment study on 
              stimulated scattering of ZnO nanosphere diapered in water[J]. Journal of Nanoparticle
              Research, 2016, 18(1): 1-8.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: ['show'],
  data() {
    return {
      userName: '',
      password: '',
    }
  }
}
</script>

<style scoped lang="scss">

</style>
