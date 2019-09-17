<template>
  <div class="loginbox">
    <div class="box_right">
      <img src="../assets/login_name.png" alt="" class="logo">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="60px" size="medium" >
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入您的账号" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd">
        <el-input type="password" v-model="loginForm.passwd" placeholder="请输入您的密码"  prefix-icon="el-icon-view"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="loginForm.code" placeholder="验证码" prefix-icon="el-icon-set-up"  @keyup.enter.native="loginHandler('loginForm')"  style="width: 50%; float: left; margin-right: 15px;"></el-input>
        <img src="../assets/code.png" alt="点击换一张" style="border: #dddddd solid 1px; height: 35px; float: right; margin-top:5px;">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandler('loginForm')" style="width: 100%;" :loading="loginForm.loading" >立即登录</el-button>
        <!-- v-loading.fullscreen.lock="fullscreenLoading" -->
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Login',
    data() {
      return {
        loginForm:{
          username:'admin',
          passwd:'123',
          code:'',
          loading:false
        },
        fullscreenLoading: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          passwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      loginHandler(formName){
        let _this = this;
        let forms = this.loginForm
        forms.loading = true;
        console.log(forms);
        if(forms.username == "" || forms.passwd == ""){
          this.$message({
            message: '账号和密码不允许为空，请检查！',
            type: 'warning',
            showClose:true
          });
          forms.loading = false;
          return false;
        }
        _this.$router.push({
          path:`/Dashboard`
        })
        localStorage.setItem('token',1111)
        return false;

        // _this.fullscreenLoading = true;

        // this.axios.post('/api/login',{
        //   data:forms,
        //   headers:{
        //     'headerTest':'testheadervalue1111111'
        //   }
        // })
        // .then(function(resposne){
        //   console.log(resposne)
        //   if(resposne.data.code){
        //     _this.$message({
        //       message: '登录成功，正在进入系统...',
        //       type: 'success',
        //       showClose:true
        //     });
        //     _this.$router.push({
        //       path:`/AdminHome`
        //     })
        //     localStorage.setItem('token',1111)
        //   }else{
        //     _this.$message({
        //       message: '账号或密码错误，请检查！',
        //       type: 'warning',
        //       showClose:true
        //     });
        //   }
        // })
        // .then(function(error){
        //   //console.log('error',error)
        // })
        // .then(function(){
        //   // _this.fullscreenLoading = false;
        //   forms.loading = false;
        // })

      }
    }
  };
</script>

<style>
  body{
    background: url(../assets/loginbg.jpg) no-repeat center center fixed;
    background-size: cover;
    overflow-y: hidden;
  }

  .logo{
    margin: 0 0 10% 0;
    width: 60%;
  }
  .loginbox{
    width: 50%; margin: 10% auto; min-width: 600px;
    background: url(../assets/loginbox.jpg) no-repeat 0px 1px;
    background-size: 100% 100%;
    min-height:450px;
    box-shadow: 0 0 10px #1b4294;
    border-radius: 5px;
  }

  .box_right{
    padding:9% 0% 0 43.5%;
    width: 50%;
    /*min-width: 365px;*/
    height: auto;
  }

  .el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
    line-height: 45px;
  }
</style>