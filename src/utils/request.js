/**
 * server封装，所有请求都走这里
 * option = {
 *      url:请求地址
 *      method: 'post' // 请求方式，post\get\put\delete
 *      data: {}, // 参数
 * }
 * _request(option)
            .then(data => {
                console.log('then', data);
            })
            .catch(data => {
                console.log('catch', data);
            });
 */

import axios from "axios";
import contentType from '@/configs/content-type';
import AppModule from "@/store/modules/app";
import { isArray } from "./validate";
import { notification } from "ant-design-vue";

class requestBase {
    constructor() { }
    /**
     * 请求参数类型
     * @param originalData
     */
    requestData (originalData = {}) {
        const data = originalData;
        if (isArray(originalData)) {
            for (const key in originalData || {}) {
                if (
                    originalData[key] !== null &&
                    originalData[key] !== undefined &&
                    originalData[key] !== ""
                ) {
                    data[key] = originalData[key];
                }
            }
        }
        return data;
    }
    /**
     * Transform 请求
     */
    transformReq () {
        return [
            function (data) {
                let ret = "";
                for (const it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                if (ret !== "") {
                    ret = ret.substr(0, ret.length - 1);
                }
                return ret;
            }
        ];
    }
    /**
     * formdata请求
     * @param url
     * @param option
     * @param configs
     */
    serviceFormData (url, option, configs) {
        const datas = new FormData();
        option.data.mapKeys((value, key) => {
            datas.append(key, value);
        });
        return axios
            .post(url, datas, { headers: configs, responseType: "arraybuffer" })
            .then(response => response.data)
            .catch(errors => console.error(errors));
    }
    /**
     * 替换模块{}
     * @param url
     * @param param
     */
    paramTemplate (url, param) {
        if (typeof param === "object" &&
            /{([\s\S]+?)}/g.test(url)
        ) {
            url = url.template({ interpolate: /{([\s\S]+?)}/g })(param);
        }
        return url;
    }
    /**
     * 错误信息
     *
     *  if (res.response && res.response.status === 400) {
          msg = res.response.data.Message[0];
        }
     */
    requestError (error) {
        let msg = '接口请求异常'
        const { response, message } = error
        if (response && response.data) {
            debugger
            //const { status, data } = response

        } else {
            if (message === 'Network Error') {
                msg = '接口连接异常'
            }
            if (message.includes('timeout')) {
                msg = '接口请求超时'
            }
            if (message.includes('Request failed with status code')) {
                const code = message.substr(message.length - 3)
                msg = '接口请求' + response.status
            }
            notification.error({
                message: msg,
                description: message
            })
        }
    }
}

const rBase = new requestBase();

const _request = (option, serverHost) => {
    let url = serverHost ? serverHost : "" + option.url;
    url = rBase.paramTemplate(url, option.data);
    const axiosReq = {
        method: option.method,
        url: url,
        data: {},
        params: {},
        headers: {
            "Content-Type": option.contentType || contentType.json,
            "Accept-Language": AppModule.language
        }
    };
    const data = rBase.requestData(option.data);
    if (["POST", "PUT"].includes(option.method.toUpperCase())) {
        axiosReq.data = data;
    } else {
        axiosReq.params = data;
    }

    if (option.contentType === contentType.stream) {
        axiosReq["responseType"] = "blob";
        axiosReq.data = option.data;
    } else if (option.contentType === contentType.multipart) {
        return rBase.serviceFormData(url, option, axiosReq.headers);
    } else if (option.contentType === contentType.form) {
        axiosReq["transformRequest"] = rBase.transformReq();
    }

    return axios({ ...axiosReq })
        .then(res => {
            if (option.contentType === contentType.stream) {
                return res;
            }
            return res.data;
        })
        .catch(error => {
            rBase.requestError(error);
            throw error;
        });
};
export default _request;
