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
          <label><i>*</i>E-mail / name</label>
          <input v-model="userName" class="ipt" />
        </div>
        <div class="row">
          <label><i>*</i>Password</label>
          <input type="password" v-model="password" class="ipt" />
        </div>
      </div>
      <p class="tips" @click="goLogin">Login Now >></p>
      <div class="dialog-footer">
        <button class="btn cancel" @click="closeDialog">Cancel</button>
        <button class="btn confirm" @click="confirmEvent">confirm</button>
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

  }
}
</style>
