import axios from 'axios'
//导入 nprogress
import NProgress from "nprogress"
//导入 nprogress样式
import 'nprogress/nprogress.css'


const request = axios.create({
    baseURL: 'http://localhost:9090',
    //请求超时时间
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    NProgress.start();
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let User = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null
    //设置请求头
    if (User) {
        config.headers['token'] = User.token;
    }
    return config
}, error => {
    NProgress.done();
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        NProgress.done();
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // 当权限验证不通过的时候给出提示
        if (res.code === '401') {
            // ElementUI.Message({
            //     message: res.msg,
            //     type: 'error'
            // });
            router.push("/EnterpriseLogin")
        }
        return res;
    },
    error => {
        NProgress.done();
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request

