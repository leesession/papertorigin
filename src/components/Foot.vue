<template>
    <div class="footer-box">
        <div class="footer">
            <div class="wrap1300">
                <div>
                    <span>Social  Media</span>
                    <a :href="`https://www.facebook.com/sharer.php?u=${websiteUrl}`" target="_blank" title="facebook">
                        <i class="icon icon-f"></i>
                    </a>
                    <a href="javascript:void(0)" title="weibo" @click="weiboShare" target="_blank">
                        <i class="icon icon-xl"></i>
                    </a>
                    <a :href="`http://twitter.com/home?status=${websiteUrl}`" title="twitter" target="_blank">
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
            this.websiteUrl = window.location.host;
        },
        methods:{
            weiboShare(){
                let url =`http://service.weibo.com/share/share.php?url=${this.websiteUrl}&title=Tassel Scholar`;
                window.open(url)
            },
            shareWeChat(){
                let url = window.location.host;
                this.$refs.wechat.shareWeChat(url,true)
            },
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
    }
</style>
