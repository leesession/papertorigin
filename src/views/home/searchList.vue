<template>
	<div class="searchList">
		<site-header></site-header>
    <search title="Home" index="0"></search>
		<div class="list">
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
			<div class="list-cont">
				<div class="title">
					<span>Results:1-20/169</span>
				</div>
				<div class="cont">
					<ul>
						<li>
							<el-checkbox v-model="checkAll" class="check-all">select all</el-checkbox>
							<el-checkbox v-model="checkAll" class="check-col">Experiment study on stimulated scattering of ZnO nanosphere dispersed in water</el-checkbox>
							<p>Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He</p>
							<p>
								<em>Springer</em> | <em>Journal of Nanoparticle Research</em>
								| Volume 18 | Page 1-8 | 2016-01-19
							</p>
							<p>DOI：<span>http://dx.doi.org/10.1007/a11051-016-3333-1</span></p>
							<p>ISSN：1572-896X</p>
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
						</li>
						<li>
							<el-checkbox v-model="checkAll" class="check-all">select all</el-checkbox>
							<el-checkbox v-model="checkAll" class="check-col">Experiment study on stimulated scattering of ZnO nanosphere dispersed in water</el-checkbox>
							<p>Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He</p>
							<p>
								<em>Springer</em> | <em>Journal of Nanoparticle Research</em>
								| Volume 18 | Page 1-8 | 2016-01-19
							</p>
							<p>DOI：<span>http://dx.doi.org/10.1007/a11051-016-3333-1</span></p>
							<p>ISSN：1572-896X</p>
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
						</li>
						<li>
							<el-checkbox v-model="checkAll" class="check-all">select all</el-checkbox>
							<el-checkbox v-model="checkAll" class="check-col">Experiment study on stimulated scattering of ZnO nanosphere dispersed in water</el-checkbox>
							<p>Jiulin Shi, Haopeng Wu, Feng Yan, Junjie Yang, Xingdao He</p>
							<p>
								<em>Springer</em> | <em>Journal of Nanoparticle Research</em>
								| Volume 18 | Page 1-8 | 2016-01-19
							</p>
							<p>DOI：<span>http://dx.doi.org/10.1007/a11051-016-3333-1</span></p>
							<p>ISSN：1572-896X</p>
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
						</li>
					</ul>
				</div>
			</div>
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
	width: calc(100% - 368px);
	display: flex;
	justify-content: flex-start;
	.title{
		height: 70px;
		line-height: 70px;
		background: #F6F8F9;
		border-bottom: 1px solid #D9E5E7;
		padding: 0 55px;
		span{
			font-size: 28px;
			color: #515354;
		}
	}
	.cont{
		li{
			padding: 28px 100px 25px 40px;
			border-bottom: 1px solid #D9E5E7;
			cursor: pointer;
			p{
				color: #485764;
				font-size: 18px;
				margin: 0 0 10px 35px;
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
			}
			.tools{
				display: flex;
				justify-content: flex-start;
				margin: 15px 0 0 35px;
				.col{
					display: flex;
					justify-content: flex-start;
					margin: 0 40px 0 0;
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
		}
	}
}
</style>


