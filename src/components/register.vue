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
                    <div class="row spe" @click="checkEvent">
                        <i class="checkbox" :class="{check: isChecked === false, checked: isChecked === true}"></i>
                        <span>I have read and agree to the the TASSEL SCHOLAR privacy policy</span>
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
                    <button class="btn confirm" @click="registerEvent">Register</button>
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
                        http.register(data, res => {
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

</style>
