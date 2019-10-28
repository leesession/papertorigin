<template>
  <div class="contact">
    <search title="Contact Us" index="4"></search>
    <div class="map-box">
      <h2>Contact Information</h2>
      <div id="map" class="map"></div>
      <div class="info">
        <div class="info-left">
          <b>How to find us</b>
        </div>
        <div class="info-right">
          <div class="col">
            <i class="icon icon-phone"></i>
            <span>+86 028-8888-8888</span>
          </div>
          <div class="col">
            <i class="icon icon-email"></i>
            <span>service@tasselscholar.com</span>
          </div>
          <div class="col">
            <i class="icon icon-address"></i>
            <span style="margin-top: 10px">{{address}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <ul>
        <li v-for="(item,index) in concatArr" :key="index">
          <h4>{{item.name}}</h4>
          <p>{{item.Landline}}</p>
          <p>{{item.mobile}}</p>
          <p>{{item.email}}</p>
          <p>{{item.address}}</p>
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
      address: 'NO.366, North Hupan Road, Chengdu 610000, China',
      icon: require("../../assets/images/icon.png"),
        concatArr:[{
                name:'Administrative Management',
                Landline:'Telephone: +86 028-8888-8888',
                mobile:'Mobilephone: +86 18270890446',
                email:'E-mail: yanfeng@tasselpaper.com',
                address:'Address: NO.366, North Hupan Road, Chengdu 610000, China'
            },{
            name:'Market and Cooperation',
            Landline:'Telephone: +86 028-8888-8888',
            mobile:'Mobilephone: +86 15889666049',
            email:'E-mail: yangjunjie@tasselpaper.com',
            address:'Address: NO.366, North Hupan Road, Chengdu 610000, China'
        },{
            name:'Product and Service',
            Landline:'Telephone: +86 028-8888-8888',
            mobile:'Mobilephone: +86 13361642689',
            email:'E-mail: ruhang@tasselpaper.com',
            address:'Address: NO.366, North Hupan Road, Chengdu 610000, China'
        },{
            name:'Technology and Design',
            Landline:'Telephone: +86 028-8888-8888',
            mobile:'Mobilephone: +86 17308055063',
            email:'E-mail: shenghao@tasselpaper.com',
            address:'Address: NO.366, North Hupan Road, Chengdu 610000, China'
        }]
    }
  },
  components: { search },
  created() {
  },
  mounted() {
    //创建实例
    var map = new BMap.Map("map");
    map.enableScrollWheelZoom(true);
    var point = new BMap.Point(104.0886656614,30.4077001089);
    map.centerAndZoom(point,12);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    var opts = {
      width : 200,     // 信息窗口宽度
      height: 80,     // 信息窗口高度
      title : "Address:",  // 信息窗口标题
      offset: new BMap.Size(0, -24),
    }
    var infoWindow = new BMap.InfoWindow(this.address, opts);
    map.openInfoWindow(infoWindow, point);

  }
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
      width: 380px;
      overflow: hidden;
      padding: 0 2px 0 8px;
      display: flex;
      align-items: center;
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
  overflow: hidden;
  background: linear-gradient(to right, #575281 , #517e98);
  padding: 115px 0 0 0;
  margin-bottom: 25px;
  li{
    float: left;
    width: 33.3%;
    border-right: 1px solid #fff;
    margin: 0 0 30px 0;
    padding: 0 0 0 2%;
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


