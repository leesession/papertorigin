<template>
  <div class="citation" v-if="show">
    <div class="bg"></div>
    <div class="dialog-msg">
      <div class="dialog-title">
        <i class="icon icon-note fl"></i>
        <span class="fl">Citation</span>
        <i class="el-icon-close icon-close fr" @click="closeDialog"></i>
      </div>
      <div class="dialog-body">
        <ul>
          <li>
            <h4>GB/T7714</h4>
            <p v-for="(item, index) in params[0]" :key="index">{{item}}</p>
          </li>
          <li>
            <h4>MLA</h4>
            <p v-for="(item, index) in params[1]" :key="index">{{item}}</p>
          </li>
          <li>
            <h4>APA</h4>
            <p v-for="(item, index) in params[2]" :key="index">{{item}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: ['show', 'params'],
  data() {
    return {
      userName: '',
      password: '',
      msg: false,
      info: null
    }
  },
  methods: {
    closeDialog() {
      this.$emit('listenFun', this.msg);
    }
  }

}
</script>

<style scoped lang="scss">
.dialog-body{
  height: 600px;
  overflow-y: auto;
}
</style>
