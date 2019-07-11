


import api from '../api'
export default function func(){


    console.log('api======>',api)

}



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
let http = {}
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
                    dataParam = JSON.stringify(obj)
                }
                return fetch({
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

// export default http
