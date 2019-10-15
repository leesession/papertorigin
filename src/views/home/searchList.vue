<template>
    <div class="searchList">
        <search title="Home" index="0" ref="searchBox" @listenFun="getChildParams"></search>
        <div class="list">
            <div class="list-cont">
                <div class="title">
                    <span>Results:{{startNum}}-{{endNum}}/{{total}}</span>
                </div>
                <div class="cont">
                    <el-checkbox v-model="checkAll" class="check-all" @change="allChangeEvent(checkAll)">select all
                    </el-checkbox>
                    <ul>
                        <li v-for="(item, index) in list" :key="index">
                            <div class="cont-title">
                                <el-checkbox v-model="item.isChecked" class="check-col fl"
                                             @change="colChangeEvent(item)"></el-checkbox>
                                <h4 class="fl" @click="goDetails(item)">{{item.title}}</h4>
                            </div>
                            <p><i v-for="(o, i) in item.creators" :key="i">{{o.creator || o.full_name}}</i></p>
                            <p>
                                <em>{{item.publisher}}</em> | <em @click="jumpPage(item)">{{item.publicationName}}</em>
                                | Volume {{item.volume}} | Page {{item.startingPage}}-{{item.endingPage}} |
                                {{item.publicationDate}}
                            </p>
                            <p @click="jumpPage(item)" style="cursor: pointer;">DOI：<span>{{item.doi}}</span></p>
                            <p>ISSN：{{item.issn}}</p>
                            <!-- <div class="tools">
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
                            </div> -->
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
                        <p v-for="(item, index) in year" :key="index" v-if="index < 4"
                           :class="{active: item.isActive == true}"
                           @click="yearClickEvent(item.value)">~{{item.value}}</p>
                    </div>
                    <div v-if="yearFlag">
                        <p v-for="(item, index) in year" :key="index"
                           :class="{active: item.isActive == true}"
                           @click="yearClickEvent(item.value)">~{{item.value}}</p>
                    </div>
                    <span @click="yearMore" v-show="!yearFlag">See More</span>
                </div>
                <div class="col">
                    <h3>Subjects:</h3>
                    <div v-if="!subjectsFlag">
                        <p v-for="(item, index) in subjects" :key="index" v-if="index < 5"
                           :class="{active: item.isActive == true}"
                           @click="subjectClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <div v-if="subjectsFlag">
                        <p v-for="(item, index) in subjects" :key="index"
                           :class="{active: item.isActive == true}"
                           @click="subjectClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <span @click="subjectsMore" v-show="!subjectsFlag">More</span>
                </div>
                <div class="col">
                    <h3>Publisher:</h3>
                    <div v-if="!publisherFlag">
                        <p v-for="(item, index) in publisher" :key="index" v-if="index < 5"
                           :class="{active: item.isActive == true}"
                           @click="publishClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <div v-if="publisherFlag">
                        <p v-for="(item, index) in publisher" :key="index"
                           :class="{active: item.isActive == true}"
                           @click="publishClickEvent(item.value)">{{item.value}}</p>
                    </div>
                    <span @click="publisherMore" v-show="!publisherFlag">More</span>
                </div>
            </aside>
        </div>

        <citation v-if="citationShow" :show="citationShow" :params="stringObj" @listenFun="getCitationMsg"></citation>
        <citation-all v-if="citationAllShow" :show="citationAllShow" :params="stringAllObj"
                      @listenFun="getCitationAllMsg"></citation-all>
    </div>
</template>

