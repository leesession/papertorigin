<template>
  <div class="login" v-if="show">
    <div class="bg"></div>
    <div class="dialog">
      <div class="dialog-head">
        <div class="btn-close">
          <div class="btn-close-bg"></div>
          <i class="el-icon-close"></i>
        </div>
        <h3>login</h3>
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
          <input v-model="password" class="ipt" />
        </div>
        <!-- <div class="row">
          <p class="forget">Forget password?</p>
        </div> -->
        <div class="row spe">
          <i class="checkbox checked"></i>
          <span>Keep me log logged in</span>
        </div>
      </div>
      <p class="tips">Register Now >></p>
      <div class="dialog-footer">
        <button class="btn cancel">Cancel</button>
        <button class="btn confirm">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: ['show'],
  data() {
    return {
      userName: '',
      password: '',
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
