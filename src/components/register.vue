<template>
    <div class="register" v-if="show">
        <div class="bg"></div>
        <div class="dialog_wrapper">
            <div class="dialog">
                <div class="dialog-head">
                    <div class="btn-close" @click="closeDialog">
                        <div class="btn-close-bg"></div>
                        <i class="el-icon-close"></i>
                    </div>
                    <h3>Register</h3>
                    <div class="cont">
                        <i class="icon"></i>
                        <span>Register	 New Account</span>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="row">
                        <label><i>*</i>First name</label>
                        <input v-model="firstName"
                               :class="!firstName || confirmMsg.firstName?'ipt':'err ipt'"
                               maxlength="32"
                        />
                        <p v-if="firstName && !confirmMsg.firstName">firstName with only 0-9a-zA-Z_ characters.</p>
                    </div>
                    <div class="row">
                        <label><i>*</i>Family name</label>
                        <input v-model="familyName"
                               :class="!familyName || confirmMsg.familyName?'ipt':'err ipt'"
                               maxlength="32"
                        />
                        <p v-if="familyName && !confirmMsg.familyName">familyName with only 0-9a-zA-Z_ characters.</p>
                    </div>
                    <div class="row">
                        <label><i>*</i>E-mail</label>
                        <input v-model="email"
                               :class="!email || confirmMsg.email?'ipt':'err ipt'"
                               @blur="checkEmail"
                        />
                        <p v-if="email && !confirmMsg.email">{{emailText}}.</p>
                    </div>
                    <div class="row">
                        <label><i>*</i>Password</label>
                        <input type="password" v-model="password" class="ipt" maxlength="32"/>
                    </div>
                    <div class="row">
                        <label><i>*</i>Password Confirming</label>
                        <input type="password" v-model="confirmPassword"
                               :class="confirmMsg.confirmPassword?'ipt':'err ipt'"
                               maxlength="32"
                               @focus="confirmMsg.confirmPassword = true"
                               @blur="password === confirmPassword ? confirmMsg.confirmPassword = true : confirmMsg.confirmPassword = false"
                        />
                        <p v-if="!confirmMsg.confirmPassword">password confirm error.</p>
                    </div>
                    <div class="row">
                        <label><i>*</i>Country</label>
                        <el-select v-model="country" class="country" placeholder="" filterable>
                            <el-option
                                    v-for="item in countryList"
                                    :key="item.en"
                                    :label="item.en"
                                    :value="item.en">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="row">
                        <label><i>*</i>Institutions</label>
                        <input v-model="institutions" class="ipt"/>
                    </div>
                    <div class="row spe">
                        <i class="checkbox" :class="{check: isChecked === false, checked: isChecked === true}" @click="checkEvent"></i>
                        <span>I have read and agree to the <span @click="policyDialog = true">TASSEL SCHOLAR</span> privacy policy</span>
                    </div>
                    <div class="row">
                        <label><i>*</i>Retype the Code from the picture</label>
                        <input v-model="code"
                               :class="confirmMsg.code?'ipt spe':'err ipt spe'"
                               @focus="confirmMsg.code = true"
                               @blur="imgCode === code.toUpperCase() ? confirmMsg.code = true : confirmMsg.code = false"
                        />
                        <vue-img-verify @getImgCode="getImgCode" ref="vueImgVerify" @initImgCode="initImgCode"/>
                        <p v-if="!confirmMsg.code">code error.</p>
                    </div>
                </div>
                <p class="tips" @click="goLogin">Login Now >></p>
                <div class="dialog-footer">
                    <button class="btn cancel" @click="closeDialog">Cancel</button>
                    <button class="btn confirm" @click="registerEvent" :disabled="disabled">{{disabled?'Register...':'Register'}}</button>
                </div>
            </div>
        </div>
        <div class="dialog_wrapper_policy" v-show="policyDialog">
            <div class="policy">
                <div class="dialog-head">
                    <div class="btn-close" @click="policyDialog = false">
                        <div class="btn-close-bg"></div>
                        <i class="el-icon-close"></i>
                    </div>
                    <div class="cont">
                        <i class="icon"></i>
                        <span>Privacy Policy <span>(V 1.0.1—31/08/2019)</span></span>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="title">Collect User Information</div>
                    <div class="content">
                        We collect information about you in two ways: directly from your input and automated technologies.
                    </div>
                    <div class="content">
                        (1)We collect information from your input including your name, E-mail, country and institution.
                    </div>
                    <div class="content">
                        (2)We collect information from automated technologies including your search, retrieve, download, cite and share content.
                    </div>
                    <div class="title">Utilize User Information</div>
                    <div class="content">
                        (1)Provide and manage your access and use of service.
                    </div>
                    <div class="content">
                        (2)Process and fulfill the request of retrieving and downloading.
                    </div>
                    <div class="content">
                        (3)Offer customized content and other personalization to make more efficient for your and more relevant to your interest and geography.
                    </div>
                    <div class="content">
                        (4)Enhance and improve the service of adding new content and features.
                    </div>
                    <div class="content">
                        (5)Notify you about changes, updates and other announcements related to the service.
                    </div>
                    <div class="content">
                        (6)Deliver targeted advertisements, promotional messages, and other information related to the service and to your interests.
                    </div>
                    <div class="content">
                        (7)Provide technical, product and other support and help to keep the Service working, safe and secure.
                    </div>
                    <div class="title">Share User Information</div>
                    <div class="content">
                        (1)We will collect your personal information and retrieve content to make data analysis and date statistics.
                    </div>
                    <div class="content">
                        (2)We will provide analysis report about your personal information and retrieve content to third cooperated publishers.
                    </div>
                    <div class="title">Accessing and Updating Account Information</div>
                    <div class="content">
                        (1)Access to and correction and deletion of your personal information.
                    </div>
                    <div class="content">
                        (2)Restriction of our processing of your personal information, or to object to our processing.
                    </div>
                    <div class="content">
                        (3)Portability of your personal information.
                    </div>
                    <div class="title">Data Retention</div>
                    <div class="content">
                        We retain your personal information for as long as necessary to provide the Service and fulfill the transactions you have requested, complying with our legal obligations, maintaining business and financial records, resolving disputes, maintaining security, detecting and preventing fraud and abuse, and enforcing our agreements.
                    </div>
                    <div class="title">Data Security</div>
                    <div class="content">
                        We take precautions to safeguard your personal information against loss, theft and misuse and unauthorized access, disclosure, alteration and destruction through the use of appropriate technical and organizational measures.
                    </div>
                    <div class="title">Information Process</div>
                    <div class="content">
                        (1)Your personal information and retrieve content will be stored and processed in your region or another country where other service providers and FengRui Cloud Science & Technology Co., Ltd.
                    </div>
                    <div class="content">
                        (2)We take steps, including through contracts, to ensure that the information continues to be protected wherever it is located in a manner consistent with the standards of protection required under applicable law.
                    </div>
                    <div class="content">
                        (3)We rely on appropriate safeguards to transfer the data.
                    </div>
                    <div class="title">Privacy Change</div>
                    <div class="content">
                        We will update this privacy policy from time to time.  Any changes will be posted on this page with an updated revision date. If we make any material changes, we will provide notice through the Service or by other means.
                    </div>
                </div>
                <div class="dialog-footer">
                    <img src="../assets/images/logo12.png" alt="">
                    <div>® Chengdu FengRui Cloud Science & Technology Co., Ltd and TASSEL PAPER own the right of final interpretation of this privacy policy.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {http} from '../api/http.js'
    import {dialog} from '../utils/dialog.js'
    import vueImgVerify from './vue-img-verify'
    import {country} from '../utils/country.js'

    export default {
        name: 'register',
        watch: {
            firstName: function (newval) {
                if (newval && !/^[0-9a-zA-Z_]{1,}$/.test(newval)) this.confirmMsg['firstName'] = false;
                else this.confirmMsg['firstName'] = true
            },
            familyName: function (newval) {
                if (newval && !/^[0-9a-zA-Z_]{1,}$/.test(newval)) this.confirmMsg['familyName'] = false;
                else this.confirmMsg['familyName'] = true
            },
        },
        props: ['show'],
        data() {
            return {
                policyDialog:false,
                firstName: '',
                familyName: '',
                email: '',
                password: '',
                confirmPassword: '',
                country: '',
                institutions: '',
                code: '',
                isChecked: true,
                msg: false,
                loginMsg: true,
                imgCode: '',
                countryList: [],
                confirmMsg: {
                    firstName: true,
                    familyName: true,
                    email: true,
                    password: true,
                    confirmPassword: true,
                    country: true,
                    institutions: true,
                    isChecked: true,
                    code: true
                },
                emailText: '',//邮箱字段
                disabled: false,
            }
        },
        components: {vueImgVerify},
        created() {
            this.countryList = country;
        },
        methods: {
            // 默认获取图片验证码
            initImgCode(data) {
                this.imgCode = data;
            },
            // 点击图片获取验证码
            getImgCode(code) {
                this.imgCode = code;
            },
            closeDialog() {
                $('body').css('overflow', 'auto')
                this.$emit('listenFun', this.msg);
            },
            checkEvent() {
                if (this.isChecked === true) {
                    this.isChecked = false;
                    this.confirmMsg.isChecked = false
                } else {
                    this.isChecked = true;
                    this.confirmMsg.isChecked = true
                }
            },
            goLogin() {
                this.$emit('listenFun', this.msg);
                this.$emit('listenLoginFun', this.loginMsg);
            },
            checkConfirmMsg() {
                let validate = true;
                for (let key in this.confirmMsg) {
                    this.confirmMsg[key] === false && (validate = false)
                }
                return validate;
            },
            registerEvent() {
                if (this.firstName && this.familyName && this.email && this.password && this.confirmPassword && this.country && this.institutions && this.code) {
                    if (!this.confirmMsg.isChecked) {
                        this.$message.error('please read and agree to the the TASSEL SCHOLAR privacy policy')
                        return
                    }
                    if (this.password !== this.confirmPassword) {
                        this.$message.error('password confirm error !')
                        return
                    }
                    if (this.checkConfirmMsg()) {
                        let data = {
                            country: this.country,
                            discipline: "",
                            email: this.email,
                            familyName: this.familyName,
                            givenName: this.firstName,
                            insitution: this.institutions,
                            password: this.password,
                            retypePassword: this.code,
                            role: "",
                            username: ""
                        };
                        this.disabled = true;
                        http.register(data, res => {
                            this.disabled = false;
                            if (res.code === 'SUCCESS') {
                                dialog.success('registered was successfully');
                                this.$emit('listenFun', this.msg);
                                // 置空选项
                                this.firstName = '';
                                this.familyName = '';
                                this.email = '';
                                this.password = '';
                                this.confirmPassword = '';
                                this.country = '';
                                this.institutions = '';
                                this.code = '';
                            }
                        });
                    } else this.$message.error('Incorrect information');
                } else this.$message.error('Please improve the information');
            },
            checkEmail() {
                if (!this.email) return;
                if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
                    this.confirmMsg.email = false;
                    this.emailText = 'email error'
                } else {
                    this.$axios.post('/login/ifHasEmail', {email: this.email}).then(res => {
                        let {data} = res;
                        if (data.code !== 'SUCCESS') {
                            this.confirmMsg.email = false;
                            this.emailText = data.msg
                        } else this.confirmMsg.email = true;
                    }).catch(err => {
                    })
                }

            }
        }
    }
