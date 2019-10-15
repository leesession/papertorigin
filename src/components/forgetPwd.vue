<template>
    <div class="forgetPwd" v-if="show">
        <div class="bg"></div>
        <div class="dialog_wrapper">
            <div class="dialog">
                <div class="dialog-head">
                    <div class="btn-close" @click="closeDialog">
                        <div class="btn-close-bg"></div>
                        <i class="el-icon-close"></i>
                    </div>
                    <h3>Forget</h3>
                    <div class="cont">
                        <i class="icon"></i>
                        <span>Forget password</span>
                    </div>
                </div>
                <div class="dialog-body">
                    <div class="row">
                        <label><i>*</i>Register Email</label>
                        <input v-model="email"
                               :class="!email || confirmMsg.email?'ipt':'err ipt'"
                               @blur="checkEmail"
                        />
                        <p v-if="email && !confirmMsg.email">{{emailText}}.</p>
                    </div>
                    <div class="row">
                        <label><i>*</i>ldentifying Code</label>
                        <input v-model="code"
                               class="ipt ipt-code"
                        />
                        <span @click="getEmailCode">Send lidentifying code</span>
                    </div>
                    <div class="row">
                        <label><i>*</i>New Password</label>
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
                </div>
                <p class="tips" @click="goLogin">Login Now >></p>
                <div class="dialog-footer">
                    <button class="btn cancel" @click="closeDialog">Cancel</button>
                    <button class="btn confirm" @click="confirmEvent">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {http} from '../api/http.js'
    import {dialog} from '../utils/dialog.js'

    export default {
        name: 'forgetPwd',
        props: ['show'],
        data() {
            return {
                email: '',
                code: '',
                confirmPassword: '',
                password: '',
                msg: false,
                loginMsg: true,
                confirmMsg: {
                    email: true,
                    confirmPassword: true
                },
                emailText: '',//邮箱字段
            }
        },
        methods: {
            getEmailCode(){
                if(!this.email || !this.confirmMsg.email) return;
                let data = {
                    email: this.email
                };
                http.sendCodeToMail(data, res => {
                    if (res.code === 'SUCCESS') {
                        dialog.success('email send successfully');
                    }
                });
            },
            closeDialog() {
                this.$emit('listenFun', this.msg);
            },
            goLogin() {
                this.$emit('listenFun', this.msg);
                this.$emit('listenForgetFun', this.loginMsg);
            },
            confirmEvent() {
                if (this.email && this.code && this.password && this.confirmPassword) {
                   if(this.confirmMsg.email && this.confirmMsg.confirmPassword){
                       let data = {
                           email: this.email,
                           newPassword: this.password,
                           code: this.code
                       };
                       this.$emit('listenFun', this.msg);
                       http.findPasswordByCode(data, res => {
                           if (res.code === 'PASSWORD_HAS_BEEN_CHANGED') {
                               this.$message.success('NewPassword set successfully')
                           }
                       });
                   }else dialog.error('Incorrect information');
                } else dialog.error('Please improve the information');
            },
            checkEmail() {
                if (!this.email) return;
                if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
                    this.confirmMsg.email = false;
                    this.emailText = 'email error'
                } else {
                    this.$axios.post('/login/ifHasEmail', {email: this.email}).then(res => {
                        let {data} = res;
                        if (data.code === 'CAN USE') {
                            this.confirmMsg.email = false;
                            this.emailText = 'email not register'
                        } else this.confirmMsg.email = true;
                    }).catch(err => {
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .tips {
        margin: 15px 0 45px 118px !important;
    }

    .dialog {
        .dialog-body .row {
            position: relative;

            span {
                position: absolute;
                top: 28px;
                right: 123px;
                display: inline-block;
                color: #3C66D2;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
</style>
