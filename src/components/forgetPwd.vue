<template>
  <div class="forgetPwd" v-if="show">
    <div class="bg"></div>
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
          <input v-model="userName" class="ipt" />
        </div>
        <!-- <div class="row">
          <label><i>*</i>ldentifying Code</label>
          <input type="text" v-model="code" class="ipt ipt-code" />
          <span>Send lidentifying code</span>
        </div> -->
        <div class="row">
          <label><i>*</i>Confirming</label>
          <input type="password" v-model="confirming" class="ipt" />
        </div>
        <div class="row">
          <label><i>*</i>New Password</label>
          <input type="password" v-model="password" class="ipt" />
        </div>
      </div>
      <p class="tips" @click="goLogin">Login Now >></p>
      <div class="dialog-footer">
        <button class="btn cancel" @click="closeDialog">Cancel</button>
        <button class="btn confirm" @click="confirmEvent">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../api/http.js'
import { dialog } from '../utils/dialog.js'
export default {
  name: 'forgetPwd',
  props: ['show'],
  data() {
    return {
      userName: '',
      code: '',
      confirming: '',
      password: '',
      msg: false,
      loginMsg: true,
    }
  },
  methods: {
    closeDialog() {
      this.$emit('listenFun', this.msg);
    },
    goLogin() {
      this.$emit('listenFun', this.msg);
      this.$emit('listenForgetFun', this.loginMsg);
    },
    confirmEvent() {
      if(this.userName == '') {
        dialog.error('Please enter your email address');
      } else if (this.confirming != this.password) {
        dialog.error('Two inconsistent password input');
      } else {
        let data = {
          email: this.userName,
          newPassword: this.password
        }
        http.findPassword(data, res => {
          if (res.code == 'SUCCES') {

          }
        });
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.tips{
  margin: 15px 0 45px 118px !important;
}
.dialog{
  .dialog-body .row{
    position: relative;
    span{
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
