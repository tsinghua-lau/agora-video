import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    // 公共接口
    baseURL:process.env.NODE_ENV == "development" ?  '/api' : 'https://zhfwq.jchc.cn/isa_server/',
    // 超时时间
    stimeout: 7 * 1000,
})
service.interceptors.request.use(
    config => {
        // config.data = JSON.stringify(config.data)
        // console.log('=========',config.data)
        config.headers = {
            'Content-Type': 'application/json;charset=utf-8', //配置请求头
            'Access-Control-Allow-Origin': '*',
            token: 1,
            unit: 1,
            busType: 1,
            processId: 1,
        }
        let token = process.env.VUE_APP_TESTTOKEN
        if (token) {
            config.headers['Access-Token'] = token
            config.headers.token = token //如果要求携带在请求头中
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error || error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
        } else {
            if (JSON.stringify(error).includes('timeout')) {
                error.message('服务器响应超时，请刷新当前页')
            }
            error.message('连接服务器失败')
        }
        return Promise.resolve(error.response)
    }
)
export default service
