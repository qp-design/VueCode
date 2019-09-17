<template>
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<style lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 50px;
		height: 50px;
  }
	.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
		height:calc(100vh - 60px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
		height:calc(100vh - 60px);
  }

</style>

<script>
  export default {
		name:'Container',
    data() {
      return {
        
      }
    }
  };
</script>