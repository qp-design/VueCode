  import upperFirst from 'lodash/upperFirst'
  import camelCase from 'lodash/camelCase'

  class Api {
    // constructor() {
    // }
    BaseApi(params,postfix='') {
      let BaseObj = {}
      params.keys().forEach(fileName => {
        // 获取目录对象
        const ApiConfig = params(fileName)
        // 剥去文件名开头的 `'./` 和结尾的扩展名
        // 获取组件的 PascalCase 命名
        const BaseName = upperFirst(
          camelCase(
            fileName.replace(/^\.\/(\w+)\.\w+$/, `$1+${postfix}`)
          )
        )
        BaseObj[BaseName] = ApiConfig.default || ApiConfig
      })
      return BaseObj
    }
  }


  const opt = new Api()


  const param = require.context(
    // 其文件目录的相对路径
    './src',
    // 是否查询其子目录
    false,
    // 匹配基础文件名的正则表达式
    /\.js$/)
  const MainApi = opt.BaseApi(param,'api')


  // const requireComponent = require.context(
  //   '../components',
  //   false,
  //   /Bi[A-Z]\w+\.vue$/
  // )
  // const componentName = opt.BaseApi(requireComponent)
  //
  // Object.keys(componentName).forEach(item=>{
  //   Vue.component(item,componentName[item])
  // })
  export default MainApi

