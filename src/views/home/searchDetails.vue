<template>
	<div class="searchList">
		<site-header></site-header>
    <search title="Home" index="0"></search>
		<div class="list">
			<div class="list-cont">
				<div class="title">
          <i class="icon icon-note"></i>
          <span>Experiment study on stimulated scattering of ZnO nanosphere dispersed in water</span>
        </div>
        <p>Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He</p>
        <p>
          <em>Springer</em> | <em>Journal of Nanoparticle Research</em>
          | Volume 18 | Page 1-8 | 2016-01-19
        </p>
        <p>DOI：<span>http://dx.doi.org/10.1007/a11051-016-3333-1</span></p>
        <p>ISSN：1572-896X</p>
        <div class="list-cont-title">
          <i class="icon icon-zero"></i>
          <span>Abstract</span>
        </div>
        <p class="tips">
          The backward stimulated scattering (BSS) from ZnO nanospheres dispersed in water has been
          investigated experimentally by employing a Nd:YAG pulse laser with ~532 nm wavelength and ~8
          ns pulse width as the pump laser source. The present results show that the BSS effect is uniquely 
          and unequivocally different compared to other known stimulated scattering,   such as stimulated 
          Rayleigh scattering,   stimulated Brillouin scattering,and stimulated Raman scattering,    and it 
          displaysthe characteristics of no frequency shift and threshold dependence on initial spontaneous 
          Mie scattering seed source. These can be understood by means of the Mie scattering theory and 
          a laser-induced stationary Bragg grating model.
        </p>
        <div class="list-cont-title">
          <i class="icon icon-zero"></i>
          <span>Keyword</span>
        </div>
        <p class="tips">Stimulated scattering, ZnO nanospheres, Mie theory, Stationary Bragg grating</p>
        <div class="tools">
          <div class="col">
            <i class="icon icon-eyes"></i>
            <span>123</span>
          </div>
          <div class="col">
            <i class="icon icon-quote"></i>
            <span>456</span>
          </div>
          <div class="col">
            <i class="icon icon-share"></i>
            <span>789</span>
          </div>
        </div>
        <div class="btn-box">
          <button>DOWNLOAD</button>
        </div>
			</div>
      <aside class="my-aside">
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
			</aside>
		</div>

	</div>
</template>

<script>
import siteHeader from '../../components/header.vue'
import search from '../../components/search.vue'
export default {
	name: 'searchList',
	data() {
    return {
			checkAll: false
    }
  },
  components: { siteHeader, search },
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
      button{
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


