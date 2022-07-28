import http from '../utils/request/http.js'

const exportUrl = '/yqcar/shCar/carData' // 日报分页页面

//查询服务区基本信息
const baseInfo = function (url,params) {
    return http.get(url, params)
}

const getTable = function (params) {

    return http.post('/yqcar/qjcs/getNtData', params)
}




export default {
    baseInfo,
    getTable,
}
