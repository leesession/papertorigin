<template>
    <div class="searchList">
        <search title="Search Results" index="0" :type="type" :keys="key"></search>
        <div class="list">
            <div class="list-cont" v-loading="contentLoading">
                <div class="title">
                    <i class="icon icon-note"></i>
                    <span @click="jumpPage">{{details.title}}</span>
                </div>
                <p><i v-for="(o, i) in details.creators" :key="i">{{o.creator || o.full_name}}<span
                        v-if="details.creators.length-1 > i">, </span></i></p>
                <p><em>{{details.publisher}}</em></p>
                <p><em>{{details.publicationName}}</em></p>
                <p>Volume {{details.volume}} | Page {{details.startingPage}}-{{details.endingPage}} |
                    {{details.publicationDate}}</p>
                <p>DOI：<span style="cursor: pointer;" @click="jumpPage">{{details.doi}}</span></p>
                <p>ISSN：{{details.issn}}</p>
                <!--<p>ISBN：{{details.isbn}}</p>-->
                <div class="list-cont-title">
                    <i class="icon icon-zero"></i>
                    <span>Abstract</span>
                </div>
                <p class="tips center">{{details.abstract?details.abstract.indexOf('Abstract') === -1?details.abstract :
                    details.abstract.replace(/Abstract/,''):''}}</p>
                <div class="list-cont-title" v-if="details.keyword">
                    <i class="icon icon-zero"></i>
                    <span>Keyword</span>
                </div>
                <p class="tips" v-if="details.keyword">{{details.keyword}}</p>
                <div class="tools">
                    <div class="col" title="view">
                        <i class="icon icon-eyes"></i>
                        <span>{{numObj.lookCount}}</span>
                    </div>
                    <div class="col" title="cite" @click="quoteShow">
                        <i class="icon icon-quote"></i>
                        <span>{{numObj.quoteCount}}</span>
                    </div>
                    <el-popover
                            placement="top"
                            width="200"
                            trigger="click">
                        <div class="tool">
                            <a href="javascript:void(0)" @click="facebookShare" title="facebook">
                                <i class="icon icon-f"></i>
                            </a>

                            <a href="javascript:void(0)" title="weibo" @click="weiboShare" >
                                <i class="icon icon-xl"></i>
                            </a>
                            <a href="javascript:void(0)" title="twitter" @click="twitterShare">
                                <i class="icon icon-fg"></i>
                            </a>
                            <i class="icon icon-wx"  @click="shareWeChat"  title="wechat"></i>
                        </div>
                        <div class="col" title="share" slot="reference">
                            <i class="icon icon-share"></i>
                            <span>{{numObj.forwardCount}}</span>
                        </div>
                    </el-popover>
                    <!--<div class="col" title="share" @click="addListNum(3)">-->
                        <!--<i class="icon icon-share"></i>-->
                        <!--<span>{{numObj.forwardCount}}</span>-->
                    <!--</div>-->
                </div>
                <div class="btn-box">
                    <span>Data Provided By <img :src="isIEE?ieeLogo:springLogo" :class="{ieee:isIEE}" alt=""></span>
                    <!--loginMsg &&-->
                    <a v-if="details.openaccess === 'true'"
                       class="login"
                       @click="downLoadPdfByUrl"
                       download="pdf"
                       :href="loginMsg?downLoadUrl:`javascript:void(0)`">
                        DOWNLOAD
                    </a>
                    <a v-else href="javascript:void(0)">DOWNLOAD</a>
                </div>
            </div>
            <aside class="my-aside" v-loading="loading">
                <div class="col">
                    <h3>Published Date:</h3>
                    <div>
                        <!--查看更多+前4个 -->
                        <p v-for="(item, index) in year" :key="index" v-if="(!yearFlag && index < 5) || yearFlag"
                           :class="{active: item.isActive == true}"
                           @click="yearClickEvent(item.value)">~{{item.value}}</p>
                    </div>
                    <span @click="yearFlag = true" v-show="!yearFlag">See More</span>
                    <span @click="yearFlag = false" v-show="yearFlag">Hide More</span>
                </div>
                <div class="col">
                    <h3>Subjects:</h3>
                    <div>
                        <!--查看更多+前5个 -->
                        <p v-for="(item, index) in subjects" :key="index"
                           v-if="(!subjectsFlag && index < 5) || subjectsFlag"
                           :class="{active: item.isActive == true}"
                           @click="subjectClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <span @click="subjectsFlag = true" v-show="!subjectsFlag">See More</span>
                    <span @click="subjectsFlag = false" v-show="subjectsFlag">Hide More</span>
                </div>
                <div class="col">
                    <h3>Publisher:</h3>
                    <div>
                        <p v-for="(item, index) in publisher" :key="index"
                           v-if="(!publisherFlag && index < 5) || publisherFlag"
                           :class="{active: item.isActive == true}"
                           @click="publishClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <span @click="publisherFlag = true" v-show="!publisherFlag">See More</span>
                    <span @click="publisherFlag = false" v-show="publisherFlag">Hide More</span>
                </div>
            </aside>
        </div>
        <citation
                v-if="citationShow"
                :show="citationShow"
                :params="stringObj"
                @listenFun="getCitationMsg">
        </citation>
        <we-chat ref="wechat1" :idName="'wechat1'"></we-chat>
    </div>
