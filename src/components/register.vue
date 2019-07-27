<template>
  <div class="register" v-if="show">
    <div class="bg"></div>
    <div class="dialog">
      <div class="dialog-head">
        <div class="btn-close" @click="closeDialog">
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
          <input type="password" v-model="password" class="ipt"/>
        </div>
        <div class="row">
          <label><i>*</i>Country</label>
          <input v-model="country" class="ipt"/>
        </div>
        <div class="row">
          <label><i>*</i>Institutions</label>
          <input v-model="institutions" class="ipt"/>
        </div>
        <div class="row spe" @click="checkEvent">
          <i class="checkbox" :class="{check: isChecked == false, checked: isChecked == true}"></i>
          <span>I have read and agree to the the TASSEL SCHOLAR privacy policy</span>
        </div>
        <div class="row">
          <label><i>*</i>Retype the Code from the picture</label>
          <input v-model="code" class="ipt spe"/>
          <vue-img-verify @getImgCode="getImgCode" ref="vueImgVerify" @initImgCode="initImgCode" />
          <!-- <img src="../assets/images/service-bg3.png" alt=""> -->
        </div>
      </div>
      <p class="tips" @click="goLogin">Login Now >></p>
      <div class="dialog-footer">
        <button class="btn cancel" @click="closeDialog">Cancel</button>
        <button class="btn confirm" @click="registerEvent">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../api/http.js'
import { dialog } from '../utils/dialog.js'
import vueImgVerify from './vue-img-verify'
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
      isChecked: true,
      msg: false,
      loginMsg: true,
      imgCode: ''
    }
  },
  components: { vueImgVerify },
  created() {
    
  },
  methods: {
    // 默认获取图片验证码
    initImgCode(data) {
      this.imgCode = data;
    },
    // 点击图片获取验证码
    getImgCode(code) {
      this.imgCode = code;
    },
    closeDialog() {
      this.$emit('listenFun', this.msg);
    },
    checkEvent() {
      if (this.isChecked == true) {
        this.isChecked = false;
      } else {
        this.isChecked = true;
      }
    },
    goLogin() {
      this.$emit('listenFun', this.msg);
      this.$emit('listenLoginFun', this.loginMsg);
    },
    registerEvent() {
      if (this.code.toUpperCase() != this.imgCode) {
        dialog.error('Verification code error');
        return;
      }
      let data = {
        country: this.country,
        discipline: "",
        email: this.email,
        familyName: this.familyName,
        givenName: this.firstName,
        insitution: this.institutions,
        password: this.password,
        retypePassword: this.code,
        role: "",
        username: ""
      }
      http.register(data, res => {
        if (res.code == 'SUCCES') {
          dialog.success('registered was successfully');
          this.$emit('listenFun', this.msg);
        }
      });
    }
  }
}
</script>

<style scoped lang="scss">

</style>
