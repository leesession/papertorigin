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
            journal
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>journal</el-dropdown-item>
            <el-dropdown-item>conference</el-dropdown-item>
            <el-dropdown-item>thesis</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <input type="text" class="search-ipt">
      </div>
      <button class="search-btn">SEARCH</button>
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
    navClickEvent(index) {
      if (index == 0) {
        this.$router.push({ path: '/' });
      } else if (index == 1) {
        this.$router.push({ path: '/service' });
      } else if (index == 2) {
        this.$router.push({ path: '/resourse' });
      } else if (index == 3) {
        this.$router.push({ path: '/about' });
      } else if (index == 4) {
        this.$router.push({ path: '/contact' });
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