<script>
    import search from '../../components/search.vue'
    import citation from '../../components/citation.vue'
    import citationAll from '../../components/citationAll.vue'
    import {constants} from 'crypto';

    export default {
        name: 'searchList',
        data() {
            return {
                checkAll: false,
                citationShow: false,
                citationAllShow: false,
                pagination: {},
                total: 0,
                start: 1,
                startNum: 1,
                endNum: 10,
                type: '',
                types: '',
                key: '',
                url: 'http://api.springernature.com/metadata/json?api_key=eded390c0074daf47de31d49ab06d924&p=5',
                urls: 'http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=7d2xu2qsmryfuuhnfvc3jzdx&format=json&max_records=5&sort_order=asc&sort_field=article_number',
                list: [],
                year: [],
                subjects: [],
                publisher: [],
                yearFlag: false,
                subjectsFlag: false,
                publisherFlag: false,
                yearFactor: '',
                subjectFactor: '',
                publishFactor: '',
                stringObj: '',
                stringAllObj: []
            }
        },
        components: {search, citation, citationAll},
        created() {
            this.type = this.$route.query.type ? this.$route.query.type : '';
            this.key = this.$route.query.key ? this.$route.query.key : '';
            if (this.type == 'journal') {
                this.types = 'Journals';
            } else if (this.type == 'conference') {
                this.types = 'Conferences';
            }
            this.searchEvent();
        },
        mounted() {
            this.$refs.searchBox.key = this.key;
            this.$refs.searchBox.selectVal = this.type;
        },
        methods: {
            allChangeEvent(data) {
                if (data == true) {
                    this.citationAllShow = true;
                    let list = this.list;
                    list.forEach(item => {
                        item.isChecked = true;
                        this.list = list;
                    });
                    let arr1 = [], arr2 = [], arr3 = [];
                    this.list.forEach(item => {
                        let authors = '';   //作者
                        item.creators.forEach(o => {
                            if (o.creator) {
                                // authors += item.creator.replace(',', '') + ',';
                                authors += o.creator + ',';
                            } else {
                                authors += o.full_name + ',';
                            }
                        });
                        authors = authors.slice(0, -1) + '.';
                        let title = item.title;  //论文名称
                        let publicationName = item.publicationName ? item.publicationName : item.publication_title; //期刊名称
                        let year = item.publicationDate;  //出版年份
                        let volume = item.volume ? item.volume : '';  //卷数
                        let startPage = item.startingPage;  //开始页码
                        let endPage = item.endingPage;  //结束页码
                        let stringObj = {};
                        stringObj.string1 = authors + title + '[J].' + publicationName + ',' + year + ',' + '(' + volume + '):' + startPage + '-' + endPage;
                        stringObj.string2 = authors + '"' + title + '."' + publicationName + ',' + volume + '(' + year + '):' + startPage + '-' + endPage;
                        stringObj.string3 = authors + '(' + year + ').' + title + '.' + publicationName + ',' + volume + ',' + startPage + '-' + endPage;
                        arr1.push(stringObj.string1);
                        arr2.push(stringObj.string2);
                        arr3.push(stringObj.string3);
                        this.stringAllObj = [arr1, arr2, arr3];
                    });
                    console.log(this.stringAllObj);
                }
            },
            colChangeEvent(obj) {
                this.citationShow = true;
                let list = this.list;
                list.forEach(item => {
                    item.isChecked = false;
                    if (item.doi == obj.doi) {
                        item.isChecked = true;
                        this.list = list;
                    }
                });
                let authors = '';   //作者
                obj.creators.forEach(item => {
                    if (item.creator) {
                        // authors += item.creator.replace(',', '') + ',';
                        authors += item.creator + ',';
                    } else {
                        authors += item.full_name + ',';
                    }
                });
                authors = authors.slice(0, -1) + '.';
                let title = obj.title;  //论文名称
                let publicationName = obj.publicationName ? obj.publicationName : obj.publication_title; //期刊名称
                let year = obj.publicationDate;  //出版年份
                let volume = obj.volume ? obj.volume : '';  //卷数
                let startPage = obj.startingPage;  //开始页码
                let endPage = obj.endingPage;  //结束页码
                let stringObj = {};
                stringObj.string1 = authors + title + '[J].' + publicationName + ',' + year + ',' + '(' + volume + '):' + startPage + '-' + endPage;
                stringObj.string2 = authors + '"' + title + '."' + publicationName + ',' + volume + '(' + year + '):' + startPage + '-' + endPage;
                stringObj.string3 = authors + '(' + year + ').' + title + '.' + publicationName + ',' + volume + ',' + startPage + '-' + endPage;
                this.stringObj = JSON.stringify(stringObj);
            },
            getChildParams(data) {
                this.type = data.type ? data.type : '';
                this.key = data.key ? data.key : '';
                if (this.type == 'journal') {
                    this.types = 'Journals';
                } else if (this.type == 'conference') {
                    this.types = 'Conferences';
                }
                this.searchEvent();
            },
            getCitationMsg(data) {
                this.citationShow = data;
                let list = this.list;
                list.forEach(item => {
                    item.isChecked = false;
                    this.list = list;
                });
            },
            getCitationAllMsg(data) {
                this.citationAllShow = data;
                this.checkAll = false;
                let list = this.list;
                list.forEach(item => {
                    item.isChecked = false;
                    this.list = list;
                });
            },
            jumpPage(obj) {
                if (obj.url && obj.url[0].value) {
                    window.open(obj.url[0].value);
                } else {
                    window.open(obj.urls);
                }
            },
            operateData(arr) {
                this.list.forEach(item => {
                    item.isChecked = false;
                });
                if (arr && arr.length > 0) {
                    arr.forEach(item => {
                        let obj = {};
                        obj.title = item.title;
                        obj.creators = item.authors.authors;
                        obj.publisher = item.publisher;
                        obj.publicationName = item.publication_title;
                        obj.volume = item.volume;
                        obj.startingPage = item.start_page;
                        obj.endingPage = item.end_page;
                        obj.publicationDate = item.publication_date;
                        obj.doi = item.doi;
                        obj.issn = item.issn;
                        obj.abstract = item.abstract;
                        obj.urls = item.abstract_url;
                        obj.isChecked = false;
                        this.list.push(obj);
                    });
                }
            },
            searchEvent() {
                let _url = this.url + '&q=' + this.type + ':' + this.key;
                $.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    success: res => {
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.start = Number(JSON.parse(res).result[0].start);
                        this.list = JSON.parse(res).records;
                        this.year = JSON.parse(res).facets[3].values;
                        this.year.map(item => {
                            item.isActive = false;
                        });
                        this.subjects = JSON.parse(res).facets[0].values;
                        this.subjects.map(item => {
                            item.isActive = false;
                        });
                        this.publisher = JSON.parse(res).facets[2].values;
                        this.publisher.map(item => {
                            item.isActive = false;
                        });
                        //二次请求
                        let _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                let list = this.operateData(ress.articles);
                            }
                        });
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
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + '&content_type=' + this.types + '&article_title=' + this.key + '&start_record=' + page;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                let list = this.operateData(ress.articles);
                            }
                        });
                    }
                });
            },
            goDetails(obj) {
                sessionStorage.setItem('INFO', JSON.stringify(obj));
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
                this.yearFactor = year;
                this.year.forEach(item => {
                    item.isActive = false;
                    if (item.value == year) {
                        item.isActive = true;
                    }
                });
                let _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ')';
                if (this.subjectFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'subject:' + this.subjectFactor + ')';
                }
                if (this.publishFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'pub:' + this.publishFactor + ')';
                }
                if (this.subjectFactor && this.publishFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'subject:' + this.subjectFactor +
                        ' AND ' + 'pub:' + this.publishFactor + ')';
                }
                $.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    success: res => {
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + year;
                        if (this.publishFactor) {
                            _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + year + '&publisher=' + this.publishFactor;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                let list = this.operateData(ress.articles);
                            }
                        });
                    }
                });
            },
            subjectClickEvent(subject) {
                this.subjectFactor = subject;
                this.subjects.forEach(item => {
                    item.isActive = false;
                    if (item.value == subject) {
                        item.isActive = true;
                    }
                });
                let _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'subject:' + this.subjectFactor + ')';
                if (this.yearFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'subject:' + this.subjectFactor + ')';
                }
                if (this.publishFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'pub:' + this.publishFactor + ' AND ' + 'subject:' + this.subjectFactor + ')';
                }
                if (this.yearFactor && this.publishFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'subject:' + this.subjectFactor +
                        ' AND ' + 'pub:' + this.publishFactor + ')';
                }
                $.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    success: res => {
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key;
                        if (this.yearFactor) {
                            _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor;
                        }
                        if (this.publishFactor) {
                            _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + this.publishFactor;
                        }
                        if (this.yearFactor && this.publishFactor) {
                            _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor + '&publisher=' + this.publishFactor;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                let list = this.operateData(ress.articles);
                            }
                        });
                    }
                });
            },
            publishClickEvent(publish) {
                this.publishFactor = publish;
                this.publisher.forEach(item => {
                    item.isActive = false;
                    if (item.value == publish) {
                        item.isActive = true;
                    }
                });
                let _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'pub:' + this.publishFactor + ')';
                if (this.yearFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'pub:' + this.publishFactor + ')';
                }
                if (this.subjectFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'pub:' + this.publishFactor + ' AND ' + 'subject:' + this.subjectFactor + ')';
                }
                if (this.yearFactor && this.subjectFactor) {
                    _url = this.url + '&q=(' + this.type + ':' + this.key + ' AND ' + 'year:' + this.yearFactor + ' AND ' + 'subject:' + this.subjectFactor +
                        ' AND ' + 'pub:' + this.publishFactor + ')';
                }
                $.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    success: res => {
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + publish;
                        if (this.yearFactor) {
                            _urls = this.urls + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + publish + '&publication_year=' + this.year;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                let list = this.operateData(ress.articles);
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .page-box {
        padding: 20px 0;
        text-align: center;
    }

    .list {
        display: flex;
        justify-content: flex-start;

        .list-cont {
            width: calc(100% - 368px);
        }

        .title {
            height: 70px;
            line-height: 70px;
            background: #F6F8F9;
            border-bottom: 1px solid #D9E5E7;
            padding: 0 55px;

            span {
                font-size: 28px;
                color: #515354;
            }
        }

        .cont {
            li {
                .cont-title {
                    height: 38px;
                    display: flex;
                    justify-content: flex-start;

                    h4 {
                        max-width: 1200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #29697E;
                        font-size: 22px;
                        cursor: pointer;
                    }
                }

                padding: 28px 50px 25px 40px;
                border-bottom: 1px solid #D9E5E7;

                &:first-child {
                    padding: 0px 50px 25px 40px;
                }

                p {
                    color: #485764;
                    font-size: 18px;
                    margin: 0 0 10px 35px;

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
                }

                .tools {
                    display: flex;
                    justify-content: flex-start;
                    margin: 15px 0 0 35px;

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
            }
        }
    }
</style>


