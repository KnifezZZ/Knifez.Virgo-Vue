
import request from '@/utils/request'
import config from "@/configs/index";
import contentType from "@/configs/content-type";
const reqPath = config.headerApi + "/_account";
export function checkLogin (ID) {
    return request({
        url: reqPath + '/CheckUserInfo',
        method: 'get',
    })
}
export function login (data) {
    return request({
        url: reqPath + '/login',
        method: 'post',
        contentType: contentType.form,
        data: data,
    })
}