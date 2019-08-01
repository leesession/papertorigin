<template>
	<div class="searchList">
    <search title="Home" index="0"></search>
		<div class="list">
			<div class="list-cont">
				<div class="title">
          <i class="icon icon-note"></i>
          <span>{{details.title}}</span>
        </div>
        <p><i v-for="(o, i) in details.creators" :key="i">{{o.creator}}</i></p>
        <p>
          <em>{{details.publisher}}</em> | <em @click="jumpPage">{{details.publicationName}}</em>
          | Volume {{details.volume}} | Page {{details.startingPage}}-{{details.endingPage}} | {{details.publicationDate}}
        </p>
        <p style="cursor: pointer;" @click="jumpPage">DOI：<span>{{details.doi}}</span></p>
        <p>ISSN：{{details.issn}}</p>
        <div class="list-cont-title">
          <i class="icon icon-zero"></i>
          <span>Abstract</span>
        </div>
        <p class="tips">{{details.abstract}}</p>
        <div class="list-cont-title" v-if="details.keyword">
          <i class="icon icon-zero"></i>
          <span>Keyword</span>
        </div>
        <p class="tips" v-if="details.keyword">{{details.keyword}}</p>
        <div class="tools">
          <div class="col" @click="addListNum(1)">
            <i class="icon icon-eyes"></i>
            <span>{{numObj.lookCount}}</span>
          </div>
          <div class="col" @click="addListNum(2)">
            <i class="icon icon-quote"></i>
            <span>{{numObj.quoteCount}}</span>
          </div>
          <div class="col" @click="addListNum(3)">
            <i class="icon icon-share"></i>
            <span>{{numObj.forwardCount}}</span>
          </div>
        </div>
        <div class="btn-box">
          
          <a v-if="isLogin" href="http://api.springernature.com/metadata/json?q=(doi:10.1007/s10853-019-03707-1)&api_key=eded390c0074daf47de31d49ab06d924">DOWNLOAD</a>
          <a v-if="!isLogin" href="javascript:void(0)">DOWNLOAD</a>
          
          <!-- <button>DOWNLOAD</button> -->
        </div>
			</div>
      <!-- <aside class="my-aside">
				<div class="col">
					<h3>Published Date:</h3>
					<p>~2018</p>
					<p>~2017</p>
					<p>~2016</p>
					<p>~2015</p>
					<span>See More</span>
				</div>
				<div class="col">
					<h3>Subjects:</h3>
					<p>Inorganic Chemistry</p>
					<p>Material Science</p>
					<p>Nanotechnology</p>
					<p>Optics and Optoelectronics</p>
					<p>Plasmonics and Optical Devices</p>
					<span>More</span>
				</div>
				<div class="col">
					<h3>Publisher:</h3>
					<p>journal of Nanoparticle Research</p>
					<p>Nature physics</p>
					<p>Advanced Nanomaterials</p>
					<p>Optics Letter</p>
					<p>Chinese Optics Leter</p>
					<span>More</span>
				</div>
			</!-->
		</div>

	</div>
</template>

<script>
import { http } from '../../api/http.js'
import search from '../../components/search.vue'
export default {
	name: 'searchList',
	data() {
    return {
      checkAll: false,
      details: {},
      numObj: {},
      isLogin: ''
    }
  },
  components: { search },
  created() {
    this.details = sessionStorage.getItem('INFO') ? JSON.parse(sessionStorage.getItem('INFO')) : '';
    this.isLogin = sessionStorage.getItem('ISLOGIN');
    this.getListNum();

  },
  methods: {
    jumpPage() {
      if(this.details.url && this.details.url[0].value){
        window.open(this.details.url[0].value);
      }else {
        window.open(this.details.urls);
      }
    },
    getListNum() {
      let data = {
        doiList: [this.details.doi],
        singnal: ""
      }
      http.getListNum(data, res => {
        if (res.code == 'SUCCES') {
          this.numObj = res.data[0];
        }
      });
    },
    addListNum(index) {
      let data = {
        forwardCount: 0,
        lookCount: 0,
        peperDoi: this.details.doi,
        quoteCount: 0
      }
      if(index == 1) {
        data.lookCount = 1;
      } else if (index == 2) {
        data.quoteCount = 1;
      } else if (index == 3) {
        data.forwardCount = 1;
      }
      http.addListNum(data, res => {
        if (res.code == 'SUCCES') {
          this.getListNum();
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.list{
	display: flex;
  justify-content: flex-start;
  .list-cont{
    width: calc(100% - 368px);
    padding: 35px 0 0 0;
    background: linear-gradient(to bottom, #fff, #f5fcf9);
    .title{
      display: flex;
      justify-content: flex-start;
      margin-bottom: 25px;
      padding: 0 100px 0 70px;
      .icon-note{
        width: 31px;
        height: 34px;
        background: url(../../assets/images/file.png) no-repeat center center;
        background-size: 100%;
        margin-right: 10px;
      }
      span{
        display: inline-block;
        height: 34px;
        line-height: 34px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 22px;
        color: #29697E;
      }
    }
    .list-cont-title{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 35px 0 0 0;
      padding: 0 100px 0 70px;
      .icon-zero{
        width: 14px;
        height: 14px;
        background: #418095;
        border-radius: 100%;
        margin-right: 10px;
      }
      span{
        font-size: 22px;
        color: #418095;
      }
    }
    p{
      color: #485764;
      font-size: 18px;
      margin: 0 0 20px 0;
      padding: 0 100px 0 70px;
      em{
        display: inline-block;
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-radius: 13px;
        background: #ddf6ec;
        color: #009A7D;
        cursor: pointer;
      }
      span{
        color: #3356E3;
      }
      &.tips{
        line-height: 48px;
      }
    }
    .tools{
      display: flex;
      justify-content: flex-start;
      margin: 15px 0 0 0;
      padding: 0 100px 0 70px;
      .col{
        display: flex;
        justify-content: flex-start;
        margin: 0 40px 0 0;
        cursor: pointer;
        span{
          color: #2950EB;
          font-size: 18px;
        }
        .icon{
          width: 22px;
          height: 23px;
          margin-right: 10px;
          &.icon-eyes{
            width: 31px;
            height: 21px;
            background: url(../../assets/images/browse.png) no-repeat center center;
            break-before: 100% 100%;
          }
          &.icon-quote{
            background: url(../../assets/images/quote.png) no-repeat center center;
            break-before: 100% 100%;
          }
          &.icon-share{
            background: url(../../assets/images/share.png) no-repeat center center;
            break-before: 100% 100%;
          }
        }
      }
    }
    .btn-box{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 108px;
      border-top: 1px solid #D5E0E2;
      margin: 30px 0 0 0;
      a{
        display: inline-block;
        width: 165px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: linear-gradient(to right, #5DC1E2, #427387);
        color: #fff;
        font-size: 22px;
      }
    }
  }
	
}
</style>


