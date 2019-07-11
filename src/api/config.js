
  //可修改
  let REQUEST_CFG = {
    //请求服务器地址
    // 'BASE_URL':'http://114.55.28.121/pentaho',
    'BASE_URL': '/pentaho',// 代理
    //请求提交类型    JSON 为 application/json模式，FORM 为 表单提交模式
    'REQUEST_TYPE': 'application/json',

    //请求超时时间(单位秒)
    'TIME_OUT': 600,
    'TOKEN':'X-Access-Token',
    // 无权限时，返回到登录页面，登录页面相关访问地址
    'LOGIN_PAGE_PATH': 'http://stg-bi.xforceplus.com/hades/login',

    'MOCK': true
  };


  export {REQUEST_CFG};
