import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login' //用户登录
import Dashboard from '@/views/Dashboard' //系统主页
import Index from '@/views/Index' //

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{title:'用户登录'}
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      redirect:'/Index',
      meta:{title:'管理中心'},
      children:[
        {
          path: '/Index',
          name: 'Index',
          component: Index,
          meta:{title:'默认主页'}
        },

      ]
    },
  ]
})

//路由守卫，路由拦截器
// router.beforeEach((to, from, next) => {
//   if(!to.matched || to.matched.length === 0){
//     Message.error({
//       message:'页面不存在',
//       duration:'2000',
//       onClose:function () {
//         next({
//           replace: true,
//           name: 'error-404'
//         });
//       }
//     })
//   }else{
//     next();
//   }
// })





// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
