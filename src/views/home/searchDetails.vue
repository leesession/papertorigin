<template>
    <div class="searchList">
        <search title="Search Results" index="0"></search>
        <div class="list">
            <div class="list-cont">
                <div class="title">
                    <i class="icon icon-note"></i>
                    <span>{{details.title}}</span>
                </div>
                <p><i v-for="(o, i) in details.creators" :key="i">{{o.creator || o.full_name}}<span
                        v-if="details.creators.length-1 > i">, </span></i></p>
                <p><em>{{details.publisher}}</em></p>
                <p><em @click="jumpPage">{{details.publicationName}}</em></p>
                <p>Volume {{details.volume}} | Page {{details.startingPage}}-{{details.endingPage}} |
                    {{details.publicationDate}}</p>
                <p style="cursor: pointer;" @click="jumpPage">DOI：<span>{{details.doi}}</span></p>
                <p>ISSN：{{details.issn}}</p>
                <p>ISBN：{{details.isbn}}</p>
                <div class="list-cont-title">
                    <i class="icon icon-zero"></i>
                    <span>Abstract</span>
                </div>
                <p class="tips">{{details.abstract.indexOf('Abstract') === -1?details.abstract :
                    details.abstract.replace(/Abstract/,'')}}</p>
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
                    <span>Data Provided By {{details.publisher}}</span>
                    <a v-if="loginMsg"
                       @click="downLoadPdfByUrl"
                       href="javascript:void(0)">
                        DOWNLOAD
                    </a>
                    <!--href=" http://api.springernature.com/metadata/json?q=(doi:10.1007/s10853-019-03707-1)&api_key=eded390c0074daf47de31d49ab06d924"-->
                    <a v-else href="javascript:void(0)" @click="notLogin">DOWNLOAD</a>
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
                    <span @click="yearMore" v-show="!yearFlag">See More</span>
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
                    <span @click="subjectsMore" v-show="!subjectsFlag">See More</span>
                </div>
                <div class="col">
                    <h3>Publisher:</h3>
                    <div>
                        <p v-for="(item, index) in publisher" :key="index"
                           v-if="(!publisherFlag && index < 5) || publisherFlag"
                           :class="{active: item.isActive == true}"
                           @click="publishClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <span @click="publisherMore" v-show="!publisherFlag">See More</span>
                </div>
            </aside>
        </div>

    </div>
</template>

<script>
    import {http} from '../../api/http.js'
    import search from '../../components/search.vue'
    import {mapState} from 'vuex'

    export default {
        name: 'searchList',
        computed: {
            ...mapState({
                loginMsg: 'loginMsg'
            }),
        },
        data() {
            return {
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
                url:'http://api.springernature.com/metadata/json?api_key=eded390c0074daf47de31d49ab06d924'
            }
        },
        components: {search},
        created() {
            this.details = sessionStorage.getItem('INFO') ? JSON.parse(sessionStorage.getItem('INFO')) : '';
            this.getListNum();
            this.searchEvent();
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
            addListNum(index) {
                let data = {
                    forwardCount: 0,
                    lookCount: 0,
                    peperDoi: this.details.doi,
                    quoteCount: 0
                }
                if (index == 1) {
                    data.lookCount = 1;
                } else if (index == 2) {
                    data.quoteCount = 1;
                } else if (index == 3) {
                    data.forwardCount = 1;
                }
                http.addListNum(data, res => {
                    if (res.code == 'SUCCESS') {
                        this.getListNum();
                    }
                });
            },
            downLoadPdfByUrl() {
                // let loginMsg = JSON.parse(this.loginMsg)
                let data = {
                    url: this.details.doi,
                    userEmail: JSON.parse(this.loginMsg).loginmail
                };
                http.downLoadPdfByUrl(data, res => {
                    if (res.code == 'SUCCESS') {
                    }
                });
            },
            notLogin() {
                this.$message.info('Please Login !')
            },
            searchEvent() {
                // let _url = `${this.url}&p=1`;
                $.ajax({
                    type: "get",
                    url:  `${this.url}&p=1`,
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
            yearClickEvent(value){
               let detailquery = `year:"${value}"`;
                this.$router.push({path: '/searchList', query: {type: 'journal', key: '',detailquery:detailquery}});
            },
            yearMore(){
                this.yearFlag = true;
            },
            subjectClickEvent(value){
                let detailquery = `subject:"${value}"`
                this.$router.push({path: '/searchList', query: {type: 'journal', key: '',detailquery:detailquery}});
            },
            subjectsMore(){
                this.subjectsFlag = true;
            },
            publishClickEvent(value){
                let detailquery = `pub:"${value}"`
                this.$router.push({path: '/searchList', query: {type: 'journal', key: '',detailquery:detailquery}});
            },
            publisherMore(){
                this.publisherFlag = true;
            },
        }
    }
</script>

<style scoped lang="scss">
    .list {
        display: flex;
        justify-content: flex-start;
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
                    /*height: 34px;*/
                    /*line-height: 34px;*/
                    /*overflow: hidden;*/
                    /*text-overflow: ellipsis;*/
                    /*white-space: nowrap;*/
                    font-size: 22px;
                    color: #29697E;
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
                    cursor: pointer;
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
                a {
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


