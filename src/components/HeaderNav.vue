<template>
 <div id="HeaderNav">
	 
	 
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#353f4b"
      text-color="#fff"
      active-text-color="#ABB1B7">
			<span style="float: left;width: 200px; color: #fff;">虹桥预约系统</span>
      <el-submenu index="2" style="float: right;width: 140px;">
        <template slot="title"><i class="el-icon-upload el-icon--right"></i>个人中心</template>
        <el-menu-item index="profile">修改资料</el-menu-item>
        <el-menu-item index="logout">退出系统</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  data () {
    return {
      activeIndex:"1"
    }		
  },
  methods:{
		handleSelect(key, keyPath){
			if(key == "logout"){
				this.$router.push('/')
			}
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #HeaderNav ul li{ height: 50px;line-height: 50px;} */
#HeaderNav .el-header{ padding: 0;}
.el-submenu{ padding-right: 0;}
</style>
