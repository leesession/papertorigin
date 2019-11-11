<template>
    <div class="footer-box">
        <div class="footer">
            <div class="wrap1300">
                <div>
                    <span>Social  Media</span>
                    <a :href="`https://www.facebook.com/sharer.php?u=${facebookUrl}`" target="_blank" title="facebook">
                        <i class="icon icon-f"></i>
                    </a>
                    <a href="javascript:void(0)" title="weibo" @click="weiboShare" target="_blank">
                        <i class="icon icon-xl"></i>
                    </a>
                    <a :href="`http://twitter.com/home?status=${facebookUrl} Tassel Scholar`" title="twitter" target="_blank">
                        <i class="icon icon-fg"></i>
                    </a>
                    <i class="icon icon-wx"  @click="shareWeChat" title="wechat"></i>
                </div>
                <div><img src="../assets/images/foot-logo2.png" class="foot-logo"  alt=""></div>
                <div>
                    <span>Supportable Mobile Terminal</span>
                    <i class="icon icon-ios"></i>
                    <i class="icon icon-android"></i>
                </div>
            </div>
        </div>
        <div class="intro">Chengdu FengRui Cloud Science & Technology Co. Ltd. All rights reserved.</div>
        <div class="wechat" v-show="haveCode">
            <div class="title">
                分享到微信
                <i class="el-icon-close" @click="closeCode"></i>
            </div>
            <div id="wechat"></div>
            <div class="tip">
                打开微信，扫描二维码分享
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode2'
    export default {
        name: "Foot",
        watch:{
            '$route':function (newVal) {
                // this.facebookUrl = `http://static.vienna.net.cn${newVal.path}`;
            }
        },
        data(){
            return{
                haveCode:false,
                facebookUrl:'http://static.vienna.net.cn/',
                imgUrl:'http://static.vienna.net.cn/',

            }
        },
        methods:{
            weiboShare(){
                let windowUrl = window.location.host;
            // &pic=${windowUrl}static/img/blue-logo.a1e05d81.png
                let url =`http://service.weibo.com/share/share.php?url=${windowUrl}&title=Tassel Scholar`;
                window.open(url)
            },
            shareWeChat(){
                this.haveCode = true;
                let url = window.location.href
                let qrcode = new QRCode('wechat', {
                    width: 200,  // 二维码宽度
                    height: 200, // 二维码高度
                    text: url
                })
            },
            closeCode(){
                this.haveCode=false;
                $('#wechat').html('');
            }
        }
    }
</script>

<style scoped lang="scss">
    .footer-box {
        width: 100%;
        height: 95px;
        background: #f6f6f6;

        .footer {
            height: 70px;
            line-height: 70px;
            background: #D5E7E9;

            .wrap1300 {
                width: 1340px;
                display: flex;
                justify-content: space-between;
                >div{
                    display: flex;
                    justify-content: center;
                    flex: 1;
                    &:first-child{
                        justify-content: flex-start;
                    }
                    &:last-child{
                        justify-content: flex-end;
                    }
                }
                .foot-logo{
                    height: 70px;
                    margin-top: 7px;
                }
            }

            span {
                float: left;
                font-size: 20px;
                color: #6C767E;
            }

            .icon {
                float: left;
                width: 36px;
                height: 36px;
                margin: 17px 0 0 25px;
                cursor: pointer;

                &.icon-f {
                    background: url(../assets/images/facebook.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/facebook-active.png) no-repeat center center;
                    }
                }

                &.icon-xl {
                    background: url(../assets/images/microblog.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/microblog-active.png) no-repeat center center;
                    }
                }

                &.icon-fg {
                    background: url(../assets/images/twitter.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/twitter-active.png) no-repeat center center;
                    }
                }

                &.icon-wx {
                    background: url(../assets/images/wechat.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/wechat-active.png) no-repeat center center;
                    }
                }

                &.icon-ios {
                    width: 33px;
                    height: 36px;
                    background: url(../assets/images/apple.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/apple-active.png) no-repeat center center;
                    }
                }

                &.icon-android {
                    height: 36px;
                    background: url(../assets/images/android.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/android-active.png) no-repeat center center;
                    }
                }
            }
        }

        .intro{
            text-align: center;
            height: 25px;
            line-height: 25px;
        }
        .wechat{
            position: fixed;
            top: 50%;
            left: 50%;
            width: 240px;
            transform: translate(-50%,-50%);
            background-color: #fff;
            z-index: 10;
            border: 1px solid #333;
            text-align: center;
            .title{
                height: 25px;
                line-height: 25px;
                background-color: #efefef;
                position: relative;
                i{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 20px;
                    cursor: pointer;
                }
            }
            #wechat{
                width: 200px;
                margin: 0 auto;
            }
            .tip{
                height: 25px;
                line-height: 25px;
                background-color: #efefef;
            }
        }
    }
</style>