</template>

<script>
    import {http} from '../../api/http.js'
    import search from '../../components/search.vue'
    import weChat from '../../components/wechat'
    import {mapState} from 'vuex'
    import citation from '../../components/citation.vue'

    export default {
        name: 'searchDetails',
        computed: {
            ...mapState({
                loginMsg: 'loginMsg'
            }),
        },
        data() {
            return {
                ieeLogo:require('../../assets/images/ieee.jpg'),
                springLogo:require('../../assets/images/logo-springernature.svg'),
                citationShow:false,
                stringObj:{},
                loading:true,
                contentLoading:true,
                checkAll: false,
                details: {},
                numObj: {},
                year: [],
                subjects: [],
                publisher: [],
                yearFlag: false,
                subjectsFlag: false,
                publisherFlag: false,
                url:'http://api.springernature.com/metadata/json?api_key=eded390c0074daf47de31d49ab06d924',
                springUrl:'',
                ieeeUrl:'',
                downLoadUrl:'',
                type:'',
                key:'',
            }
        },
        components: {search , citation ,weChat},
        created() {
            this.type = this.$route.params.type ;
            this.key = this.$route.params.key ;
            this.doi = this.$route.params.doi ;
            if(this.doi.indexOf('_')>-1){//如果doi有_，则是从分享进入
                this.doi = this.doi.replace(/_/,'/')
            }
            this.isIEE = this.$route.params.publish==='ieee';
            //
            this.url = `${this.url}&p=1&q=(keyword:"${this.key}" AND type:"${this.type}")`;
            this.searchEvent();//获取侧边栏
            this.getAPIKEY();//获取心的key
        },
        methods: {
            twitterShare(){
                let doi = this.doi.replace(/\//,'_');
                let pageUrl =`http://${window.location.host}/searchDetails/${this.type}/${this.key}/${this.$route.params.publish}/${doi}`;
                let url = `http://twitter.com/share?text=${this.details.title}&url=${pageUrl}`;
                //加分享+1
                this.addListNum(3);
                window.open(url)
            },
            facebookShare(){//facebook
                let doi = this.doi.replace(/\//,'_');
                let pageUrl =`http://${window.location.host}/searchDetails/${this.type}/${this.key}/${this.$route.params.publish}/${doi}`;
                let url = `https://www.facebook.com/sharer.php?u=${pageUrl}`;
                //加分享+1
                this.addListNum(3);
                window.open(url)
            },
            weiboShare(){//微博
                let doi = this.doi.replace(/\//,'_');
                let pageUrl =`http://${window.location.host}/searchDetails/${this.type}/${this.key}/${this.$route.params.publish}/${doi}`;
                let url =`http://service.weibo.com/share/share.php?url=${pageUrl}&title=${this.details.title}`;
                //加分享+1
                this.addListNum(3);
                window.open(url)
            },
            shareWeChat(){//微信
                let doi = this.doi.replace(/\//,'_');
                let url =`http://${window.location.host}/searchDetails/${this.type}/${this.key}/${this.$route.params.publish}/${doi}`;
                //加分享+1
                this.addListNum(3);
                this.$refs.wechat1.shareWeChat(url,false)
            },
            getAPIKEY() {//获取新的APIKEY
                let data = '';
                http.getAPIKEY(data, res => {
                    if (res.code === 'SUCCESS') {
                        res.data.forEach(item => {
                            if (item.publisher === 'springernature') {
                                this.springUrl = `http://api.springernature.com/meta/v2/json?q=doi:${this.doi}&api_key=${item.apiKey}`
                            } else if (item.publisher === 'ieee') {
                                this.ieeeUrl = `http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${item.apiKey}&format=json&max_records=25&start_record=1&sort_order=asc&sort_field=article_number&doi=${this.doi}`
                            }
                        });
                        this.getSingle();
                    }
                });
            },
            getSingle(){
                if(this.isIEE){
                    $.ajax({
                        type: "get",
                        url: `${this.ieeeUrl}`,
                        data: "",
                        success: ress => {
                            let item =ress.articles[0]
                            this.details.title = item.title;
                            this.details.creators = item.authors.authors;
                            this.details.publisher = item.publisher;
                            this.details.publicationName = item.publication_title;
                            this.details.volume = item.volume;
                            this.details.startingPage = item.start_page;
                            this.details.endingPage = item.end_page;
                            this.details.publicationDate = item.publication_date;
                            this.details.publicationYear = item.publication_year;
                            this.details.doi = item.doi;
                            this.details.issn = item.issn;
                            this.details.abstract = item.abstract;
                            this.details.urls = item.abstract_url;
                            this.details.number = item.rank;
                            this.details.conferenceLocation = item.conference_location;
                            this.details.IEEEpdfLink = item.pdf_url;
                            this.details.openaccess = item.access_type === 'LOCKED' ? 'false' : 'true';
                            this.showPage()
                        },
                        error: (xhr) => {
                            this.getAPIKEY();
                        }
                    });
                }else {
                    $.ajax({
                        type: "get",
                        url: `${this.springUrl}`,
                        data: "",
                        success: res => {
                            this.details = JSON.parse(res).records[0];
                            this.details .creators.forEach((item1, index) => {//姓名去逗号
                                this.details .creators[index].creator = item1.creator.indexOf(',') ? item1.creator.replace(/,/, '') : item1.creator
                            });
                            this.showPage()
                        }
                    });
                }

            },
            showPage(){
                this.contentLoading = false;
                this.getListNum();
                this.getObjMsg();
                this.downLoadUrl= this.isIEE ?  this.details.IEEEpdfLink :  `https://link.springer.com/content/pdf/${this.details.doi}.pdf`;
                document.title = this.details.title
            },
            jumpPage() {
                if (this.details.url && this.details.url[0].value) {
                    window.open(this.details.url[0].value);
                } else {
                    window.open(this.details.urls);
                }
            },
            getListNum() {
                let data = {
                    doiList: [this.details.doi],
                    singnal: ""
                }
                http.getListNum(data, res => {
                    if (res.code === 'SUCCESS') {
                        this.numObj = res.data[0];
                    }
                });
            },
            downLoadPdfByUrl() {
                if(!this.loginMsg){
                    this.$message.info('Please Login !');
                    return
                }
                let data = {
                    url: this.details.doi,
                    userEmail: JSON.parse(this.loginMsg).loginmail
                };
                http.downLoadPdfByUrl(data, res => {
                    if (res.code == 'SUCCESS') {
                    }
                });
            },
            searchEvent() {
                $.ajax({
                    type: "get",
                    url:  `${this.url}`,
                    data: "",
                    success: res => {
                        this.loading = false;
                        let facets = JSON.parse(res).facets;
                        this.year = facets[3].values;
                        this.year.map(item => {
                            item.isActive = false;
                        });
                        this.subjects = facets[0].values;
                        this.subjects.map(item => {
                            item.isActive = false;
                        });
                        this.publisher = facets[2].values;
                        this.publisher.map(item => {
                            item.isActive = false;
                        });
                    }
                });
            },
            quoteShow(){
                this.citationShow = true;
                $('body').css('overflow','hidden')
                this.addListNum(2)
            },
            addListNum(index) {
                let data = {
                    forwardCount: 0,
                    lookCount: 0,
                    peperDoi: this.details.doi,
                    quoteCount: 0
                }
                if (index === 2) {
                    data.quoteCount = 1;
                } else if (index === 3) {
                    data.forwardCount = 1;
                }
                http.addListNum(data, res => {
                    if (res.code === 'SUCCESS') {
                        this.getListNum();
                    }
                });
            },
            getObjMsg(){
                let authors = '';   //作者
                this.details.creators.forEach((o, index) => {
                    authors += o.creator || o.full_name;
                    index !== this.details.creators.length - 1 && (authors += ', ')
                });
                authors = authors.slice(0, -1) + '. ';
                let title = this.details.title;  //论文名称
                let publicationName = this.details.publicationName ? this.details.publicationName : this.details.publication_title; //期刊名称
                let year = this.details.publicationYear ? this.details.publicationYear : this.details.publicationDate;  //出版年份
                year = `${year}`.slice(0,4);
                let volume = this.details.volume ? this.details.volume : '';  //卷数
                let startPage = this.details.startingPage;  //开始页码
                let endPage = this.details.endingPage;  //结束页码
                if(this.type === 'Journal'){
                    this.stringObj= {
                        string1:`${authors}${title}[J]. ${publicationName}, ${year}, (${volume}): ${startPage}-${endPage}`,
                        string2:`${authors}"${title}." <i style="font-style: italic;">${publicationName}</i>, ${volume}, (${year}): ${startPage}-${endPage}`,
                        string3:`${authors}(${year}). ${title}. <i style="font-style: italic;">${publicationName}</i>, ${volume}, ${startPage}-${endPage}`
                    }
                }else if(this.type === 'conference'){
                    this.stringObj= {
                        string1:`${authors}${title}[C]. ${publicationName}. ${this.details.publisher}, ${this.details.conferenceLocation}, ${year} : ${startPage}-${endPage}`,
                        string2:`${authors}"${title}." <i style="font-style: italic;">${publicationName}</i>. ${this.details.publisher}, ${this.details.conferenceLocation}, (${year}): ${startPage}-${endPage}`,
                        string3:`${authors}(${year}). ${title}. <i style="font-style: italic;">${publicationName}</i>. ${this.details.publisher}, ${this.details.conferenceLocation}, ${startPage}-${endPage}`
                    }
                }
            },
            getCitationMsg(data) {
                this.citationShow = data;
            },
            yearClickEvent(value){
               let detailquery = `year:"${value}"`;
                this.$router.push({path: '/searchList', query: {type: this.type, key: this.key, detailquery:detailquery}});
            },
            subjectClickEvent(value){
                let detailquery = `subject:"${value}"`
                this.$router.push({path: '/searchList', query: {type: this.type, key: this.key,detailquery:detailquery}});
            },
            publishClickEvent(value){
                let detailquery = `pub:"${value}"`
                this.$router.push({path: '/searchList', query: {type: this.type, key: this.key,detailquery:detailquery}});
            },
        },
        beforeDestroy() {
            document.title = 'Tassel Scholar'
        }
    }
</script>

<style scoped lang="scss">
    .tool{
        .icon {
            float: left;
            width: 36px;
            height: 36px;
            margin: 0 0 0 7px;
            cursor: pointer;

            &.icon-f {
                background: url(../../assets/images/facebook.png) no-repeat center center;
                background-size: 100% 100%;

                &:hover {
                    background: url(../../assets/images/facebook-active.png) no-repeat center center;
                }
            }

            &.icon-xl {
                background: url(../../assets/images/microblog.png) no-repeat center center;
                background-size: 100% 100%;

                &:hover {
                    background: url(../../assets/images/microblog-active.png) no-repeat center center;
                }
            }

            &.icon-fg {
                background: url(../../assets/images/twitter.png) no-repeat center center;
                background-size: 100% 100%;

                &:hover {
                    background: url(../../assets/images/twitter-active.png) no-repeat center center;
                }
            }

            &.icon-wx {
                background: url(../../assets/images/wechat.png) no-repeat center center;
                background-size: 100% 100%;

                &:hover {
                    background: url(../../assets/images/wechat-active.png) no-repeat center center;
                }
            }
        }
    }
    .list {
        display: flex;
        justify-content: flex-start;
        max-width: 1440px;
        margin: 0 auto 25px;
        .list-cont {
            width: calc(100% - 368px);
            padding: 35px 0 0 0;
            background: linear-gradient(to bottom, #fff, #f5fcf9);
            .title {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 25px;
                padding: 0 100px 0 70px;
                .icon-note {
                    width: 31px;
                    height: 34px;
                    background: url(../../assets/images/file.png) no-repeat center center;
                    background-size: 100%;
                    margin-right: 10px;
                }
                span {
                    display: inline-block;
                    font-size: 22px;
                    color: #29697E;
                    cursor: pointer;
                }
            }
            .list-cont-title {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin: 35px 0 0 0;
                padding: 0 100px 0 70px;
                .icon-zero {
                    width: 14px;
                    height: 14px;
                    background: #418095;
                    border-radius: 100%;
                    margin-right: 10px;
                }
                span {
                    font-size: 22px;
                    color: #418095;
                }
            }
            p {
                color: #485764;
                font-size: 18px;
                margin: 0 0 20px 0;
                padding: 0 100px 0 70px;
                em {
                    display: inline-block;
                    height: 25px;
                    line-height: 25px;
                    padding: 0 10px;
                    border-radius: 13px;
                    background: #ddf6ec;
                    color: #009A7D;
                    /*cursor: pointer;*/
                }
                span {
                    color: #3356E3;
                }
                &.tips {
                    line-height: 48px;
                }
                &.center{
                    text-align: center;
                }
            }
            .tools {
                display: flex;
                justify-content: flex-start;
                margin: 15px 0 0 0;
                padding: 0 100px 0 70px;
                .col {
                    display: flex;
                    justify-content: flex-start;
                    margin: 0 40px 0 0;
                    cursor: pointer;
                    span {
                        color: #2950EB;
                        font-size: 18px;
                    }
                    .icon {
                        width: 22px;
                        height: 23px;
                        margin-right: 10px;
                        &.icon-eyes {
                            width: 31px;
                            height: 21px;
                            background: url(../../assets/images/browse.png) no-repeat center center;
                            break-before: 100% 100%;
                        }
                        &.icon-quote {
                            background: url(../../assets/images/quote.png) no-repeat center center;
                            break-before: 100% 100%;
                        }
                        &.icon-share {
                            background: url(../../assets/images/share.png) no-repeat center center;
                            break-before: 100% 100%;
                        }
                    }
                }
            }
            .btn-box {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 108px;
                border-top: 1px solid #D5E0E2;
                margin: 30px 0 0 0;
                font-size: 20px;
                span{
                    display: flex;
                    align-items: center;
                    img{
                        width: 215px;
                        margin-left: 10px;
                    }
                    img.ieee{
                        width: 110px;
                    }
                }

                a {
                    display: inline-block;
                    width: 165px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 22px;
                    color: #fff;
                    background-color: gray;
                    cursor: not-allowed;
                }
                .login{
                    cursor: pointer;
                    background: linear-gradient(to right, #5DC1E2, #427387);
                }
            }
        }

    }
</style>


