/*
 * @Description: 全局路由
 * @Date: 2020-03-19 15:20:13
 */
import Vue from 'vue';
import axios from 'axios';
// import { Loading } from 'element-ui';
// import store from '../store';
import qs from 'qs';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// let loadingInstance;
const config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000 // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        config.headers = config.headers || {};
        // const token = JSON.parse(localStorage.getItem('token')).token;
        // if (token) {
        //     config.headers.common['token'] = token;
        // }
        // Do something before request is sent
        if (config.method === 'post') {
            config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            config.headers.formdata = '1';
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    function(error) {
    // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
_axios.interceptors.response.use(
    response => {
    // 跳转到登录地址
        if (response.headers.trsnotlogin) {
            const addr = response.headers.idsloginurl;
            const surl = response.headers.surl.replace(/(\w+):\/\/([^/:]+)(:\d*)?/, window.location.origin);
            let curUrl = window.btoa(window.location.href);
            curUrl = window.btoa(surl + curUrl);
            window.location.href = addr + curUrl;
        }

        // 错误处理
        if (response.data.status === '-1' && response.data.message) {
            Vue.prototype.$message('error', response.data.message);
        } else if (response.data.ISSUCCESS === 'false') {
            Vue.prototype.$draftMessage(response.data.TITLE, response.data.REPORTS);
        }
        return response.data;
    },
    function(error) {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误，未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
        } else {
            error.message = '连接服务器失败';
        }
        Vue.prototype.$message('error', error.message);
        // Do something with response error
        return Promise.reject(error);
    },
);

const Plugin = {};

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);

export default Plugin;
