<template>
    <div class="footer-box">
        <div class="footer">
            <div class="wrap1300">
                <div>
                    <span>Social  Media</span>
                    <a :href="`https://www.facebook.com/sharer.php?u=${websiteUrl}`" target="_blank" title="facebook">
                        <i class="icon icon-f"></i>
                    </a>
                    <a :href="`http://service.weibo.com/share/share.php?url=${websiteUrl}&title=Tassel Scholar`" title="weibo" target="_blank">
                        <i class="icon icon-xl"></i>
                    </a>
                    <a :href="`http://twitter.com/share?text=Tassel Scholar&url=${websiteUrl}`" title="twitter" target="_blank">
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
        <div class="record" @click="toRecord">蜀ICP备20006269号</div>
        <we-chat ref="wechat" :idName="'wechat'"></we-chat>
    </div>
</template>

<script>
    import QRCode from 'qrcode2'
    import weChat from '../components/wechat'

    export default {
        name: "Foot",
        components:{weChat},
        data(){
            return{
                websiteUrl:'',
            }
        },
        mounted(){
            this.websiteUrl = `http://${window.location.host}`;
        },
        methods:{
            shareWeChat(){
                this.$refs.wechat.shareWeChat(this.websiteUrl,true)
            },
            toRecord(){
                window.open('http://www.beian.miit.gov.cn/')
            },
        }
    }
</script>

<style scoped lang="scss">
    .footer-box {
        width: 100%;
        background: #f6f6f6;
        padding-bottom: 10px;
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
        .record{
            line-height: 25px;
            text-align: center;
            cursor: pointer;
            font-size: 14px;
        }
    }
</style>
