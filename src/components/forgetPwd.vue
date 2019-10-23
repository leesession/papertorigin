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
                        <button @click="getEmailCode" :disabled="isDisabled">{{buttonName}}</button>
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
                    <button class="btn confirm" @click="confirmEvent" :disabled="disabled">{{disabled?'Submit...':'Submit'}}</button>
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
                isDisabled:false,
                buttonName:'Send lidentifying code',
                time:59,
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
                timer:null,
                disabled: false,
            }
        },
        methods: {
            getEmailCode(){

                if(!this.email || !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) return;
                this.isDisabled = true;
                this.$axios.post('/login/ifHasEmail', {email: this.email}).then(res => {
                    let {data} = res;
                    if (data.code === 'SUCCESS') {
                        this.confirmMsg.email = false;
                        this.emailText = 'email not register';
                        this.isDisabled = false;
                    } else {
                        this.confirmMsg.email = true;
                        this.sendCode();
                    }
                }).catch(err => {
                })
            },
            sendCode(){
                let data = {
                    email: this.email
                };
                http.sendCodeToMail(data, res => {
                    if (res.code === 'SUCCESS') {
                        dialog.success('email send successfully');
                        this.restTime()
                    }
                });
            },
            restTime() {
                this.timer = window.setInterval(()=>{
                    this.buttonName = `（${this.time}）s`;
                    --this.time;
                    if(this.time < 0) {
                        this.buttonName = "Send lidentifying code";
                        this.time = 59;
                        this.isDisabled = false;
                        window.clearInterval(this.timer);
                    }
                }, 1000);
            },
            closeDialog() {
                this.$emit('listenFun', this.msg);
                $('body').css('overflow','auto')
            },
            goLogin() {
                this.$emit('listenFun', this.msg);
                this.$emit('listenForgetFun', this.loginMsg);
            },
            confirmEvent() {
                if (this.email && this.code && this.password && this.confirmPassword) {
                    if(this.password !== this.confirmPassword){
                        this.confirmMsg.confirmPassword = false;
                        return
                    }
                   if(this.confirmMsg.email && this.confirmMsg.confirmPassword){
                       let data = {
                           email: this.email,
                           newPassword: this.password,
                           code: this.code
                       };
                       this.disabled = true;
                       http.findPasswordByCode(data, res => {
                           this.disabled = false;
                           if (res.code === 'SUCCESS' && res.success) {
                               this.$emit('listenFun', this.msg);
                               this.$message.success('NewPassword set successfully')
                               $('body').css('overflow','auto')
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
                }else this.confirmMsg.email = true;
            },
        },
        beforeDestroy(){
            if(this.timer) {
                clearInterval(this.timer); //关闭
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
            button {
                position: absolute;
                top: 30px;
                right: 123px;
                display: inline-block;
                color: #3C66D2;
                font-size: 16px;
            }
        }
    }
</style>
