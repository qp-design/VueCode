<template>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#353f4b"
      text-color="#ABB1B7"
      active-text-color="#fff" :collapse="false" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-folder-checked"></i>预约管理</template>
        <el-menu-item index="1-1">预约列表</el-menu-item>
        <el-menu-item index="1-2">回访中心</el-menu-item>
        <el-menu-item index="1-3">数据统计</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-reading"></i>营销推广</template>
        <el-menu-item index="2-2">账户数据</el-menu-item>
        <el-menu-item index="2-3">对话数据</el-menu-item>
      </el-submenu>

    </el-menu>
</template>

<script>
  export default {
    name: 'AsideNav',
    props:{
      menunav:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data () {
      return {

      }
    },
    methods:{
      routerChange(path){
        this.$router.push(path)
        console.log(path)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath){
        //console.log('handleSelectaaa:',key)
        switch(key){
          case "1-1":
            this.$router.push('/Libadd')
            break;
          case "1-2":
            this.$router.push('/Liblist')
            break;
          default:
            this.$router.push('/Dashboard')
        }

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
.el-menu{ text-align: left;}
.el-menu-vertical{ width: 200px;}
.el-submenu__title{ text-align: left;}
.el-menu-item{ margin-left: 10px;text-align: left;}

a {
  color: #42b983;
}
</style>
