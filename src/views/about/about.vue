<template>
  <div class="about">
    <search title="About Us" index="3"></search>
    <div class="title wrap1150">
      <h3>Team Member</h3>
      <p>Group members in TASSEL SCHOLAR are from different famous universities and corporations in the global, each of them has</p>
      <p>experiences for management, operation, technology, data analysis, business development to provide the best service for every user</p>
    </div>
    <div class="box wrap1150">
      <ul>
        <li>
          <div class="cont">
            <img src="../../assets/images/service-blue.png" alt="">
            <div>
              <!-- <h4>Feng Yan<span>Management</span></h4> -->
              <p>
                <!-- Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has been 
                authorized more than 35 Chinese patents, and one of his scientific projects obtained ¥250000 
                organization cooperation in undergraduate university.He is responding to management and 
                business development -->
              </p>
            </div>
          </div>
          <div class="bg"></div>
        </li>
        <li>
          <div class="cont">
            <img src="../../assets/images/service-blue.png" alt="">
            <div>
              <!-- <h4>Feng Yan<span>Management</span></h4> -->
              <p>
                <!-- Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has been 
                authorized more than 35 Chinese patents, and one of his scientific projects obtained ¥250000 
                organization cooperation in undergraduate university.He is responding to management and 
                business development -->
              </p>
            </div>
          </div>
          <div class="bg"></div>
        </li>
        <li>
          <div class="cont">
            <img src="../../assets/images/service-blue.png" alt="">
            <div>
              <!-- <h4>Feng Yan<span>Management</span></h4> -->
              <p>
                <!-- Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has been 
                authorized more than 35 Chinese patents, and one of his scientific projects obtained ¥250000 
                organization cooperation in undergraduate university.He is responding to management and 
                business development -->
              </p>
            </div>
          </div>
          <div class="bg"></div>
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import search from '../../components/search.vue'
export default {
  name: 'about',
  data() {
    return {

    }
  },
  components: { search },
}
</script>

<style scoped lang="scss">
.about{
  padding-bottom: 35px;
}
.title{
  h3{
    height: 100px;
    line-height: 100px;
    font-size: 28px;
    color: #667C83;
  }
  p{
    line-height: 32px;
    font-size: 18px;
    color: #6A7884;
  }
}
.box{
  margin-top: 35px;
  li{
    width: 1155px;
    margin: 0 0 20px 0;
    position: relative;
    .bg{
      width: 1095px;
      height: 35px;
      background: url(../../assets/images/shodow.png) no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 30px;
      z-index: -1;
    }
    &:hover{
      height: 244px;
      .bg{
        top: 214px;
        z-index: 1;
      }
    }
    .cont{
      width: 100%;
      height: 214px;
      box-shadow: 0 5px 10px rgba(39, 91, 131, 0.18);
      display: flex;
      justify-content: flex-start;
      img{
        width: 184px;
        height: 184px;
        padding: 15px;
      }
      div{
        padding: 15px 0 0 0;
        width: 850px;
      }
      h4{
        height: 45px;
        line-height: 32px;
        font-size: 24px;
        color: #33B2C5;
        span{
          font-size: 20px;
          margin-left: 8px;
        }
      }
      p{
        line-height: 34px;
        font-size: 18px;
        color: #485764;
      }
    }
    
  }
}
</style>


