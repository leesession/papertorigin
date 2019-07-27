<template>
	<div class="searchList">
    <search title="Home" index="0" ref="searchBox"></search>
		<div class="list">
			<div class="list-cont">
				<div class="title">
					<span>Results:{{startNum}}-{{endNum}}/{{total}}</span>
				</div>
				<div class="cont">
					<ul>
						<li v-for="(item, index) in list" :key="index" @click="goDetails">
							<el-checkbox v-model="checkAll" class="check-all">select all</el-checkbox>
							<el-checkbox v-model="checkAll" class="check-col">{{item.title}}</el-checkbox>
							<p><i v-for="(o, i) in item.creators" :key="i">{{o.creator}}</i></p>
							<p>
								<em>{{item.publisher}}</em> | <em>{{item.publicationName}}</em>
								| Volume {{item.volume}} | Page {{item.startingPage}}-{{item.endingPage}} | {{item.publicationDate}}
							</p>
							<p>DOI：<span>{{item.doi}}</span></p>
							<p>ISSN：{{item.issn}}</p>
							<div class="tools">
								<div class="col">
									<i class="icon icon-eyes"></i>
									<span>123</span>
								</div>
								<div class="col" @click="openDialog">
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
        <div class="page-box" v-if="total != 0">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
			</div>
      <aside class="my-aside">
				<div class="col">
					<h3>Published Date:</h3>
          <div v-if="!yearFlag">
            <p v-for="(item, index) in year" :key="index" v-if="index < 4" @click="yearClickEvent(item.value)">~{{item.value}}</p>
          </div>
          <div v-if="yearFlag">
            <p v-for="(item, index) in year" :key="index">~{{item.value}}</p>
          </div>
					<span @click="yearMore" v-show="!yearFlag">See More</span>
				</div>
				<div class="col">
					<h3>Subjects:</h3>
          <div v-if="!subjectsFlag">
            <p v-for="(item, index) in subjects" :key="index" v-if="index < 5">{{item.value}}</p>
          </div>
          <div v-if="subjectsFlag">
            <p v-for="(item, index) in subjects" :key="index">{{item.value}}</p>
          </div>
					<span @click="subjectsMore" v-show="!subjectsFlag">More</span>
				</div>
				<div class="col">
					<h3>Publisher:</h3>
					<div v-if="!publisherFlag">
            <p v-for="(item, index) in publisher" :key="index" v-if="index < 5">{{item.value}}</p>
          </div>
          <div v-if="publisherFlag">
            <p v-for="(item, index) in publisher" :key="index">{{item.value}}</p>
          </div>
					<span @click="publisherMore" v-show="!publisherFlag">More</span>
				</div>
			</aside>
		</div>

    <citation :show="citationShow" @listenFun="getCitationMsg"></citation>  
	</div>
</template>

<script>
import search from '../../components/search.vue'
import citation from '../../components/citation.vue'
export default {
	name: 'searchList',
	data() {
    return {
      checkAll: false,
      citationShow: false,
      pagination: {},
      total: 0,
      start: 1,
      startNum: 1,
      endNum: 10,
      type: '',
      key: '',
      url: 'http://api.springernature.com/metadata/json?api_key=eded390c0074daf47de31d49ab06d924',
      list: [],
      year: [],
      subjects: [],
      publisher: [],
      yearFlag: false,
      subjectsFlag: false,
      publisherFlag: false
    }
  },
  components: { search, citation },
  created() {
    this.type = this.$route.query.type ? this.$route.query.type : '';
    this.key = this.$route.query.key ? this.$route.query.key : '';
    this.searchEvent();
  },
  mounted() {
    this.$refs.searchBox.key = this.key;
    this.$refs.searchBox.selectVal = this.type;
  },
	methods: {
		openDialog() {
			this.citationShow = true;
		},
		getCitationMsg(data) {
			this.citationShow = data;
    },
    searchEvent() {
      let _url = this.url + '&q=' + this.type + ':' + this.key; 
      $.ajax({
        type: "get",
        url: _url,
        data: "",
        success: res => {
          this.total = Number(JSON.parse(res).result[0].total);
          this.start = Number(JSON.parse(res).result[0].start);
          this.list = JSON.parse(res).records;
          this.year = JSON.parse(res).facets[3].values;
          this.subjects = JSON.parse(res).facets[0].values;
          this.publisher = JSON.parse(res).facets[2].values;
        }
      });
    },
    handleCurrentChange: function (page) {
      let totalPage = Math.ceil(this.total / 10);
      this.startNum = 1 + (Number(page) - 1) * 10;
      this.endNum = 10 + (Number(page) - 1) * 10;
      if (Number(page) == totalPage) {
        this.endNum = this.total;
      }
      let _url = this.url + '&q=' + this.type + ':' + this.key + '&s=' + page; 
      $.ajax({
        type: "get",
        url: _url,
        data: "",
        success: res => {
          this.total = Number(JSON.parse(res).result[0].total);
          this.list = JSON.parse(res).records;
        }
      });
    },
    goDetails() {
      this.$router.push({path: '/searchDetails'});
    },
    yearMore() {
      this.yearFlag = true;
    },
    subjectsMore() {
      this.subjectsFlag = true;
    },
    publisherMore() {
      this.publisherFlag = true;
    },
    yearClickEvent(year) {
      let _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + year + ')';
      $.ajax({
        type: "get",
        url: _url,
        data: "",
        success: res => {
          this.total = Number(JSON.parse(res).result[0].total);
          this.list = JSON.parse(res).records;
        }
      });
    }
	}
}
</script>

<style scoped lang="scss">
.page-box{
  padding: 20px 0;
  text-align: center;
}
.list{
	display: flex;
  justify-content: flex-start;
  .list-cont{
    width: calc(100% - 368px);
  }
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
		}
	}
}
</style>


