<template>
  <el-container>
    <el-header>
      <header-nav></header-nav>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <aside-nav></aside-nav>
      </el-aside>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HeaderNav from '@/components/HeaderNav'
  import AsideNav from '@/components/AsideNav'
  // import Index from '@/components/Index'
  export default {
    name:'Dashboard',
    data() {
      return {

      }
    },
    components: {
      HeaderNav,AsideNav
    },
    mounted: function(){
      // token = localStorage.getItem('token')
      // if(token != "22222"){
      // 	this.$router.push('/')
      // }
      // this.$router.push('/Index')
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
    height: 50px;
    padding: 0px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
    height:calc(100vh - 60px);
  }

  .el-aside {
    background-color:#353f4b;
    color: #333;
    text-align: center;
    height:calc(100vh - 60px);
    overflow-x: hidden;
    border-right: #353f4b solid 0px;
  }

</style>