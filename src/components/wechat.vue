<template>
    <div>
        <div class="shadow" v-show="haveCode"></div>
        <div class="wechat" v-show="haveCode">
            <div class="title">
                分享到微信
                <i class="el-icon-close" @click="closeCode"></i>
            </div>
            <div :id="idName"></div>
            <div class="tip">
                打开微信，扫描二维码分享
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode2'

    export default {
        name: "wechat",
        props:{
            idName:{
                required:true
            }
        },
        data(){
            return{
                haveCode:false
            }
        },
        methods:{
            shareWeChat(url,isFooter){
                this.haveCode = true;
                if(isFooter){
                    new QRCode('wechat', {
                        width: 200,  // 二维码宽度
                        height: 200, // 二维码高度
                        text: url
                    });
                }else {
                    new QRCode('wechat1', {
                        width: 200,  // 二维码宽度
                        height: 200, // 二维码高度
                        text: url
                    })
                }
            },
            closeCode(){
                this.haveCode=false;
                $('#wechat').html('');
                $('#wechat1').html('');
            }
        }
    }
</script>

<style scoped lang="scss">
    .shadow{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.3);
        z-index: 3000;
    }
    .wechat{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 240px;
        transform: translate(-50%,-50%);
        background-color: #fff;
        z-index: 3001;
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
    #wechat,#wechat1{
        width: 200px;
        margin: 0 auto;
    }
    .tip{
        height: 25px;
        line-height: 25px;
        background-color: #efefef;
    }
    }
</style>
