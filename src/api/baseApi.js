import request from '@/utils/request'
import config from "@/configs/index";
import contentType from "@/configs/content-type";
const reqPath = config.headerApi;
export function checkLogin () {
    return request({
        url: reqPath + '/_file/Upload',
        method: 'post',
    })
}