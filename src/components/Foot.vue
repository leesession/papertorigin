<template>
    <div class="footer-box">
        <div class="footer">
            <div class="wrap1300">
                <div>
                    <span>Social  Media</span>
                    <i class="icon icon-f"></i>
                    <i class="icon icon-xl"></i>
                    <i class="icon icon-fg"></i>
                    <i class="icon icon-wx"></i>
                </div>
                <div>
                    <span>Supportable Mobile Terminal</span>
                    <i class="icon icon-ios"></i>
                    <i class="icon icon-android"></i>
                </div>
            </div>
        </div>
        <div class="intro">Chengdu FengRui Cloud Science & Technology Co. Ltd. All rights reserved.</div>
    </div>
</template>

<script>
    export default {
        name: "Foot"
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
                display: flex;
                justify-content: space-between;
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
                    height: 39px;
                    background: url(../assets/images/apple.png) no-repeat center center;
                    background-size: 100% 100%;

                    &:hover {
                        background: url(../assets/images/apple-active.png) no-repeat center center;
                    }
                }

                &.icon-android {
                    height: 39px;
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
