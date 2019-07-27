<template>
  <div class="home">
    <div class="banner-box">
      <div class="head">
        <img src="../../assets/images/logo.png" alt="" class="logo">
        <nav>
          <ul>
            <li v-for="(item, index) in navList" :key="index" :class="{active: index == activeNum}" @click="navClickEvent(item)">
              <span>{{item.name}}</span>
            </li>
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
        <div class="search">
          <el-dropdown trigger="click" class="search-key">
            <span class="el-dropdown-link">
              journal
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>journal</el-dropdown-item>
              <el-dropdown-item>conference</el-dropdown-item>
              <el-dropdown-item>thesis</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <input type="text" class="search-ipt">
        </div>
        <button class="search-btn">SEARCH</button>
      </div>
    </div>

    <div class="common-box service-box">
      <div class="title">
        <h3>Our  Service</h3>
      </div>
      <div class="cont">
        <p>TASSEL SCHOLAR will provide the latest paper searching and the most comprehensive article retrieving for global users. </p>
        <p>Our data information will obtain from publishers to keep copyright and accuracy so that users can derive the most </p>
        <p>qualified information searching service. tassels cholar will ensure every user can</p>
        <p>retrieve every academic paper information including titles, authors, DOI, </p>
        <p>subjects, keywords, abstracts etc. Users can transfer to official </p>
        <p>websites of publishers to obtain corresponding </p>
        <p>full article of academic papers</p>
      </div>
    </div>

    <div class="common-box resource-box">
      <div class="title">
        <h3>Our  Resource</h3>
      </div>
      <div class="cont">
        <div class="tab">
          <span class="active">Journal</span>
          <span>Conference</span>
          <span>Thesis</span>
        </div>
        <div class="wrap1100">
          <h4>What resources do we have?</h4>
          <p>TASSEL SCHOLAR make cooperation with below journal publishers to provide academic paper information searching and retrieving</p>
        </div>
        <el-carousel :interval="5000" arrow="always" class="resource-banner wrap1150" height="160px" indicator-position="none">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="../../assets/images/sky-home.png" alt="">
            <img src="../../assets/images/sky-home.png" alt="">
            <img src="../../assets/images/sky-home.png" alt="">
            <img src="../../assets/images/sky-home.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="common-box about-us-box">
      <div class="title">
        <h3>About  Us</h3>
      </div>
      <div class="cont">
        <el-carousel :interval="5000" arrow="always" height="280px" indicator-position="none">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="../../assets/images/service-blue.png" alt="" class="fl">
            <div class="introduce fl">
              <h6>Feng Yan<span>Management</span></h6>
              <p>
                Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has beenauthorized more than 35 Chinese patents, and one of his 
                scientific projects obtained ¥250000 organization cooperation in undergraduate 
                university.He is responding to management and business development
              </p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="common-box contact-us-box">
      <div class="title">
        <h3>Contact  Us</h3>
      </div>
      <div class="contact wrap1150">
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
          <span class="spe">NO.366, North Hupan Road, Chengdu 610000, China</span>
        </div>
      </div>
      <el-carousel :interval="5000" arrow="always" height="200px" indicator-position="none">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="card">
            <h6>Administrative Management</h6>
            <p>Telephone: +86 028-6162-6264</p>
            <p>Mobilephone: +86 13367537892</p>
            <p>E-mail: yanfeng@tasselpaper.com</p>
            <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
          </div>
          <div class="card">
            <h6>Administrative Management</h6>
            <p>Telephone: +86 028-6162-6264</p>
            <p>Mobilephone: +86 13367537892</p>
            <p>E-mail: yanfeng@tasselpaper.com</p>
            <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
          </div>
          <div class="card">
            <h6>Administrative Management</h6>
            <p>Telephone: +86 028-6162-6264</p>
            <p>Mobilephone: +86 13367537892</p>
            <p>E-mail: yanfeng@tasselpaper.com</p>
            <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="footer-box">
      <div class="footer">
        <div class="wrap1300">
          <div>
            <span>Social  Media</span>
            <i class="icon icon-f"></i>
            <i class="icon icon-xl"></i>
            <i class="icon icon-fg"></i>
            <i class="icon icon-wx"></i>
          </div>
          <div>
            <span>Supportable Mobile Terminal</span>
            <i class="icon icon-ios"></i>
            <i class="icon icon-android"></i>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      key: '',
      navList: [
        {
          name: 'Home',
          path: '/home'
        },
        {
          name: 'Our Service',
          path: '/service'
        },
        {
          name: 'Our Resource',
          path: '/resource'
        },
        {
          name: 'About Us',
          path: '/about'
        },
        {
          name: 'Contact Us',
          path: '/contact'
        }
      ],
      activeNum: 0
    }
  },
  methods: {
    navClickEvent(obj) {
      this.$router.push({ path: obj.path});
    }
  }
}
</script>

