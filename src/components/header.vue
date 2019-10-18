<template>
  <div class="head">
    <div class="header-left"><img src="../assets/images/font.png" alt=""></div>
    <div class="header-right" v-if="isLogin">
      Welcome,<b>{{JSON.parse(isLogin).loginmail}}</b>
      <span @click="resetPwd">ResetPWD</span>
      <span @click="loginOut">Logout</span>
    </div>
    <div class="header-right" v-else>
      <span @click="registerEvent">Register</span>
      <span @click="loginEvent">Login</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

export default {
  name: 'headers',
  computed: {
    ...mapState({
      isLogin: 'loginMsg'
    }),
  },
  data() {
    return {
      registerMsg: {
        registerShow: true
      },
      loginMsg: {
        loginShow: true
      },
      resetMsg: {
        resetShow: true
      }
    }
  },
  methods: {
    registerEvent() {
      $('body').css('overflow','hidden')
      this.$emit('lintenRegisterFun', this.registerMsg);
    },
    loginEvent() {
      $('body').css('overflow','hidden')
      this.$emit('lintenLoginFun', this.loginMsg);
    },
    loginOut(){
      this.$message.success('logout was successfully');
      this.$store.commit('userLoginOut');
    },
    resetPwd(){
      $('body').css('overflow','hidden')
      this.$emit('lintenResetPwd', this.resetMsg);
    }
  }
}
</script>

<style scoped lang="scss">
.head{
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #F6F6F6;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  .header-left{
    width: 308px;
    height: 28px;
    margin: 11px 0;
  }
  .header-right{
    span{
      display: inline-block;
      width: 78px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #296A7F;
      border: 1px solid #296A7F;
      border-radius: 2px;
      margin: 11px 0 11px 12px;
      cursor: pointer;
      &:hover, &.active{
        color: #fff;
        background: #296A7F;
      }
    }
  }
}
</style>
