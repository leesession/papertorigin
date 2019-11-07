<template>
    <div class="searchList">
        <search title="Search Results" index="0" :type="type" :keys="key"></search>
        <div class="list">
            <div class="list-cont">
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
                <p class="tips">{{details.abstract?details.abstract.indexOf('Abstract') === -1?details.abstract :
                    details.abstract.replace(/Abstract/,''):''}}</p>
                <div class="list-cont-title" v-if="details.keyword">
                    <i class="icon icon-zero"></i>
                    <span>Keyword</span>
                </div>
                <p class="tips" v-if="details.keyword">{{details.keyword}}</p>
                <div class="tools">
                    <div class="col">
                        <i class="icon icon-eyes"></i>
                        <span>{{numObj.lookCount}}</span>
                    </div>
                    <div class="col" @click="quoteShow">
                        <i class="icon icon-quote"></i>
                        <span>{{numObj.quoteCount}}</span>
                    </div>
                    <div class="col" @click="addListNum(3)">
                        <i class="icon icon-share"></i>
                        <span>{{numObj.forwardCount}}</span>
                    </div>
                </div>
                <div class="btn-box">
                    <span>Data Provided By <img :src="details.isIEE?ieeLogo:springLogo" :class="{ieee:details.isIEE}" alt=""></span>
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
    </div>
</template>

<script>
    import {http} from '../../api/http.js'
    import search from '../../components/search.vue'
    import {mapState} from 'vuex'
    import citation from '../../components/citation.vue'

    export default {
        name: 'searchList',
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
                downLoadUrl:'',
                type:'',
                key:'',
            }
        },
        components: {search , citation},
        created() {
            this.type = this.$route.query.type ? this.$route.query.type : '';
            this.key = this.$route.query.key ? this.$route.query.key : '';
            this.url = `${this.url}&p=1&q=(keyword:"${this.key}" AND type:"${this.type}")`;
            this.details = sessionStorage.getItem('INFO') ? JSON.parse(sessionStorage.getItem('INFO')) : '';
            this.downLoadUrl= this.details.isIEE ?  this.details.IEEEpdfLink :  `https://link.springer.com/content/pdf/${this.details.doi}.pdf`;
            this.getListNum();
            this.searchEvent();
            this.getObjMsg();
        },
        methods: {
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
            // notLogin() {
            //     if(this.details.openaccess === 'true')
            //         this.$message.info('Please Login !')
            // },
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
        }
    }
</script>

<style scoped lang="scss">
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