<style scoped lang="scss">
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
.search-box{
  margin: 40px 0 0 0;
}
.common-box{
  .title{
    text-align: center;
    h3{
      display: inline-block;
      height: 65px;
      line-height: 65px;
      font-size: 28px;
      color: #29697E;
    }
  }
}
.service-box{
  width: 100%;
  height: 310px;
  overflow: hidden;
  background: url(../../assets/images/service-bg.png) no-repeat center 20px;
  background-size: 100% 100%;
  .title h3{
    border-bottom: 2px solid #29697E;
  }
  .cont{
    text-align: center;
    margin-top: 25px;
    p{
      line-height: 28px;
      font-size: 16px;
      color: #485764;
    }
  }
  
}
.resource-box{
  width: 100%;
  height: 390px;
  overflow: hidden;
  background: #F6F8F9;
  .title h3{
    height: 75px;
    line-height: 75px;
  }
  .cont{
    .tab{
      width: 420px;
      height: 36px;
      overflow: hidden;
      border: 1px solid #EFEFEF;
      box-shadow: 0 6px 12px rgba(77, 112, 123, 0.18);
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      span{
        width: 140px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-right: 1px solid #F2F2F4;
        cursor: pointer;
        &:last-child{
          border: none;
        }
        &:hover, &.active{
          color: #fff;
          background: #4D707B;
        }
      }
    }
    .wrap1100{
      margin-top: 10px;
    }
    h4{
      line-height: 50px;
      font-size: 20px;
      color: #0B1A30;
    }
    p{
      font-size: 16px;
      color: #414C55;
    }
    .resource-banner{
      margin-top: 30px;
      img{
        width: 216px;
        height: 70px;
        margin: 0 32px;
      }
      .el-carousel__item{
        padding: 0 40px;
        display: flex;
        align-items: center;
      }
    }
  }
}
.about-us-box{
  width: 100%;
  height: 380px;
  overflow: hidden;
  background: linear-gradient(to right, #3B2B6A , #307C95);
  .title h3{
    height: 75px;
    line-height: 75px;
    color: #fff;
  }
  .cont{
    margin-top: 25px;
    img{
      width: 284px;
      height: 284px;
      margin: 0 35px 0 0;
    }
    .introduce{
      width: 700px;
      h6{
        line-height: 85px;
        font-size: 26px;
        color: #A8FFFC;
      }
      p{
        line-height: 32px;
        font-size: 18px;
        color: #D8D8D8;
      }
    }
  }
}
.contact-us-box{
  width: 100%;
  height: 475px;
  overflow: hidden;
  background: #f6f6f6 url(../../assets/images/map.png) no-repeat center 60px;
  .title h3{
    height: 90px;
    line-height: 90px;
  }
  .contact{
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 55px;
    .col{
      width: 385px;
      text-align: center;
      &:last-child{
        width: 430px;
      }
      .icon-phone{
        width: 31px;
        height: 31px;
        background: url(../../assets/images/phone.png) no-repeat center center;
        background-size: 100% 100%;
        margin-top: 8px;
      }
      .icon-email{
        width: 38px;
        height: 31px;
        background: url(../../assets/images/mailer.png) no-repeat center center;
        background-size: 100% 100%;
        margin-top: 8px;
      }
      .icon-address{
        width: 34px;
        height: 41px;
        background: url(../../assets/images/location.png) no-repeat center center;
        background-size: 100% 100%;
      }
      span{
        display: block;
        font-size: 18px;
        color: #53565B;
        margin-top: 20px;
        &.spe{
          font-size: 16px;
        }
      }
    }
  }
  .card{
    float: left;
    width: 425px;
    height: 190px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 3px 12px rgba(100, 100, 100, 0.18);
    margin: 0 5px;
    padding: 20px 10px 0 20px;
    h6{
      line-height: 32px;
      font-size: 18px;
      color: #47535D;
    }
    p{
      line-height: 24px;
      font-size: 13px;
      color: #414C55;
    }
  }
}
.footer-box{
  width: 100%;
  height: 95px;
  background: #f6f6f6;
  .footer{
    height: 70px;
    line-height: 70px;
    background: #D5E7E9;
    .wrap1300{
      display: flex;
      justify-content: space-between;
    }
    span{
      float: left;
      font-size: 20px;
      color: #6C767E;
    }
    .icon{
      float: left;
      width: 36px;
      height: 36px;
      margin: 17px 0 0 25px;
      cursor: pointer;
      &.icon-f{
        background: url(../../assets/images/facebook.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/facebook-active.png) no-repeat center center;
        }
      }
      &.icon-xl{
        background: url(../../assets/images/microblog.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/microblog-active.png) no-repeat center center;
        }
      }
      &.icon-fg{
        background: url(../../assets/images/twitter.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/twitter-active.png) no-repeat center center;
        }
      }
      &.icon-wx{
        background: url(../../assets/images/wechat.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/wechat-active.png) no-repeat center center;
        }
      }
      &.icon-ios{
        width: 33px;
        height: 39px;
        background: url(../../assets/images/apple.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/apple-active.png) no-repeat center center;
        }
      }
      &.icon-android{
        height: 39px;
        background: url(../../assets/images/android.png) no-repeat center center;
        background-size: 100% 100%;
        &:hover{
          background: url(../../assets/images/android-active.png) no-repeat center center;
        }
      }
    }
  }
}
</style>

