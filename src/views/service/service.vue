<template>
  <div class="service">
    <search title="Our Service" index="1"></search>
    <div class="we-do">
      <h2 class="wrap1100">what can we do?</h2>
      <div class="cont wrap1100">
        <div class="cont-left">
          <!-- <p>
            <i></i>
            <span>
              TASSEL SCHOLAR will provide  the latest paper searching and the most comprehensive 
              article retrieving for global users. Our data information will obtain from publishers to keep 
              copyright and accuracy so that users can derive the most qualified information searching 
              service.
            </span> 
          </p>
          <p>
            <i></i>
            <span>
              TASSEL SCHOLAR will ensure every user canretrieve every academic paper information 
              including titles, authors,  DOI,  subjects,  keywords,  abstracts etc.  Users cantransfer to 
              officialwebsites of publishers to obtain corresponding full article of academic papers.
            </span>
          </p> -->
        </div>
        <img src="../../assets/images/service-blue.png" alt="">
      </div>
    </div>
    <div class="citation-service">
      <div class="wrap1100">
        <h2>Citation Service!</h2>
        <p>TASSEL SCHOLAR will help users to cite the latest articles and the most comprehensive academic papers for their paper writing</p>
      </div>
    </div>

    <div class="shares-ervice">
      <div class="wrap1100">
        <h2>Share Service!</h2>
        <p>TASSEL SCHOLAR will help users to share academic paper to others by social network tools so that authors and researchers can 
share and spread academic achievements.</p>
      </div>
    </div>
  </div>
</template>

<script>
import search from '../../components/search.vue'
export default {
  name: 'service',
  data() {
    return {

    }
  },
  components: { search },
}
</script>

<style scoped lang="scss">
.we-do{
  height: 350px;
  background: url(../../assets/images/service-bg1.png) no-repeat center 54px;
  background-size: 100% 100%;
  h2{
    font-size: 28px;
    color: #667C83;
    margin: 45px auto 0 auto;
  }
  .cont{
    display: flex;
    justify-content: flex-start;
    img{
      width: 263px;
      height: 296px;
    }
    .cont-left{
      width: 805px;
      padding: 0 30px 0 0;
      p{
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
        &:first-child{
          margin-top: 50px;
        }
        span{
          display: inline-block;
          width: 780px;
          line-height: 32px;
          font-size: 18px;
          color: #32424F;
        }
        i{
          display: inline-block;
          width: 14px;
          height: 14px;
          border-radius: 100%;
          background: #667C83;
          margin: 10px 10px 0 0;
        }
      }
    }
  }

}
.citation-service{
  height: 190px;
  background: url(../../assets/images/service-bg2.png) no-repeat left 50px;
  margin-top: 60px;
  h2{
    line-height: 100px;
    text-align: center;
    font-size: 28px;
    color: #667C83;
  }
  p{
    text-align: center;
    font-size: 18px;
    color: #485764;
  }
}
.shares-ervice{
  width: 100%;
  height: 202px;
  background: url(../../assets/images/service-bg3.png) no-repeat center center;
  background-size: 100%;
  h2{
    line-height: 95px;
    text-align: center;
    font-size: 28px;
    color: #fff;
  }
  p{
    line-height: 32px;
    font-size: 18px;
    color: #DFDFDF;
  }
}
</style>


