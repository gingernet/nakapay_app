import axios from 'axios'
import router from 'vue-router'
// import store from './../store'

/**
 * 定义请求常量
 * TIME_OUT、ERR_OK
 */
export const TIME_OUT = 5000 // 请求超时时间
export const ERR_OK = true; // 请求成功返回状态，字段和后台统一

// 请求超时时间
axios.defaults.timeout = TIME_OUT

// 封装请求拦截
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        config.headers['Api-Token'] = 'nakapay-76358255-2095-4dd9-932c-274702f99435'
            // if (store.getToken) {
            //     config.headers['Authorization'] = store.getToken
            // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
    response => {
        const { data } = response
        if (data.responseCode === 202) { // 如果后台返回的错误标识为token过期，则重新登录
            // token过期移除token
            // store.commit('setToken', null)
            // 进行重新登录操作
        } else {
            return Promise.resolve(data)
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                    // 403 token过期
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                case 403:
                    // var toast = Toast.$create({
                    //     txt: '登录过期，请重新登录',
                    //     mask: true
                    // })
                    // toast.show()
                    // 清除token
                    localStorage.removeItem('token')
                        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000)
                    break
                case 404:
                    // var toast = Toast.$create({
                    //     txt: '网络请求不存在',
                    //     mask: true
                    // })
                    // toast.show()
                    break
                    // 其他错误，直接抛出错误提示
                default:
                    // var toast = Toast.$create({
                    //     txt: error.response.data.message,
                    //     mask: true
                    // })
                    // toast.show()
            }
        }
        return Promise.reject(error.response)
    }
)
export default axios