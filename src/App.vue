<template>
  <div id="app">
    <site-header  @lintenRegisterFun="getRegisterMsg" @lintenLoginFun="getLoginMsg"></site-header>
    <router-view/>
    <register :show="registerShow" @listenFun="getRegisterCloseMsg" @listenLoginFun="getLoginCloseMsg"></register>
    <login :show="loginShow" @listenFun="getLoginCloseMsg" @listenRegisterFun="getRegisterCloseMsg" @listenForgetFun="getForgetMsg"></login>
    <forget-pwd :show="forgetShow" @listenFun="getForgetCloseMsg" @listenForgetFun="getLoginCloseMsg"></forget-pwd>
  </div>
</template>

<script>
import siteHeader from './components/header.vue'
import register from './components/register.vue'
import login from './components/login.vue'
import forgetPwd from './components/forgetPwd.vue'
export default {
  name: "app",
  components: { siteHeader, register, login, forgetPwd },
  data() {
    return {
      registerShow: false,
      loginShow: false,
      forgetShow: false
    }
  },
  methods: {
    getRegisterMsg(data) {
      this.registerShow = data.registerShow;
    },
    getLoginMsg(data) {
      this.loginShow = data.loginShow;
    },
    getRegisterCloseMsg(data) {
      this.registerShow = data;
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
