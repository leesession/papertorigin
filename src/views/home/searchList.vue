<template>
    <div class="searchList">
        <search title="Home" index="0" ref="searchBox" @listenFun="getChildParams" :type="type" :keys="key"></search>
        <div class="list" v-loading="loading">
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
                            <p><i v-for="(o, i) in item.creators" :key="i">{{o.creator || o.full_name}}<span
                                    v-if="item.creators.length-1 > i">, </span></i></p>
                            <p><em>{{item.publisher}}</em></p>
                            <p><em @click="jumpPage(item)">{{item.publicationName}}</em></p>
                            <p>Volume {{item.volume}} | Page {{item.startingPage}}-{{item.endingPage}} |
                                {{item.publicationDate}}</p>
                            <p @click="jumpPage(item)" style="cursor: pointer;">DOI：<span>{{item.doi}}</span></p>
                            <p>ISSN：{{item.issn}}</p>
                            <p>ISBN：{{item.isbn}}</p>
                            <div class="tools">
                                <div class="col">
                                    <i class="icon icon-eyes"></i>
                                    <span>{{recordData[index].lookCount}}</span>
                                </div>
                                <div class="col">
                                    <i class="icon icon-quote"></i>
                                    <span>{{recordData[index].quoteCount}}</span>
                                </div>
                                <div class="col">
                                    <i class="icon icon-share"></i>
                                    <span>{{recordData[index].forwardCount}}</span>
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
                    <span @click="subjectsMore" v-show="!subjectsFlag">More</span>
                </div>
                <div class="col">
                    <h3>Publisher:</h3>
                    <div>
                        <p v-for="(item, index) in publisher" :key="index"
                           v-if="(!publisherFlag && index < 5) || publisherFlag"
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
    import {http} from '../../api/http.js'

    export default {
        name: 'searchList',
        data() {
            return {
                loading: true,
                checkAll: false,
                citationShow: false,
                citationAllShow: false,
                pagination: {},
                pageSize: 5,
                total: 0,
                start: 1,
                startNum: 1,
                endNum: 10,
                type: '',
                types: '',
                key: '',
                url: `http://api.springernature.com/metadata/json?api_key=eded390c0074daf47de31d49ab06d924`,
                urls: `http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=7d2xu2qsmryfuuhnfvc3jzdx&format=json&sort_order=asc&sort_field=article_number`,
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
                stringAllObj: [],
                recordData: [{
                    lookCount: 0,
                    quoteCount: 0,
                    forwardCount: 0
                }],//浏览次数等
            }
        },
        components: {search, citation, citationAll},
        created() {
            this.type = this.$route.query.type ? this.$route.query.type : '';
            this.key = this.$route.query.key ? this.$route.query.key : '';
            if (this.type === 'journal') {
                this.types = 'Journals';
            } else if (this.type === 'conference') {
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
                    item.creators.forEach((item1, index) => {//姓名去逗号
                        item.creators[index].creator = item1.creator.replace(/,/, '')
                    })
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
                this.getRecord()
            },
            getRecord() {
                let doiList = [];
                this.list.forEach(item => {
                    doiList.push(item.doi)
                });
                let data = {
                    doiList: doiList,
                    singnal: ""
                };
                http.getListNum(data, res => {
                    if (res.code === 'SUCCESS') {
                        this.recordData = res.data;
                    }
                });
            },
            searchEvent() {
                let _url = `${this.url}&p=${this.pageSize}`;
                this.loading = true;
                $.ajax({
                    type: "get",
                    url: this.key ? `${_url}&q=${this.type}:${this.key}` : _url,
                    data: "",
                    success: res => {
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
                        let _urls = `${this.urls}&max_records=${this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}`;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
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
                let _url = `${this.url}&p=${this.pageSize}&s=${page}`;
                this.loading = true;
                $.ajax({
                    type: "get",
                    url: this.key ? `${_url}&q=${this.type}:${this.key}` : _url,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = `${this.urls}&max_records=${this.pageSize}&start_record=${page}&content_type=${this.types}&article_title=${this.key}`;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
                            }
                        });
                    }
                });
            },
            goDetails(obj) {
                let data = {
                    forwardCount: 0,
                    lookCount: 1,
                    peperDoi: obj.doi,
                    quoteCount: 0
                };
                http.addListNum(data, res => {
                    if (res.code == 'SUCCESS') {
                    }
                });
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
            getTrueUrl(_url, clicked, clickName, confirmOne, nameOne, confirmTwo, nameTwo) {
                if (confirmOne) {
                    if (confirmTwo) _url = `${_url}${clickName}:${clicked}AND${nameOne}:${confirmOne}AND${nameTwo}:${confirmTwo}`;
                    else _url = `${_url}${clickName}:${clicked}AND${nameOne}:${confirmOne}`;
                } else if (confirmTwo) _url = `${_url}${clickName}:${clicked}AND${nameTwo}:${confirmTwo}`;
                else _url = `${_url}${clickName}:${clicked}`;
                return _url
            },
            yearClickEvent(year) {//点击年
                this.yearFactor = year;
                this.year.forEach(item => {
                    item.isActive = false;
                    if (item.value == year) {
                        item.isActive = true;
                    }
                });
                let _url = `${this.url}&p=${this.pageSize}&q=(`;
                //做判断
                // if(this.subjectFactor){
                //     if(this.publishFactor) _url = `${_url}year:${this.yearFactor} AND subject:${this.subjectFactor} AND pub:${this.publishFactor}`;
                //     else _url = `${_url}year:${this.yearFactor} AND subject:${this.subjectFactor}`;
                // }else if(this.publishFactor) _url = `${_url}year:${this.yearFactor} AND pub:${this.publishFactor}`;
                // else _url = `${_url}year:${this.yearFactor}`;
                _url = this.getTrueUrl(_url, this.yearFactor, 'year', this.subjectFactor, 'subject', this.publishFactor, 'pub');
                this.loading = true;
                $.ajax({
                    type: "get",
                    url: this.key ? `${_url} AND ${this.type}:${this.key})` : `${_url})`,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + year;
                        if (this.publishFactor) {
                            _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + year + '&publisher=' + this.publishFactor;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
                            }
                        });
                    }
                });
            },
            subjectClickEvent(subject) {//点击学科
                this.subjectFactor = subject;
                let subjectFactor = subject.replace(/&/g, '%26');
                subjectFactor.indexOf(' and ') === -1 && (subjectFactor = subjectFactor.replace(/\s/g, ''));
                // this.subjectFactor = this.subjectFactor .replace(/\s/g,'');
                // this.subjectFactor = encodeURI(subject)
                this.subjects.forEach(item => {
                    item.isActive = false;
                    if (item.value == subject) {
                        item.isActive = true;
                    }
                });
                let _url = `${this.url}&p=${this.pageSize}&q=(`;
                _url = this.getTrueUrl(_url, subjectFactor, 'subject', this.yearFactor, 'year', this.publishFactor, 'pub');
                this.loading = true;
                $.ajax({
                    type: "get",
                    url: this.key ? `${_url} AND ${this.type}:${this.key})` : `${_url})`,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = '';
                        if (this.yearFactor) {
                            if (this.publishFactor) _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor + '&publisher=' + this.publishFactor;
                            else _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor;
                        } else if (this.publishFactor) {
                            _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + this.publishFactor;
                        } else _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.loading = false;
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
                let _url = `${this.url}&p=${this.pageSize}&q=(`;
                _url = this.getTrueUrl(_url, this.publishFactor, 'pub', this.subjectFactor, 'subject', this.yearFactor, 'year');
                $.ajax({
                    type: "get",
                    url: this.key ? `${_url} AND ${this.type}:${this.key})` : `${_url})`,
                    data: "",
                    success: res => {
                        // this.total = Number(JSON.parse(res).result[0].total);
                        this.list = JSON.parse(res).records;
                        //二次请求
                        let _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + publish;
                        if (this.yearFactor) {
                            _urls = this.urls + `&max_records=${this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + publish + '&publication_year=' + this.year;
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
                padding: 28px 50px 25px 40px;
                border-bottom: 1px solid #D9E5E7;
                cursor: pointer;
                &:hover {
                    background-color: #F8F8FC;
                }
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
                            &:hover {
                                border-bottom: 1px solid #2950EB;
                            }
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


