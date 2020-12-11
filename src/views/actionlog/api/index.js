import request from "@/utils/request"
import config from "@/configs/index"
import contentType from "@/configs/content-type"
const reqPath = config.headerApi + "/_ActionLog/"

export function Search(data) {
  return request({
    url: reqPath + "Search",
    method: "post",
    data: data,
  })
}

export function BatchDelete(data) {
  return request({
    url: reqPath + "BatchDelete",
    method: "post",
    data: data,
  })
}

export function ExportExcel(data) {
  return request({
    url: reqPath + "ExportExcel",
    method: "post",
    data: data,
  })
}
