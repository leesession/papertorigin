<template>
  <div class="login" v-if="show">
    <div class="bg"></div>
    <div class="dialog_wrapper">
      <div class="dialog">
        <div class="dialog-head">
          <div class="btn-close" @click="closeDialog">
            <div class="btn-close-bg"></div>
            <i class="el-icon-close"></i>
          </div>
          <h3>Login</h3>
          <div class="cont">
            <i class="icon"></i>
            <span>Sign in to your Account</span>
          </div>
        </div>
        <div class="dialog-body">
          <div class="row">
            <label><i>*</i>E-mail / name</label>
            <input v-model="userName" class="ipt" />
          </div>
          <div class="row">
            <label><i>*</i>Password</label>
            <input type="password" v-model="password" class="ipt" />
          </div>
          <div class="row">
            <p class="forget" @click="goForgetPwd">Forget password?</p>
          </div>
          <div class="row spe" @click="checkEvent">
            <i class="checkbox" :class="{check: isChecked == false, checked: isChecked == true}"></i>
            <span>Keep me log logged in</span>
          </div>
        </div>
        <p class="tips" @click="goRegister">Register Now >></p>
        <div class="dialog-footer">
          <button class="btn cancel" @click="closeDialog">Cancel</button>
          <button class="btn confirm" @click="loginEvent">Login</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { http } from '../api/http.js'
import { dialog } from '../utils/dialog.js'
export default {
  name: 'login',
  props: ['show'],
  data() {
    return {
      userName: '',
      password: '',
      msg: false,
      registerMsg: true,
      isChecked: true,
      forgetMsg: true
    }
  },
  methods: {
    closeDialog() {
      $('body').css('overflow','auto')
      this.$emit('listenFun', this.msg);
    },
    checkEvent() {
      if (this.isChecked == true) {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    goRegister() {
      this.$emit('listenFun', this.msg);
      this.$emit('listenRegisterFun', this.registerMsg);
    },
    goForgetPwd() {
      this.$emit('listenFun', this.msg);
      this.$emit('listenForgetFun', this.forgetMsg);
    },
    loginEvent() {
      let data = {
        loginmail: this.userName,
        loginpassword: this.password
      };
      http.login(data, res => {
        if (res.code === 'SUCCES') {
          if (this.isChecked === true) {
            localStorage.setItem('USER', JSON.stringify(data));
          } else {
            localStorage.clear();
          }
          dialog.success('login was successfully');
          this.$emit('listenFun', this.msg);
          this.$store.commit('userLogin',JSON.stringify(data))
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.login{
  .tips{
    margin: 10px 0 30px 118px;
  }
  .forget{
    font-size: 16px;
    color: #3496B4;
    cursor: pointer;
    width: 180px;
  }
}
</style>
