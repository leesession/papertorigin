<template>
  <div class="contact">
    <search title="Contact Us" index="4"></search>
    <div class="map-box">
      <h2>Contact Information</h2>
      <div class="map"></div>
      <div class="info">
        <div class="info-left">
          <span>How to</span>
          <b>find us</b>
        </div>
        <div class="info-right">
          <div class="col">
            <i class="icon icon-phone"></i>
            <span>+86 028-6162-6262</span>
          </div>
          <div class="col">
            <i class="icon icon-email"></i>
            <span>service@tasselscholar.com</span>
          </div>
          <div class="col">
            <i class="icon icon-address"></i>
            <span>NO.366, North Hupan Road, Chengdu 610000, China</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <ul>
        <li>
          <h4>Administrative Management</h4>
          <p>Telephone: +86 028-6162-6264</p>
          <p>Mobilephone: +86 13367537892</p>
          <p>E-mail: yanfeng@tasselpaper.com</p>
          <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
        </li>
        <li>
          <h4>Market and Cooperation</h4>
          <p>Telephone: +86 028-6162-6266</p>
          <p>Mobilephone: +86 13367533362</p>
          <p>E-mail: yangjunjie@tasselpaper.com</p>
          <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
        </li>
        <li>
          <h4>Product and Service</h4>
          <p>Telephone: +86 028-6162-6268</p>
          <p>Mobilephone: +86 13362347865</p>
          <p>E-mail: ruhang@tasselpaper.com</p>
          <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
        </li>
        <li>
          <h4>Technology and Design</h4>
          <p>Telephone: +86 028-6162-6270</p>
          <p>Mobilephone: +86 13362343628</p>
          <p>E-mail: shenghao@tasselpaper.com</p>
          <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import search from '../../components/search.vue'
export default {
  name: 'contact',
  data() {
    return {

    }
  },
  components: { search }
}
</script>

<style scoped lang="scss">
.map-box{
  width: 100%;
  position: relative;
  h2{
    height: 75px;
    line-height: 75px;
    text-align: center;
    background: #f6f8f9;
    font-size: 28px;
    color: #6A7884;
  }
  .map{
    height: 490px;
    background: #ccc;
  }
  .info{
    position: absolute;
    top: 480px;
    left: 50%;
    transform: translateX(-50%);
    width: 790px;
    height: 160px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 12px rgba(77, 112, 123, 0.3);
    display: flex;
    justify-content: flex-start;
    .info-left{
      width: 300px;
      overflow: hidden;
      padding: 0 0 0 32px;
      span{
        display: block;
        font-size: 18px;
        color: #667C83;
        margin: 45px 0 5px 0;
      }
      b{
        font-size: 26px;
        color: #262828;
      }
    }
    .info-right{
      .col{
        float: left;
        display: flex;
        justify-content: flex-start;
        &:nth-child(1){
          margin-right: 75px;
        }
        &:nth-child(1), &:nth-child(2){
          height: 100px;
          line-height: 100px;
        }
        span{
          font-size: 18px;
          color: #53565B;
        }
        .icon{
          width: 31px;
          height: 31px;
          margin: 32px 15px 0 0;
          &.icon-phone{
            background: url(../../assets/images/phone.png) no-repeat center center;
            background-size: 100% 100%;
          }
          &.icon-email{
            background: url(../../assets/images/email.png) no-repeat center center;
            background-size: 100% 100%;
          }
          &.icon-address{
            width: 25px;
            height: 32px;
            background: url(../../assets/images/local.png) no-repeat center center;
            background-size: 100% 100%;
            margin: 0 15px 0 0;
          }
        }
      }
    }
  }
}
.footer{
  height: 460px;
  overflow: hidden;
  background: linear-gradient(to right, #575281 , #517e98);
  padding: 115px 0 0 0;
  li{
    float: left;
    width: 33.3%;
    height: 140px;
    border-right: 1px solid #fff;
    margin: 0 0 30px 0;
    padding: 0 0 0 4%;
    &:nth-child(3n), &:last-child{
      border: none;
    }
    h4{
      font-size: 18px;
      color: #58EEFF;
      margin-bottom: 10px;
    }
    p{
      line-height: 28px;
      font-size: 14px;
      color: #F5F5F5;
    }
  }
}
</style>


