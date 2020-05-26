/**
 * @description axios封装
 * @author WXF
 * @update 2019-06-20
 */
import axios from 'axios'
import qs from 'qs'
import router from '../router';
import {dialog} from './dialog.js';
import {showLoading, hideLoading} from './loading.js';



// axios基本配置
// axios.defaults.baseURL = `${process.env.BASE_API}`;
// axios.defaults.timeout = 10000;

// 响应拦截器
axios.interceptors.request.use(
    config => {
        // 在get请求的参数中加上一个随机参数
        if (config.method === 'get') {
            let random = Math.random();
            if (config.params) {
                config.params.r = random;
            } else {
                config.params = {
                    r: random
                }
            }
            ;
        }
        // POST传参序列化(添加请求拦截器，与Content-Type配合使用，如Content-Type=application/json,则无需序列化)
        if (config.method === 'post' && config.headers['Content-Type'] == 'application/x-www-form-urlencoded; charset=UTF-8') {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应数据拦截
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * Content-Type
 * @param {Object} types 类型
 */
function dataFormatType(type) {
    let dataFormat = "";
    if (!type) {
        dataFormat = "application/x-www-form-urlencoded; charset=UTF-8";
    } else if (type == 'json') {
        dataFormat = "application/json; charset=UTF-8";
    }
    return dataFormat;
}

/**
 * 请求方法封装
 * @param {Object} method 请求方式
 * @param {Object} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} type 请求类型
 */
export default function xhr(params) {
    return new Promise((resolve, reject) => {
        let url = process.env.NODE_ENV === 'development' ?
            `api/${params.url}` : `papersearch/customer-service/${params.url}`;
        axios({
            method: params.method,
            url: url,
            params: params.datas,
            data: params.data,
            headers: {
                "Content-Type": dataFormatType(params.type),
            }
        }).then(
            response => {
                if (response.data.success && response.data.code === 'SUCCESS') {
                    resolve(response.data);
                } else {
                    resolve(response.data);
                    dialog.error(response.data.msg);
                }
            },
            error => {
                reject(error);
            }
        );
    });
}
