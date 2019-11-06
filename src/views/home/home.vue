<template>
    <div class="home">
        <div class="banner-box">
            <div class="head">
                <img src="../../assets/images/logo.png" alt="" class="logo">
                <nav>
                    <ul>
                        <li v-for="(item, index) in navList" :key="index" :class="{active: index == activeNum}"
                            @click="navClickEvent(item)">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="center">
                <div class="words-box">
                    <div class="cont">
                        <p>Search With Your Articles</p>
                        <p>what do you want to retrieve today?</p>
                    </div>
                </div>
                <div class="search-box">
                    <div class="search">
                        <el-dropdown trigger="click" class="search-key">
                        <span class="el-dropdown-link">
                          <span>{{showVal}}</span>
                          <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown" class="dropdown-list">
                                <el-dropdown-item v-for="(item, index) in selectList" :key="index" :disabled="index === 2">
                                    <span @click="selectEvent(item)"  style="display: inline-block;width: 100%">{{item.showName}}</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <input type="text" class="search-ipt" v-model="key" @blur="keyCodeLeave" @focus="keyCodeEnter">
                    </div>
                    <button class="search-btn" @click="searchEvent">SEARCH</button>
                </div>
            </div>

        </div>
        <!--service-->
        <div class="common-box service-box">
            <div class="title">
                <h3 @click="goService">Our Service</h3>
            </div>
            <div class="cont">
                <p>TASSEL SCHOLAR will provide the latest paper searching and the most comprehensive article retrieving for global users.</p>
                <p>Our data information will obtain from publishers to keep copyright and accuracy so that users can derive the most </p>
                <p>qualified information searching service. TASSEL SCHOLAR will ensure every user can </p>
                <p>retrieve every academic paper information including titles, authors, DOI, </p>
                <p>subjects, keywords, abstracts etc. Users can transfer to official </p>
                <p>websites of publishers to obtain corresponding </p>
                <p>full article of academic papers </p>
            </div>
        </div>
        <!--resource-->
        <div class="common-box resource-box">
            <div class="title">
                <h3 @click="goResource">Our Resource</h3>
            </div>
            <div class="cont">
                <div class="tab">
                    <span v-for="(item, index) in selectList"
                          :key="index"
                          :class="{active: index == currentNum}"
                          @click="tabEvent(index)">
                        {{item.showName}}
                    </span>
                </div>
                <div class="wrap1100">
                    <h4>What resources do we have?</h4>
                    <p>TASSEL SCHOLAR make cooperation with below journal publishers to provide academic paper information searching and retrieving</p>
                </div>
                <el-carousel :interval="5000" v-if="currentNum !== 2" arrow="never" class="resource-banner wrap1150"
                             height="160px"
                             indicator-position="none">
                    <el-carousel-item>
                        <img src="../../assets/images/logo-springernature.svg" alt="">
                        <!--<img src="../../assets/images/ieee.jpg" alt="">-->
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!--about-us-->
        <div class="common-box about-us-box">
            <div class="title">
                <h3 @click="goAbout">About Us</h3>
            </div>
            <div class="cont">
                <el-carousel :interval="5000" arrow="always" height="280px" indicator-position="none">
                    <el-carousel-item v-for="(item,index) in aboutList" :key="index">
                        <img src="../../assets/images/service-blue.png" alt="" class="fl">
                        <div class="introduce fl">
                            <h6>{{item.name}} <span>{{item.role}}</span></h6>
                            <p>{{item.intro}}</p>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!--contact-->
        <div class="common-box contact-us-box">
            <div class="title">
                <h3 @click="goContact">Contact Us</h3>
            </div>
            <div class="contact wrap1150">
                <div class="col">
                    <i class="icon icon-phone"></i>
                    <span>+86 028-8888-8888</span>
                </div>
                <div class="col">
                    <i class="icon icon-email"></i>
                    <span>service@tasselscholar.com</span>
                </div>
                <div class="col">
                    <i class="icon icon-address"></i>
                    <span class="spe">NO.366, North Hupan Road, Chengdu 610000, China</span>
                </div>
            </div>
            <el-carousel :interval="5000" arrow="always" height="200px" indicator-position="none">
                <el-carousel-item>
                    <div class="card">
                        <h6>Administrative Management</h6>
                        <p>Telephone: +86 028-8888-8888</p>
                        <p>Mobilephone: +86 18270890446</p>
                        <p>E-mail: yanfeng@tasselpaper.com</p>
                        <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
                    </div>
                    <div class="card">
                        <h6>Market and Cooperation</h6>
                        <p>Telephone: +86 028-8888-8888</p>
                        <p>Mobilephone: +86 15889666049</p>
                        <p>E-mail: yangjunjie@tasselpaper.com</p>
                        <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
                    </div>
                    <div class="card">
                        <h6>Product and Service</h6>
                        <p>Telephone: +86 028-8888-8888</p>
                        <p>Mobilephone: +86 13361642689</p>
                        <p>E-mail: ruhang@tasselpaper.com</p>
                        <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
                    </div>
                </el-carousel-item>
                <el-carousel-item>
                    <div class="card">
                        <h6>Technology and Design</h6>
                        <p>Telephone: +86 028-8888-8888</p>
                        <p>Mobilephone: +86 17308055063</p>
                        <p>E-mail: shenghao@tasselpaper.com</p>
                        <p>Address: NO.366, North Hupan Road, Chengdu 610000, China</p>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    import {http} from '../../api/http.js'
    import {getBrowse , getBrowseData ,getCity ,getIp ,getDate ,getTime} from '../../utils/searchUp.js'
    import {mapState} from 'vuex'

    export default {
        name: 'home',
        computed: {
            ...mapState({
                loginMsg: 'loginMsg'
            }),
        },
        data() {
            return {
                key: '',
                navList: [
                    {
                        name: 'Home',
                        path: '/home'
                    },
                    {
                        name: 'Our Service',
                        path: '/service'
                    },
                    {
                        name: 'Our Resource',
                        path: '/resource'
                    },
                    {
                        name: 'About Us',
                        path: '/about'
                    },
                    {
                        name: 'Contact Us',
                        path: '/contact'
                    }
                ],
                activeNum: 0,
                showVal: 'Journal',
                selectVal: 'Journal',
                selectList: [{
                    showName: 'Journal',
                    value: 'Journal'
                }, {
                    showName: 'Conference',
                    value: 'conference'
                }, {
                    showName: 'Dissertation',
                    value: 'dissertation'
                }],
                currentNum: 0,
                aboutList: [
                    {
                        name: 'Feng Yan',
                        role: 'Management',
                        img: '',
                        intro:'Mr. Yan is the PhD of Biomedical Engineering at the University of Oklahoma, and he has been authorized more than 35 Chinese patents, and he possesses international contest, national contest, provincial contest and several contest prizes, as well as owns rich experiences about corporation cooperation. He is responding to management and business development.'
                    }, {
                        name: 'Rui Zhou',
                        role: 'Administration',
                        img: '',
                        intro:'Ms. Zhou is the Master of Industry Engineering at the University of Tennessee, and she ever obtained silver prizes in two national entrepreneurship contests in China. She is responding to product operation and business administration.'
                    }, {
                        name: 'Hang Ru',
                        role: 'Market',
                        img: '',
                        intro:'Mr. Ru is the Master of Optical Engineering at Nanchang Hangkong University, and he ever completed market and data analysis of 5 national and provincial entrepreneurship projects. He is responding to market analysis and data statistics.'
                    }, {
                        name: 'Hao Sheng',
                        role: 'Technology',
                        img: '',
                        intro:'Mr. Sheng has 5 years software developing experience and now he is the Master of Engineering Management in Xihua University, and he is very good at platform-developing of big data, HIS and Internet of things. He is responding to technological development and design.'
                    }, {
                        name: 'Qipeng Lv',
                        role: 'Advisor',
                        img: '',
                        intro:'Mr. Lv is the master of Southeast University in China, and possessed 10+ years working experience in Intel as senior director in software, and hold an Intel patent for software encryption verification, as well as worked as advanced operation senior in iQIYI. He is responding to guide and develop business strategy and management.'
                    }, {
                        name: 'Junjie Yang',
                        role: 'Operation',
                        img: '',
                        intro:'Mr. Yang is the master of Shenzhen University in China, and he ever obtained two second prizes in scientific contest of undergraduate and mathematic modeling contest of graduate in China. He is responding to product operation and function development.'
                    }, {
                        name: 'Yue Li',
                        role: 'Finance',
                        img: '',
                        intro:'Ms. Li is the master of Sydney University in Australia, and she ever obtained the outstanding prizes in national undergraduate business contest in China and in mathematic modeling contest of American. She has Chinese and international certificate of accountant qualification and is responding to financial analysis and cost management.'
                    }
                ]
            }
        },
        methods: {
            keyCodeEnter(){
                document.onkeydown = ()=>{
                    if(window.event.keyCode === 13){
                        this.searchEvent()
                    }
                }
            },
            keyCodeLeave(){
                document.onkeydown = ()=>{
                    if(window.event.keyCode === 13){}
                }
            },
            // 导航
            navClickEvent(obj) {
                this.$router.push({path: obj.path});
            },
            // 搜索下拉
            selectEvent(item) {
                this.selectVal = item.value;
                this.showVal = item.showName
            },
            tabEvent(index) {
                this.currentNum = index;
            },
            goService() {
                this.$router.push({path: '/service'});
            },
            goResource() {
                this.$router.push({path: '/resource'});
            },
            goAbout() {
                this.$router.push({path: '/about'});
            },
            goContact() {
                this.$router.push({path: '/contact'});
            },
            // 搜索
            searchEvent() {
                if(this.key.replace(/\s/g,'')){
                    let data = {
                        browser: getBrowse().browser,
                        browserData: getBrowseData(),
                        city: getCity(),
                        contry: "",
                        date: getDate(),
                        ipAddress: getIp(),
                        queryData: `{type: ${this.selectVal}, key: ${this.key}}`,
                        time: getTime(),
                        userEmail: this.loginMsg ? JSON.parse(this.loginMsg).loginmail :''
                    };
                    http.userSearchRecord(data, res => {
                        if (res.code === 'SUCCESS') {}
                    });
                    this.$router.push({path: '/searchList', query: {type: this.selectVal, key: this.key}});
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .center{
        position: absolute;
        top: calc(50% - 60px);
        left: 50%;
        transform: translate(-50%,-50%);
        .words-box {
            width: 100%;
            /*margin-top: 73px;*/
            display: flex;
            justify-content: center;
            .cont {
                width: 508px;
                text-align: center;
                p {
                    line-height: 40px;
                    font-size: 20px;
                    color: #fff;
                    opacity: 0.6;
                    &:first-child {
                        line-height: 65px;
                        border-bottom: 1px solid #fff;
                        font-size: 30px;
                        opacity: 1;
                    }
                }
            }
        }
        .search-box {
            margin: 40px 0 0 0;
        }
    }


    .common-box {
        .title {
            text-align: center;
            padding: 13px 0;
            h3 {
                display: inline-block;
                font-size: 28px;
                color: #29697E;
                border-bottom: 2px solid #fff;
                cursor: pointer;
                &:hover {
                    border-color: #29697E;
                }
            }
        }
    }

    .service-box {
        width: 100%;
        height: 310px;
        overflow: hidden;
        background: url(../../assets/images/service-bg.png) no-repeat center 20px;
        background-size: 100% 100%;
        .cont {
            text-align: center;
            margin-top: 25px;
            p {
                line-height: 28px;
                font-size: 16px;
                color: #485764;
            }
        }

    }

    .resource-box {
        width: 100%;
        height: 390px;
        overflow: hidden;
        background: #F6F8F9;
        .title {
            padding: 20px 0;
        }
        .cont {
            .tab {
                width: 420px;
                height: 36px;
                overflow: hidden;
                border: 1px solid #EFEFEF;
                box-shadow: 0 6px 12px rgba(77, 112, 123, 0.18);
                margin: 0 auto;
                display: flex;
                justify-content: flex-start;
                span {
                    width: 140px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    border-right: 1px solid #F2F2F4;
                    cursor: pointer;
                    &:last-child {
                        border: none;
                    }
                    &:hover, &.active {
                        color: #fff;
                        background: #4D707B;
                    }
                }
            }
            .wrap1100 {
                margin-top: 10px;
            }
            h4 {
                line-height: 50px;
                font-size: 20px;
                color: #0B1A30;
            }
            p {
                font-size: 16px;
                color: #414C55;
            }
            .resource-banner {
                margin-top: 30px;
                img {
                    width: 216px;
                    /*height: 70px;*/
                    margin: 0 32px;
                }
                .el-carousel__item {
                    padding: 0 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }
            }
        }
    }

    .about-us-box {
        width: 100%;
        height: 380px;
        overflow: hidden;
        background: linear-gradient(to right, #3B2B6A, #307C95);
        .title {
            padding: 20px 0;
            h3 {
                color: #fff;
                border: none;
            }
        }
        .cont {
            margin-top: 25px;
            img {
                width: 284px;
                height: 284px;
                margin: 0 35px 0 0;
            }
            .introduce {
                width: 700px;
                h6 {
                    line-height: 85px;
                    font-size: 26px;
                    color: #A8FFFC;
                    span {
                        font-size: 20px;
                    }
                }
                p {
                    line-height: 32px;
                    font-size: 18px;
                    color: #D8D8D8;
                }
            }
        }
    }

    .contact-us-box {
        width: 100%;
        height: 475px;
        overflow: hidden;
        background: #f6f6f6 url(../../assets/images/map.png) no-repeat center 60px;
        .title {
            padding: 35px;
            h3 {
                border-color: transparent;
            }
        }
        .contact {
            display: flex;
            justify-content: center;
            overflow: hidden;
            margin-bottom: 55px;
            .col {
                width: 385px;
                text-align: center;
                &:last-child {
                    width: 430px;
                }
                .icon-phone {
                    width: 31px;
                    height: 31px;
                    background: url(../../assets/images/phone.png) no-repeat center center;
                    background-size: 100% 100%;
                    margin-top: 8px;
                }
                .icon-email {
                    width: 38px;
                    height: 31px;
                    background: url(../../assets/images/mailer.png) no-repeat center center;
                    background-size: 100% 100%;
                    margin-top: 8px;
                }
                .icon-address {
                    width: 34px;
                    height: 41px;
                    background: url(../../assets/images/location.png) no-repeat center center;
                    background-size: 100% 100%;
                }
                span {
                    display: block;
                    font-size: 18px;
                    color: #53565B;
                    margin-top: 20px;
                    &.spe {
                        font-size: 16px;
                    }
                }
            }
        }
        .card {
            float: left;
            width: 425px;
            height: 190px;
            overflow: hidden;
            background: #fff;
            box-shadow: 0 3px 12px rgba(100, 100, 100, 0.18);
            margin: 0 5px;
            padding: 20px 10px 0 20px;
            h6 {
                line-height: 32px;
                font-size: 18px;
                color: #47535D;
            }
            p {
                line-height: 24px;
                font-size: 13px;
                color: #414C55;
            }
        }
    }


</style>

