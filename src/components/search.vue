<template>
  <div id="search" class="banner-box">
    <div class="head">
      <img src="../assets/images/logo.png" alt="" class="logo">
      <nav>
        <ul>
          <li v-for="(item, index) in navList" :key="index" :class="{active: activeNum == index}" @click="navClickEvent(index)">
            <span>{{item}}</span>
          </li>
        </ul>
      </nav>
    </div>
    <el-breadcrumb separator="/" class="search-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="search-box">
      <div class="search">
        <el-dropdown trigger="click" class="search-key">
          <span class="el-dropdown-link">
            <span>{{selectVal}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in selectList" :key="index">
              <span @click="selectEvent(item)">{{item}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <input type="text" class="search-ipt" v-model="key">
      </div>
      <button class="search-btn" @click="searchEvent">SEARCH</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'search',
  props: ['title', 'index'],
  data() {
    return {
      navList: ['Home', 'Our Service', 'Our Resource', 'About Us', 'Contact Us'],
      key: '',
      selectVal: 'journal',
      selectList: ['journal', 'conference', 'thesis'],
    }
  },
  computed: {
    activeNum() {
      if (this.index) {
        return this.index;
      }
    }
  },
  methods: {
    // 搜索下拉
    selectEvent(val) {
      this.selectVal = val;
    },
    navClickEvent(index) {
      if (index == 0) {
        this.$router.push({ path: '/' });
      } else if (index == 1) {
        this.$router.push({ path: '/service' });
      } else if (index == 2) {
        this.$router.push({ path: '/resource' });
      } else if (index == 3) {
        this.$router.push({ path: '/about' });
      } else if (index == 4) {
        this.$router.push({ path: '/contact' });
      }
    },
    searchEvent() {
      if (this.$route.path == '/searchList') {
        let query = {type: this.selectVal, key: this.key };
        this.$emit('listenFun', query);
      } else{
        this.$router.push({ path: '/searchList', query: {type: this.selectVal, key: this.key }});
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
#search{
  height: 236px;
  background: url(../assets/images/sky-other.png) no-repeat center center;
  background-size: 100% 100%;
  nav{
    margin: 0 30px 0 0;
  }
  .search-breadcrumb{
    margin: 50px 0 30px 30px;
  }
  .search-box{
    justify-content: flex-end;
    margin-right: 30px;
  }
}

</style>

