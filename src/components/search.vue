<template>
    <div id="search" class="banner-box">
        <div class="head">
            <img src="../assets/images/logo.png" alt="" class="logo" @click="$router.push('/')">
            <nav>
                <ul>
                    <li v-for="(item, index) in navList" :key="index" :class="{active: activeNum == index}"
                        @click="navClickEvent(index)">
                        <span>{{item}}</span>
                    </li>
                </ul>
            </nav>
        </div>
        <el-breadcrumb separator="/" class="search-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search-box">
            <div class="search">
                <el-dropdown trigger="click" class="search-key">
                      <span class="el-dropdown-link">
                        <span>{{ showVal}}</span>
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in selectList" :key="index" :disabled="index === 2">
                            <span @click="selectEvent(item)" style="display: inline-block;width: 100%">{{item.showName}}</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <input type="text" class="search-ipt" v-model="key">
            </div>
            <button class="search-btn" @click="searchEvent">SEARCH</button>
        </div>

    </div>
</template>

<script>
    import {getBrowse , getBrowseData ,getCity ,getIp ,getDate ,getTime} from '../utils/searchUp.js'
    import {http} from '../api/http.js'
    import {mapState} from 'vuex'

    export default {
        name: 'search',
        props: ['title', 'index','type','keys'],
        data() {
            return {
                navList: ['Home', 'Our Service', 'Our Resource', 'About Us', 'Contact Us'],
                key: '',
                showVal: 'Journal',
                selectVal: 'journal',
                selectList: [{
                    showName:'Journal',
                    value:'journal'
                }, {
                    showName:'Conference',
                    value:'conference'
                }, {
                    showName: 'Dissertation',
                    value: 'dissertation'
                }],
            }
        },
        mounted(){
            this.selectVal = this.type ? this.type:'journal';
            this.showVal = this.type ? this.type[0].toUpperCase()+this.type.slice(1): 'Journal';
            this.key = this.keys?this.keys:''
        },
        computed: {
            ...mapState({
                loginMsg: 'loginMsg'
            }),
            activeNum() {
                if (this.index) {
                    return this.index;
                }
            }
        },
        methods: {
            // 搜索下拉
            selectEvent(item) {
                this.selectVal = item.value;
                this.showVal = item.showName;
            },
            navClickEvent(index) {
                if (index == 0) {
                    this.$router.push({path: '/'});
                } else if (index == 1) {
                    this.$router.push({path: '/service'});
                } else if (index == 2) {
                    this.$router.push({path: '/resource'});
                } else if (index == 3) {
                    this.$router.push({path: '/about'});
                } else if (index == 4) {
                    this.$router.push({path: '/contact'});
                }
            },
            searchEvent() {
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
                if (this.$route.path == '/searchList') {
                    let query = {type: this.selectVal, key: this.key};
                    this.$router.replace({
                        path:'/searchList',
                        query:query
                    })
                    this.$emit('listenFun', query);
                } else {
                    this.$router.push({path: '/searchList', query: {type: this.selectVal, key: this.key}});
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    #search {
        height: 236px;
        background: url(../assets/images/sky-other.png) no-repeat center center;
        background-size: 100% 100%;
        nav {
            margin: 0 30px 0 0;
        }
        .search-breadcrumb {
            margin: 50px 0 30px 30px;
        }
        .search-box {
            justify-content: flex-end;
            margin-right: 30px;
        }
    }

</style>

