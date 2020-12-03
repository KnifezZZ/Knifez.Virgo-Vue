
import request from '@/utils/request'
import config from "@/configs/index";
import contentType from "@/configs/content-type";
const reqPath = config.headerApi + "/_login/";
export function checkLogin (data) {
    return request({
        url: reqPath + '/CheckLogin/{ID}',
        method: 'get',
        data: data,
    })
}
export function login (data) {
    return request({
        url: reqPath + '/_login/login',
        method: 'post',
        contentType: contentType.form,
        data: data,
    })
}