<template>
  <div class="home">
    <site-header></site-header>
    <div class="banner-box">
      <div class="head">
        <img src="../../assets/images/logo.png" alt="" class="logo">
        <nav>
          <ul>
            <li class="active"><span>Home</span></li>
            <li><span>Our Service</span></li>
            <li><span>Our Resource</span></li>
            <li><span>About Us</span></li>
            <li><span>Contact Us</span></li>
          </ul>
        </nav>
      </div>
      <div class="words-box">
        <div class="cont">
          <p>Search With Your Articles</p>
          <p>what do you want to retrieve today?</p>
        </div>
      </div>
      <div class="search-box">

      </div>
    </div>

    <div class="service-box">
      <h3>Our  Service</h3>
      <p>
        TASSEL SCHOLAR will provide the latest paper searching and the most comprehensive article retrieving for global users. 
        Our data information will obtain from publishers to keep copyright and accuracy so that users can derive the most 
        qualified information searching service. tassels cholar will ensure every user can
        retrieve every academic paper information including titles, authors, DOI, 
        subjects, keywords, abstracts etc. Users can transfer to official 
        websites of publishers to obtain corresponding 
        full article of academic papers
      </p>
    </div>

  </div>
</template>

<script>
import siteHeader from '../../compents/header.vue'
export default {
  name: 'home',
  components: { siteHeader },
  
}
</script>

<style scoped lang="scss">
.banner-box{
  width: 100%;
  height: 410px;
  overflow: hidden;
  background: url(../../assets/images/sky-home.png) no-repeat center center;
  background-size: 100% 100%;
  .head{
    display: flex;
    justify-content: space-between;
    height: 60px;
    .logo{
      width: 113px;
      height: 44px;
      margin: 15px 0 0 30px;
    }
    nav{
      margin: 0 20px 0 0;
      ul{
        display: flex;
        justify-content: flex-start;
      }
      li{
        height: 60px;
        line-height: 60px;
        margin: 0 0 0 40px;
        cursor: pointer;
        &:hover, &.active{
          span{
            color: #58EEFF;
            border-color: #58EEFF;
          }
        }
        span{
          display: inline-block;
          height: 48px;
          border-bottom: 3px solid transparent;
          font-size: 24px;
          color: #DDE9F7;
        }
      }
    }
  }
}
.words-box{
  width: 100%;
  margin-top: 73px;
  display: flex;
  justify-content: center;
  .cont{
    width: 408px;
    text-align: center;
    p{
      line-height: 40px;
      font-size: 20px;
      color: #fff;
      opacity: 0.6;
      &:first-child{
        line-height: 65px;
        border-bottom: 1px solid #fff;
        font-size: 30px;
        opacity: 1;
      }
    }
  }
}
</style>

