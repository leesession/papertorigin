<template>
    <div class="searchList">
        <search title="Search Results" index="0" ref="searchBox" @listenFun="getChildParams" :type="type"
                :keys="key"></search>

        <div class="list" v-loading="loading">
            <div class="list-cont">
                <div class="title">
                    <span>Results:{{startNum}}-{{endNum}}/{{total}}</span>
                </div>
                <div class="cont">
                    <div class="select">
                        <el-checkbox
                                v-model="checkAll"
                                @change="selectChange"
                                class="check-all">
                            select all
                        </el-checkbox>
                        <el-button size="small" @click="allChangeEvent">Cite Selected</el-button>
                    </div>

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
                                    <span>{{recordData[index] && recordData[index].lookCount}}</span>
                                </div>
                                <div class="col">
                                    <i class="icon icon-quote"></i>
                                    <span>{{recordData[index] && recordData[index].quoteCount}}</span>
                                </div>
                                <div class="col">
                                    <i class="icon icon-share"></i>
                                    <span>{{recordData[index] && recordData[index].forwardCount}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="page-box" v-if="total != 0">
                    <el-pagination
                            layout="prev, pager, next"
                            :total="total"
                            :page-size="pageSize*2"
                            :current-page.sync="currentPage"
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
        <citation-all
                v-if="citationAllShow"
                :show="citationAllShow"
                :params="stringAllObj"
                @listenFun="getCitationAllMsg"
        ></citation-all>
    </div>
</template>

<script>
    import search from '../../components/search.vue'
    import citationAll from '../../components/citationAll.vue'
    import {constants} from 'crypto';
    import {http} from '../../api/http.js'

    export default {
        name: 'searchList',
        data() {
            return {
                loading: true,
                checkAll: false,
                citationAllShow: false,
                pagination: {},
                pageSize: 10,
                total: 0,
                start: 1,
                startNum: 1,
                endNum: 0,
                type: '',
                types: '',
                key: '',
                url: ``,
                urls: ``,
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
                recordData: [],//浏览次数等
                ieeAPIKEY: '7d2xu2qsmryfuuhnfvc3jzdx',
                currentPage: 1,
                springTotal:0,
                ieeeTotal:0,
            }
        },
        components: {search, citationAll},
        created() {
            this.type = this.$route.query.type ? this.$route.query.type : '';
            this.key = this.$route.query.key ? this.$route.query.key : '';
            if (this.type === 'journal') {
                this.types = 'Journals';
            } else if (this.type === 'conference') {
                this.types = 'Conferences';
            }else if (this.type === 'thesis'){
                this.types = 'Theses';
            }
            this.getAPIKEY()
        },
        mounted() {
            this.$refs.searchBox.key = this.key;
            this.$refs.searchBox.selectVal = this.type;
            this.endNum = 2 * this.pageSize
        },
        methods: {
            getAPIKEY() {//获取新的APIKEY
                let data = '';
                http.getAPIKEY(data, res => {
                    if (res.code === 'SUCCESS') {
                        res.data.forEach(item => {
                            if (item.publisher === 'springernature') {
                                this.url = `http://api.springernature.com/metadata/json?api_key=${item.apiKey}`
                            } else if (item.publisher === 'ieee') {
                                this.urls = `http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=${item.apiKey}&format=json&sort_order=asc&sort_field=article_number`
                            }
                        });
                        this.searchEvent();
                    }
                });
            },
            allChangeEvent() {//点击 cite selected
                if (this.checkAll) {
                    this.citationAllShow = true;
                    if (!this.list.length) return;
                    this.checkCitation(this.list);
                    this.updateQuote(this.list)
                } else {
                    let index = 0, checkedList = [];
                    this.list.forEach(item => {
                        //用来判断 select数量
                        if (item.isChecked) {
                            index++;
                            checkedList.push(item)
                        }
                    });
                    if (index) {
                        this.citationAllShow = true;
                        if (!checkedList.length) return;
                        this.checkCitation(checkedList);
                        this.updateQuote(checkedList)
                    } else this.$message.info('Please Select !')
                }
            },
            updateQuote(arr) {//更新选中的论文
                let data = [];
                arr.forEach(item => {
                    data.push({
                        forwardCount: 0,
                        lookCount: 0,
                        peperDoi: item.doi,
                        quoteCount: 1
                    })
                });
                http.updateRecordForList(data, res => {
                    if (res.code == 'SUCCESS') {
                        this.getRecord()
                    }
                });
            },
            getChildParams(data) {
                this.type = data.type ? data.type : '';
                this.key = data.key ? data.key : '';
                if (this.type == 'journal') {
                    this.types = 'Journals';
                } else if (this.type == 'conference') {
                    this.types = 'Conferences';
                }
                this.yearFlag = false;
                this.subjectsFlag = false;
                this.publisherFlag = false;
                this.yearFactor = '';
                this.subjectFactor = '';
                this.publishFactor = '';
                this.currentPage = 1;
                this.list = [];
                this.searchEvent();
            },
            getCitationAllMsg(data) {
                this.citationAllShow = data;
            },
            jumpPage(obj) {
                if (obj.url && obj.url[0].value) {
                    window.open(obj.url[0].value);
                } else {
                    window.open(obj.urls);
                }
            },
            operateData(arr) {
                arr = arr?arr:[];
                //concatArr,最终 ieee用上的数组
                let concatArr = [];
                //有2个数据，list 与 arr (都取10条，),pageSize = 5
                //在这里拼接好2条数据（数组A + 数组B = List）
                if(this.list.length<this.pageSize){
                    if(arr.length<this.pageSize){
                        //两个数组拼接，是最后一页
                        concatArr = [...arr];
                    }else {//list，用arr中的来补上
                        concatArr = [...arr.slice(0,arr.length - this.list.length)];
                    }
                }else if(arr.length<this.pageSize){//arr不够，list
                    concatArr = [...arr];
                    this.list = [...this.list.slice(0,this.list.length - arr.length)];
                }else {
                    concatArr = [...arr.slice(0,this.pageSize)];
                    this.list = [...this.list.slice(0,this.pageSize)];
                }
                //更新list
                this.list.forEach(item => {
                    item.isChecked = false;
                    item.creators.forEach((item1, index) => {//姓名去逗号
                        item.creators[index].creator = item1.creator.replace(/,/, '')
                    })
                });
                //每次改变页面时，都将置为 全部选择 false
                this.checkAll = false;
                //结构化数组
                if (concatArr && concatArr.length > 0) {
                    concatArr.forEach(item => {
                        let obj = {};
                        obj.title = item.title;
                        obj.creators = item.authors.authors;
                        obj.publisher = item.publisher;
                        obj.publicationName = item.publication_title;
                        obj.volume = item.volume;
                        obj.startingPage = item.start_page;
                        obj.endingPage = item.end_page;
                        obj.publicationDate = item.publication_date;
                        obj.publicationYear = item.publication_year;
                        obj.doi = item.doi;
                        obj.issn = item.issn;
                        obj.abstract = item.abstract;
                        obj.urls = item.abstract_url;
                        obj.isChecked = false;
                        obj.number = item.rank;
                        obj.conferenceLocation = item.conference_location;
                        obj.isIEE = true;
                        obj.IEEEpdfLink = item.pdf_url;
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
                let detailquery = this.$route.query.detailquery, _url = '';
                if (detailquery) {
                    detailquery = escape(detailquery);//detailquery.replace(/&/g, '%26')
                    _url = `${this.url}&p=${2*this.pageSize}&q=(${detailquery}`;
                    // _url = this.key ? `${_url} AND ${this.type}:"${this.key}")` : `${_url})`
                    _url = `${_url} AND ${this.type}:"${this.key}")`
                } else {
                    _url = `${this.url}&p=${2*this.pageSize}`;
                    _url = `${_url}&q=${this.type}:${this.key}`
                    // _url = this.key ? `${_url}&q=${this.type}:${this.key}` : _url
                }
                this.loading = true;
                $.ajax({
                    type: "get",
                    url: _url,
                    data: "",
                    success: res => {
                        this.start = Number(JSON.parse(res).result[0].start);
                        this.list = JSON.parse(res).records;
                        this.year = JSON.parse(res).facets[3].values;
                        //
                        this.springTotal = Number(JSON.parse(res).result[0].total);
                        //判断detail页面返回值没有，并且赋值给对应的
                        this.year.map((item, index) => {
                            detailquery && detailquery.indexOf('year:"') > -1 && index === 0 ? (item.isActive = true) : item.isActive = false;
                        });
                        this.subjects = JSON.parse(res).facets[0].values;
                        this.subjects.map((item, index) => {
                            detailquery && detailquery.indexOf('subject:"') > -1 && index === 0 ? (item.isActive = true) : item.isActive = false;
                        });
                        this.publisher = JSON.parse(res).facets[2].values;
                        this.publisher.map((item, index) => {
                            detailquery && detailquery.indexOf('pub:"') > -1 && index === 0 ? item.isActive = true : item.isActive = false;
                        });
                        //二次请求
                        let _urls = `${this.urls}&max_records=${2*this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}`;
                        if (detailquery) {
                            let query = this.$route.query.detailquery;
                            if (detailquery.indexOf('year:"') > -1) {
                                let year = detailquery.slice(6, detailquery.length - 1);
                                this.yearFactor = year;
                                _urls = `${_urls}&publication_year=${year}`
                            } else if (detailquery.indexOf('pub:"') > -1) {
                                let pub = detailquery.slice(5, detailquery.length - 1);
                                this.publishFactor = query.slice(5, query.length - 1);
                                _urls = `${_urls}&publisher=${pub}`
                            } else {
                                this.subjectFactor = query.slice(9, query.length - 1);
                            }
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
                                this.ieeeTotal = ress.total_records
                            },
                            error: (xhr) => {
                                // this.getAPIKEY();
                            }
                        });
                    }
                });
            },
            handleCurrentChange(page) {
                let totalPage = Math.ceil(this.total / this.pageSize*2);
                this.startNum = 1 + (Number(page) - 1) * this.pageSize*2;
                this.endNum = this.pageSize*2 + (Number(page) - 1) * this.pageSize*2;
                if (Number(page) == totalPage) {
                    this.endNum = this.total;
                }
                //判断total的值
                let springStart = (page - 1) * this.pageSize + 1,ieeeStart = (page - 1) * this.pageSize + 1;
                if(this.springTotal < (page-1)*this.pageSize){
                    //需要的条数的开始 (5 * 10) - 18 -10 +1
                    ieeeStart = page*this.pageSize*2 - this.springTotal - this.pageSize*2 + 1;
                }else if(this.ieeeTotal < (page-1)*this.pageSize){
                    springStart = page*this.pageSize*2 - this.ieeeTotal - this.pageSize*2 + 1;
                }
                //searchUrl : spring nature请求的链接 , _urls : ieee 请求的链接
                let _url = '', url = `${this.url}&p=${this.pageSize*2}&s=${springStart}&q=(`, searchUrl = '';
                //分页时，看 year subject publish 选中没
                if (this.subjectFactor) {
                    let subjectFactor = escape(this.subjectFactor);//this.subjectFactor.replace(/&/g, '%26')
                    url = `${url}subject:"${subjectFactor}"`;
                    if (this.publishFactor) {
                        let publishFactor = escape(this.publishFactor);//this.publishFactor.replace(/&/g, '%26')
                        if (this.yearFactor) {
                            url = `${url} AND year:"${this.yearFactor}" AND pub:"${publishFactor}"`
                        } else url = `${url} AND pub:"${publishFactor}"`
                    } else if (this.yearFactor) {
                        url = `${url} AND year:"${this.yearFactor}"`
                    }
                } else if (this.publishFactor) {
                    let publishFactor = escape(this.publishFactor);//this.publishFactor.replace(/&/g, '%26')
                    if (this.yearFactor) {
                        url = `${url}year:"${this.yearFactor}" AND pub:"${publishFactor}"`;
                    } else {
                        url = `${url}pub:"${publishFactor}"`;
                    }
                } else if (this.yearFactor) {
                    url = `${url}year:"${this.yearFactor}"`;//
                } else _url = `${this.url}&p=${2*this.pageSize}&s=${(page - 1) * this.pageSize + 1}`;
                //添上尾部字符串
                // if (_url) searchUrl = this.key ? `${_url}&q=${this.type}:${this.key}` : _url;
                // else searchUrl = this.key ? `${url} AND ${this.type}:"${this.key}")` : `${url})`;
                if (_url) searchUrl =  `${_url}&q=${this.type}:${this.key}` ;
                else searchUrl = `${url} AND ${this.type}:"${this.key}")`;
                //请求spring nature
                this.loading = true;
                this.list =[];
                $.ajax({
                    type: "get",
                    url: searchUrl,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        //_urls,用于ieee
                        let _urls = `${this.urls}&max_records=${this.pageSize*2}&start_record=${ieeeStart}&content_type=${this.types}&article_title=${this.key}`
                        if (this.publishFactor) {
                            let publishFactor = escape(this.publishFactor);//this.publishFactor.replace(/&/g, '%26')
                            if (this.yearFactor) {
                                _urls = `${_urls}&publication_year=${this.yearFactor}&publisher=${publishFactor}`
                            } else {
                                _urls = `${_urls}&publisher=${publishFactor}`
                            }
                        } else if (this.yearFactor) {
                            _urls = `${_urls}&publication_year=${this.yearFactor}`
                        }
                        //请求ieee
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
                            },
                            error: (xhr) => {
                                this.getAPIKEY();
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
                this.loading = true;
                http.addListNum(data, res => {
                    if (res.code == 'SUCCESS') {
                        this.$router.push({path: '/searchDetails',query:{type:this.type}});
                    }
                });
                sessionStorage.setItem('INFO', JSON.stringify(obj));
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
                    if (confirmTwo) _url = `${_url}${clickName}:"${clicked}" AND ${nameOne}:"${confirmOne}" AND ${nameTwo}:"${confirmTwo}"`;
                    else _url = `${_url}${clickName}:"${clicked}" AND ${nameOne}:"${confirmOne}"`;
                } else if (confirmTwo) _url = `${_url}${clickName}:"${clicked}" AND ${nameTwo}:"${confirmTwo}"`;
                else _url = `${_url}${clickName}:"${clicked}"`;
                return _url
            },
            yearClickEvent(year) {
                this.yearFactor = year;
                this.year.forEach(item => {
                    item.isActive = false;
                    if (item.value == year) {
                        item.isActive = true;
                    }
                });
                let _url = `${this.url}&p=${2*this.pageSize}&q=(`;
                //做判断
                let subjectFactor = escape(this.subjectFactor);//this.subjectFactor.replace(/&/g, '%26')
                let publishFactor = escape(this.publishFactor);//this.publishFactor.replace(/&/g, '%26')
                _url = this.getTrueUrl(_url, this.yearFactor, 'year', subjectFactor, 'subject', publishFactor, 'pub');
                this.loading = true;
                this.list =[];
                $.ajax({
                    type: "get",
                    url:  `${_url} AND ${this.type}:"${this.key}")` ,
                    // url: this.key ? `${_url} AND ${this.type}:"${this.key}")` : `${_url})`,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        this.springTotal = Number(JSON.parse(res).result[0].total);
                        //更新右侧栏
                        this.year = JSON.parse(res).facets[3].values;
                        this.subjects = JSON.parse(res).facets[0].values;
                        this.publisher = JSON.parse(res).facets[2].values;
                        this.updateSlide(this.year, this.subjects, this.publisher);
                        //二次请求
                        let _urls = `${this.urls}&max_records=${2*this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}&publication_year=${year}`;
                        if (this.publishFactor) {
                            _urls = `${this.urls}&max_records=${2*this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}&publication_year=${year}&publisher=${publishFactor}`;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.loading = false;
                                this.ieeeTotal = ress.total_records
                                //重置当前页
                                this.currentPage = 1;
                            },
                            error: (xhr) => {
                                this.getAPIKEY();
                            }
                        });
                    }
                });
            },
            subjectClickEvent(subject) {//点击学科
                this.subjectFactor = subject;
                let subjectFactor = escape(subject);//subject.replace(/&/g, '%26')
                let publishFactor = escape(this.publishFactor);//this.publishFactor.replace(/&/g, '%26')
                this.subjects.forEach(item => {
                    item.isActive = false;
                    if (item.value == subject) {
                        item.isActive = true;
                    }
                });
                let _url = `${this.url}&p=${2*this.pageSize}&q=(`;
                _url = this.getTrueUrl(_url, subjectFactor, 'subject', this.yearFactor, 'year', publishFactor, 'pub');
                this.loading = true;
                this.list =[];
                $.ajax({
                    type: "get",
                    url: `${_url} AND ${this.type}:"${this.key}")` ,
                    // url: this.key ? `${_url} AND ${this.type}:"${this.key}")` : `${_url})`,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        this.springTotal = Number(JSON.parse(res).result[0].total);
                        //更新右侧栏
                        this.year = JSON.parse(res).facets[3].values;
                        this.subjects = JSON.parse(res).facets[0].values;
                        this.publisher = JSON.parse(res).facets[2].values;
                        this.updateSlide(this.year, this.subjects, this.publisher);
                        //二次请求
                        let _urls = '';
                        if (this.yearFactor) {
                            if (this.publishFactor) _urls = this.urls + `&max_records=${2*this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor + '&publisher=' + publishFactor;
                            else _urls = this.urls + `&max_records=${2*this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publication_year=' + this.yearFactor;
                        } else if (this.publishFactor) {
                            _urls = this.urls + `&max_records=${2*this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key + '&publisher=' + publishFactor;
                        } else _urls = this.urls + `&max_records=${2*this.pageSize}` + '&start_record=1&content_type=' + this.types + '&article_title=' + this.key;
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.loading = false;
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                this.currentPage = 1;
                                this.ieeeTotal = ress.total_records
                            },
                            error: (xhr) => {
                                this.getAPIKEY();
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
                let _url = `${this.url}&p=${2*this.pageSize}&q=(`;
                let subjectFactor = escape(this.subjectFactor);//this.subjectFactor.replace(/&/g, '%26')
                // let publishFactor = publish.replace(/&/g, '%26');
                let publishFactor = escape(publish);
                _url = this.getTrueUrl(_url, publishFactor, 'pub', subjectFactor, 'subject', this.yearFactor, 'year');
                this.loading = true;
                this.list =[];
                $.ajax({
                    type: "get",
                    url: `${_url} AND ${this.type}:"${this.key}")` ,
                    // url: this.key ? `${_url} AND ${this.type}:"${this.key})"` : `${_url})`,
                    data: "",
                    success: res => {
                        this.list = JSON.parse(res).records;
                        this.springTotal = Number(JSON.parse(res).result[0].total);
                        //更新右侧栏
                        this.year = JSON.parse(res).facets[3].values;
                        this.subjects = JSON.parse(res).facets[0].values;
                        this.publisher = JSON.parse(res).facets[2].values;
                        this.updateSlide(this.year, this.subjects, this.publisher);
                        //二次请求
                        let _urls = `${this.urls}&max_records=${2*this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}&publisher=${publishFactor}`;
                        if (this.yearFactor) {
                            _urls = `${this.urls}&max_records=${2*this.pageSize}&start_record=1&content_type=${this.types}&article_title=${this.key}&publisher=${publishFactor}&publication_year=${this.yearFactor}`;
                        }
                        $.ajax({
                            type: "get",
                            url: _urls,
                            data: "",
                            success: ress => {
                                this.loading = false;
                                this.total = Number(JSON.parse(res).result[0].total) + ress.total_records;
                                this.operateData(ress.articles);
                                //重置当前页
                                this.currentPage = 1;
                                this.ieeeTotal = ress.total_records
                            },
                            error: (xhr) => {
                                this.getAPIKEY();
                            }
                        });
                    }
                });
            },
            updateSlide(clickTab, otherTab1, otherTab2) {//更新右边栏
                clickTab.map((item, index) => {
                    this.yearFactor == item.value ? item.isActive = true : item.isActive = false;
                });
                otherTab1.map((item, index) => {
                    this.subjectFactor == item.value ? item.isActive = true : item.isActive = false;
                });
                otherTab2.map((item, index) => {
                    this.publishFactor == item.value ? item.isActive = true : item.isActive = false;
                });
            },
            selectChange() {
                let list = JSON.parse(JSON.stringify(this.list));
                list.forEach(item => {
                    item.isChecked = this.checkAll;
                });
                this.list = list
            },
            colChangeEvent(obj) {
                let index = 0, list = JSON.parse(JSON.stringify(this.list));
                list.forEach(item => {
                    //设置当前点击的select
                    item.doi === obj.doi && (item.isChecked = obj.isChecked);
                    // //用来判断 selectAll
                    item.isChecked && index++;
                });
                list.length === index ? this.checkAll = true : this.checkAll = false;
                this.list = list;
            },
            checkCitation(arr) {
                $('body').css('overflow','hidden')
                let arr1 = [], arr2 = [], arr3 = [];
                arr.forEach(item => {
                    let authors = '';   //作者
                    item.creators.forEach((o, index) => {
                        authors += o.creator || o.full_name;
                        index !== item.creators.length - 1 && (authors += ', ')
                    });
                    authors = authors.slice(0, -1) + '. ';
                    let title = item.title;  //论文名称
                    let publicationName = item.publicationName ? item.publicationName : item.publication_title; //期刊名称
                    let year = item.publicationYear ? item.publicationYear : item.publicationDate;  //出版年份
                    let volume = item.volume ? item.volume : '';  //卷数
                    let startPage = item.startingPage;  //开始页码
                    let endPage = item.endingPage;  //结束页码
                    let stringObj = {};
                    if(this.type === 'journal'){
                        stringObj.string1 = `${authors}${title}[J]. ${publicationName}, ${year}, ${volume} (${item.number}): ${startPage}-${endPage}`;
                        stringObj.string2 = `${authors}"${title}." <i style="font-style: italic;">${publicationName}</i>, ${volume}. ${item.number}, (${year}): ${startPage}-${endPage}`;
                        stringObj.string3 = `${authors}(${year}). ${title}. <i style="font-style: italic;">${publicationName}</i>, ${volume} (${item.number}), ${startPage}-${endPage}`;
                    }else if(this.type === 'conference'){
                        stringObj.string1 = `${authors}${title}[C]. ${publicationName}. ${item.publisher}, ${item.conferenceLocation}, ${year} : ${startPage}-${endPage}`;
                        stringObj.string2 = `${authors}"${title}." <i style="font-style: italic;">${publicationName}</i>. ${item.publisher}, ${item.conferenceLocation}, (${year}): ${startPage}-${endPage}`;
                        stringObj.string3 = `${authors}(${year}). ${title}. <i style="font-style: italic;">${publicationName}</i>. ${item.publisher}, ${item.conferenceLocation}, ${startPage}-${endPage}`;
                    }
                    arr1.push(stringObj.string1);
                    arr2.push(stringObj.string2);
                    arr3.push(stringObj.string3);
                    this.stringAllObj = [arr1, arr2, arr3];
                });
            },
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
            > .select {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 50px;

                button {
                    height: 32px;
                    background-color: #54A7C4;
                    padding-top: 0;
                    padding-bottom: 0;
                    color: #fff;
                    font-size: 18px;
                }
            }

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


