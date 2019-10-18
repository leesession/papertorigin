<template>
  <div id="app">
    <site-header  @lintenRegisterFun="getRegisterMsg" @lintenLoginFun="getLoginMsg" @lintenResetPwd="getResetMsg"></site-header>
    <router-view/>
    <register :show="registerShow" @listenFun="getRegisterCloseMsg" @listenLoginFun="getLoginCloseMsg"></register>
    <login :show="loginShow" @listenFun="getLoginCloseMsg" @listenRegisterFun="getRegisterCloseMsg" @listenForgetFun="getForgetMsg"></login>
    <forget-pwd :show="forgetShow" @listenFun="getForgetCloseMsg" @listenForgetFun="getLoginCloseMsg"></forget-pwd>
    <reset-pwd :show="resetShow" @listenFun="getResetCloseMsg" ></reset-pwd>
  </div>
</template>

<script>
import siteHeader from './components/header.vue'
import register from './components/register.vue'
import login from './components/login.vue'
import forgetPwd from './components/forgetPwd.vue'
import resetPwd from './components/resetPwd.vue'

export default {
  name: "app",
  components: { siteHeader, register, login, forgetPwd ,resetPwd},
  data() {
    return {
      registerShow: false,
      loginShow: false,
      forgetShow: false,
      resetShow:false
    }
  },
  methods: {
    getResetMsg(data) {
      this.resetShow = data.resetShow;
    },
    getResetCloseMsg(data) {
      this.resetShow = data;
    },
    getRegisterMsg(data) {
      this.registerShow = data.registerShow;
    },
    getRegisterCloseMsg(data) {
      this.registerShow = data;
    },
    getLoginMsg(data) {
      this.loginShow = data.loginShow;
    },
    getLoginCloseMsg(data) {
      this.loginShow = data;
    },
    getForgetMsg(data) {
      this.forgetShow = data;
    },
    getForgetCloseMsg(data) {
      this.forgetShow = data;
    }
  }

}
</script>


<style lang="scss">
#app {
  // font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #485764;
}
</style>
