<template>
  <div class="register" v-if="show">
    <div class="bg"></div>
    <div class="dialog">
      <div class="dialog-head">
        <div class="btn-close">
          <div class="btn-close-bg"></div>
          <i class="el-icon-close"></i>
        </div>
        <h3>Register</h3>
        <div class="cont">
          <i class="icon"></i>
          <span>Register	 New Account</span>
        </div>
      </div>
      <div class="dialog-body">
        <div class="row">
          <label><i>*</i>First name</label>
          <input v-model="firstName" class="ipt" />
        </div>
        <div class="row">
          <label><i>*</i>Family name</label>
          <input v-model="familyName" class="ipt" />
        </div>
        <div class="row">
          <label><i>*</i>E-mail</label>
          <input v-model="email" class="ipt" />
        </div>
        <div class="row">
          <label><i>*</i>Password</label>
          <input v-model="password" class="ipt"/>
        </div>
        <div class="row">
          <label><i>*</i>Country</label>
          <input v-model="country" class="ipt"/>
        </div>
        <div class="row">
          <label><i>*</i>Institutions</label>
          <input v-model="institutions" class="ipt"/>
        </div>
        <div class="row spe">
          <i class="checkbox checked"></i>
          <span>I have read and agree to the the TASSEL SCHOLAR privacy policy</span>
        </div>
        <div class="row">
          <label><i>*</i>Retype the Code from the picture</label>
          <input v-model="code" class="ipt spe"/>
          <img src="../assets/images/service-bg3.png" alt="">
        </div>
      </div>
      <p class="tips">Login Now >></p>
      <div class="dialog-footer">
        <button class="btn cancel">Cancel</button>
        <button class="btn confirm">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  props: ['show'],
  data() {
    return {
      firstName: '',
      familyName: '',
      email: '',
      password: '',
      country: '',
      institutions: '',
      code: '',
      isChecked: true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
