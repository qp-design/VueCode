
import axios from 'axios'
import api from './../../api'
import { REQUEST_CFG } from './../../api/config'
// 响应时间
axios.defaults.timeout = REQUEST_CFG.TIME_OUT * 1000;

import Vue from 'vue'
// 配置接口地址
axios.defaults.baseURL = REQUEST_CFG.BASE_URL;

axios.defaults.withCredentials = true;

// const instance = axios.create();
import router from '../../router'

// 请求队列
Vue.prototype.queue = [];
// axios内置的中断ajax的方法
const cancelToken = axios.CancelToken;

// 路由守卫
router.beforeEach((to, from, next) => {
    Vue.prototype.queue.forEach(item=>{
        item.cancel('重复的接口发送');
    })
    Vue.prototype.queue = []
    next();
})

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    if (!config.headers['X-Access-Token'] && localStorage.getItem('token')) {

        config.headers['X-Access-Token'] = localStorage.getItem('token')
    }

    // 添加cancelToken
    config.cancelToken = new cancelToken((c)=>{
        Vue.prototype.queue.push({ cancel: c });
    });

    return config;

}, (error) => {
    console.error('错误的传参');

    return Promise.reject(error);
});


// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((response) => {

    if(response.data.code == '000000'){

        return response.data.result;

    }
    else if(typeof response.data.code !=='undefined' && response.data.code !== '000000'){

        return Promise.reject(response.data)
    }
    else{
        return response.data;
    }

}, (error) => {
    if (error.response) {

        if (error.response.status == 401) {
            // router.push('/login')
            window.location.href = REQUEST_CFG.LOGIN_PAGE_PATH;
        }
        else if (error.response.status == 403) {

            if (localStorage.length == 0) {

                alert('NotLogin, 获取权限失败，请重新登录');
            }
            // router.push('/login')
            window.location.href = REQUEST_CFG.LOGIN_PAGE_PATH;

        }
        else if (error.response.status == 415) {

            console.warn('请求无法处理，请求方式不正确 或 Content-Type不正确！');
        }

        console.warn('网络异常或接口调取失败！', 'Error API -> ' + (error.response ? error.response.config.url.replace(error.response.config.baseURL, '') : ''));

    } else {

        console.log(error.message);
    }
    return Promise.reject(error);
});
let http = {}

function _buildUrl(url, data) {

    let path = new String(url);

    path = path.replace(/{([\w-]+)}/g, (fullMatch, key) => {

        let value;
        if (data.hasOwnProperty(key)) {

            value = _paramToString(data[key]) || '';

        } else {

            value = '';

            console.warn(`${path}>>> 缺少参数 -> ${key}`);
        }

        return encodeURIComponent(value);
    });

    return path;
};

function _paramToString(param) {

    if (param === undefined || param === null) {

        return '';
    }
    if (param instanceof Date) {

        return param.toJSON();
    }

    return param.toString();
};
for (let module in api) {
    for (let i in api[module]) {

        if (!http[module]) {
            http[module] = {}
        }
        http[module][i] = ((opt) => {

            let urlStr = opt.url,
                method = (opt.method || 'post').toLowerCase(),
                params = opt.params || [],
                contentType = opt.contentType || 'application/x-www-form-urlencoded'

            return (args = {}) => {

                let url = _buildUrl( urlStr , args );
                let _params = new Map(),dataParam;
                params.forEach(item=>{
                    if(typeof args[item] === 'undefined'){
                        args[item] = ''
                        console.warn(`${url}>>> 缺少参数 -> ${item}`)
                    }
                    _params.set(item, args[item])
                })

                if (contentType === 'application/x-www-form-urlencoded') {
                    dataParam=[..._params].map(item=>{
                        return item.join('=')
                    }).join('&')

                }
                else if(contentType === 'application/json'){
                    let obj = {};
                    _params.forEach((item,index)=>{
                        obj[index] = item
                    })
                    dataParam = obj
                }
                return axios({
                    method: method,
                    url: url,
                    data: dataParam,
                    headers: {
                        'content-type': contentType,
                    }
                });

            }
        })(api[module][i])
    }
}

export default http
