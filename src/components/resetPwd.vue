<template>
    <div class="resetPwd" v-if="show">
        <div class="bg"></div>
        <div class="dialog_wrapper">
            <div class="dialog">
                <div class="dialog-head">
                    <div class="btn-close" @click="closeDialog">
                        <div class="btn-close-bg"></div>
                        <i class="el-icon-close"></i>
                    </div>
                    <h3>Reset</h3>
                    <div class="cont">
                        <i class="icon"></i>
                        <span>Reset password</span>
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
                        <label><i>*</i>Old Password</label>
                        <input v-model="oldPassword"
                               type="password"
                               class="ipt"
                               maxlength="32"
                        />
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
        name: "resetPwd",
        props: ['show'],
        data() {
            return {
                email: '',
                oldPassword: '',
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
            closeDialog() {
                this.$emit('listenFun', this.msg);
                $('body').css('overflow','auto')
            },
            confirmEvent() {
                if (this.email && this.oldPassword && this.password && this.confirmPassword) {
                    if(this.password !== this.confirmPassword){
                        this.confirmMsg.confirmPassword = false;
                        return
                    }
                    if(this.confirmMsg.email && this.confirmMsg.confirmPassword){
                        let data = {
                            mail: this.email,
                            newPWD: this.password,
                            oldPWD: this.oldPassword
                        };

                        http.changePWDByOldPwd(data, res => {
                            if (res.code === 'SUCCESS') {
                                this.$message.success('NewPassword set successfully, Please login again.');
                                this.$emit('listenFun', this.msg);
                                this.$store.commit('userLoginOut');
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

