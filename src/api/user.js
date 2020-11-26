
import request from '@/utils/request'
import config from "@/configs/index";
const reqPath = config.headerApi + "/_login/";
export function checkLogin (data) {
    return request({
        url: reqPath + '/CheckLogin/{ID}',
        method: 'get',
        data: data,
    })
}