</script>

<style scoped lang="scss">
.dialog_wrapper_policy{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10000;
    overflow: auto;
    margin: 0;
    .policy{
        width: 1000px;
        margin: 2px auto;
        background: #eff2f4;
        border-radius: 4px;
        color: #666;
        .dialog-head{
            position: relative;
            .cont{
                padding: 20px 0;
                display: flex;
                justify-content: center;
                >span{
                    font-size: 30px;
                    color: #333;
                    span{
                        font-size: 16px;
                    }
                }
            }
            .btn-close{
                position: absolute;
                top: 0px;
                right:0px;
                width: 44px;
                height: 44px;
                cursor: pointer;
                .btn-close-bg{
                    width: 44px;
                    height: 44px;
                    text-align: center;
                    background: transparent;
                    border-radius: 100%;
                    opacity: 0.5;
                }
                i{
                    position: absolute;
                    top: 11px;
                    left: 11px;
                    font-size: 22px;
                    font-weight: bold;
                    color: #333;
                }
            }
        }
        .dialog-body{
            width: 800px;
            margin: 0 auto;
            padding-bottom: 20px;
            .title{
                font-size: 18px;
                font-weight: bold;
                margin: 20px 0 10px;
            }
            .content{
                font-size: 16px;
                line-height: 20px;
                margin-top: 10px;
            }
        }
        .dialog-footer{
            width: 800px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            font-size: 16px;
            padding-bottom: 20px;
            img{
                width: 200px;
            }
        }
    }
}
</style>
