
import api from '../api/index'
import { REQUEST_CFG } from '../api/config'

class Api{
    constructor(){
        this._params = {
            mode:'cors',
            credentials:'include',
            headers:{}
        }
    }
    _init(filePath,name,payload={}){
        // let a = {}             // 请求
        let _opt = api[filePath][name]                    //  获取请求对象

        this._params.method = _opt.method.toLowerCase()             //  请求方法

        this._params.headers[REQUEST_CFG.TOKEN] = localStorage.getItem('token');   //  请求token方式

        let url = REQUEST_CFG.BASE_URL + _opt.url          //  请求url地址
        if(this._params.method === 'get'){
            url = this._buildUrl(url , payload);
        }
        else{
            let _type = _opt.contentType  || 'application/json';    //  请求Content-type方式
            this._params.headers['Content-type'] = _type
            // let _p = _opt.params

            if(_type === 'application/json'){
                this._params.body = JSON.stringify(payload)
            }
            else if(_type === 'application/x-www-form-urlencoded'){
                let arr = _opt.params
                let map = new Map()
                arr.forEach(item=>{
                    map.set(item,payload[item])
                })
                this._params.params = [...map].map(item=>{
                    return item.join('=')
                }).join('&')
            }
        }

        return this._h(url,this._params)
    }
    _buildUrl(url, data) {
        let path = new String(url);
        path = path.replace(/{([\w-]+)}/g, (fullMatch, key) => {
            let value;
            if (data.hasOwnProperty(key)) {
                value =this._paramToString(data[key]) || '';
            } else {
                value = '';
                console.warn(`${path}>>> 缺少参数 -> ${key}`);
            }
            return encodeURIComponent(value);
        });
        return path;
    }
    _paramToString(param) {
        if (param === undefined || param === null) {
            return '';
        }
        if (param instanceof Date) {
            return param.toJSON();
        }
        return param.toString();
    };

    checkStatus(response) {
        if(response.status === 200 || response.status === 304){
            return response
        }
        if(response.status === 401 || response.status === 403){
            // window.location.href = REQUEST_CFG.LOGIN_PAGE_PATH;
        }
        else if(response.status === 415){
            console.warn('请求无法处理，请求方式不正确 或 Content-Type不正确！');
        }
        else{
            let error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    parseJSON(response) {
        return response.json()
    }

    _h(url,a){
        return new Promise((resolve, reject)=>{
            fetch(url,a)
                .then(this.checkStatus)
                .then(this.parseJSON)
                .then(res=>{
                if(res.code === '000000'){
                   resolve(res.result)
                }
                else{
                   reject(res.msg)
                }
            })
        })
    };
}
export default new Api()
