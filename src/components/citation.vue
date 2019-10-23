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
            <p>{{info.string1}}</p>
          </li>
          <li>
            <h4>MLA</h4>
            <p>{{info.string2}}</p>
          </li>
          <li>
            <h4>APA</h4>
            <p>{{info.string3}}</p>
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
  created() {
    this.info = this.params;
  },
  methods: {
    closeDialog() {
      this.$emit('listenFun', this.msg);
    }
  }

}
</script>

<style scoped lang="scss">

</style>
