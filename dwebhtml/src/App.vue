<template>
  <div id="app">
    56416541
    <div id='top-menu' class="dweb">
    </div>
    <div id='left-menu' :class="'dweb ' + mobile_left">
      <i @click="showHideLeftMenu" id='left-btn' class="el-icon-menu"></i>
      <!--导航栏-->
      <el-col :span="24" style="margin-top: 80px">
        <el-menu
            class="el-menu-vertical-demo"
            background-color="#00000000"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            select="chooseMenu"
        >
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-opened"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/add-article">发布文章</el-menu-item>
              <el-menu-item index="/article-list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/user-permission">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-money"></i>
            <span slot="title">打赏记录</span>
          </el-menu-item>
          <el-menu-item index="/lanmu-admin">
            <i class="el-icon-s-operation"></i>
            <span slot="title">栏目管理</span>
          </el-menu-item>
          <el-menu-item v-if="authUserLogin" @click="blogLogout()">
            <i class="el-icon-back"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <!--    页面内容 -->
    <div id='content' :class="mobile_content">
      <router-view :screenWidth="screenWidth"></router-view>
      <div id="footer" class="dweb">
        <span>版权信息</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      screeWidth: document.body.clientWidth,
      mobile_left: '',
      mobile_content: '',
    };
  },
  computed: {
    //  验证用户是否登录
    authUserLogin() {
      return this.$store.getters.isnotUserlogin
    }
  },
  watch: {
    //  监听用户token
    authUserLogin(newval) {
      if (newval === null) {
        this.$router.push({path: '/login'})
      }
    }
  },
  created() {
    this.$router.dispatch('tryAutoLogin')
  },
  mounted() {
    this.changeDevice()
  },
  methods: {
    chooseMenu(index) {
      this.$router.push({path: index})
    },
    changeDevice() {
      if (this.screeWidth <= 500) {
        this.mobile_left = 'xs'
        this.mobile_content = 'xs'
      }
    },
    showHideLeftMenu() {
      if (this.mobile_left === "") {
        this.mobile_left = 'xs'
      } else {
        this.mobile_left = ''
      }
      //  宽屏
      if (this.screeWidth > 500) {
        if (this.mobile_content === '') {
          this.mobile_content = 'xs'
        } else {
          this.mobile_content = ""
        }
      }
    },
    //  退出登录
    blogLogout() {
      this.$store.dispatch('blogLogout', this.$store.getters.isnotUserlogin)
      // this.$store.commit('clearUserinfo')
      // this.$router.push({path:'/'})
    }
  },
};
</script>

<style>
.el-col {
  margin-top: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
