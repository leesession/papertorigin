<template>
  <div class="resource">
    <search title="Our Resource" index="2"></search>
    <div class="title wrap1300">
      <h1>What resources do we have?</h1>
      <h6>TASSEL SCHOLAR make cooperation with below journal publishers to provide academic paper information searching and retrieving</h6>
    </div>
    <div class="box wrap1300">
      <div class="row">
        <div class="box-title">
          <span>Journal</span>
        </div>
        <div class="box-cont">
          <img src="../../assets/images/logo-springernature.svg" alt="">
          <img src="../../assets/images/ieee.jpg" alt="">
          <!--<img src="../../assets/images/resours-01.png" alt="">-->
        </div>
      </div>
      <div class="row">
        <div class="box-title">
          <span>Conference</span>
        </div>
        <div class="box-cont">
          <img src="../../assets/images/logo-springernature.svg" alt="">
          <img src="../../assets/images/ieee.jpg" alt="">
        </div>
      </div>
      <div class="row">
        <div class="box-title">
          <span>Thesis</span>
        </div>
        <div class="box-cont">
          <!--<img src="../../assets/images/resours-01.png" alt="">-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import search from '../../components/search.vue'
export default {
  name: 'resource',
  data() {
    return {

    }
  },
  components: { search },
}
</script>

<style scoped lang="scss">
.resource{
  padding-bottom: 50px;
}
.title{
  h1{
    height: 92px;
    line-height: 120px;
    font-size: 28px;
    color: #29697E;
  }
  p{
    font-size: 18px;
    color: #2D3F45;
  }
}
.box{
  padding: 38px 30px 38px 40px;
  margin: 30px auto 0 auto;
  box-shadow: 0 3px 7px rgba(33, 91, 90, 0.35);
  .box-title{
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: url(../../assets/images/title-bg.png) no-repeat left center;
    border-bottom: 1px solid #56B29D;
    span{
      display: inline-block;
      width: 175px;
      text-align: center;
      font-size: 28px;
      color: #fff;
    }
  }
  .box-cont{
    width: 100%;
    height: 165px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      margin: 0 50px 0 0;
      width: 216px;
    }
  }
}

</style>


