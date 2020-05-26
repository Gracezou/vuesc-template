import axios from 'axios'
import { Message } from 'element-ui'
import { Loading } from 'element-ui'

let http = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    transformRequest: [
        function(data) {
            return data
        }
    ]
})

/**
 * ajax 异步请求封装方法
 * @param {请求方式} method String
 * @param {路径} url String
 * @param {参数} params Object
 * @param {成功回调函数} successHandler Function
 * @param {失败回调函数} errorHandler Function
 */
var fetch = (method, url, params) =>
    new Promise((resolve, reject) => {
        let loading = Loading.service({
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.1)'
        })
        http({
            method: method.toUpperCase(),
            url: url,
            data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
            // params: method === 'GET' || method === 'DELETE' ? JSON.stringify(params)  : null,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => {
                if (res.status == 200) {
                    loading.close()
                    resolve(res.data)
                }
            })
            .catch(e => {
                let res = e.response
                let message = res.data.message
                loading.close()
                switch (res.status) {
                    case 500:
                        Message.error({
                            message: '服务器响应失败',
                            showClose: true
                        })
                        break
                    case 400:
                        Message.error({
                            message: message,
                            showClose: true
                        })
                        break
                    case 404:
                        Message.error({
                            message: '服务器找不到该页面',
                            showClose: true
                        })
                        break
                    case 403:
                        Message.error({
                            message: '没权限访问该页面',
                            showClose: true
                        })
                        break
                    default:
                        Message.error({
                            message: '服务器响应失败, 请重新操作',
                            showClose: true
                        })
                }
                reject(res)
            })
    })

export default {
    get: url =>
        new Promise((resolve, reject) =>
            fetch('GET', url, {})
                .then(res => resolve(res))
                .catch(err => reject(err))
        ),
    post: (url, params) =>
        new Promise((resolve, reject) =>
            fetch('POST', url, params)
                .then(res => resolve(res))
                .catch(err => reject(err))
        ),
    put: (url, params) =>
        new Promise((resolve, reject) =>
            fetch('PUT', url, params)
                .then(res => resolve(res))
                .catch(err => reject(err))
        ),
    delete: url =>
        new Promise((resolve, reject) =>
            fetch('DELETE', url, {})
                .then(res => resolve(res))
                .catch(err => reject(err))
        )
}
