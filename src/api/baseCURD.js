import request from '@/utils/request'
import axios from 'axios'
import contentType from '@/configs/content-type'
// 列表查询
export function bSearch(reqPath, data) {
	return request({
		url: reqPath + 'Search',
		method: 'post',
		data: data,
	})
}
// 修改
export function bAdd(reqPath, data) {
	return request({
		url: reqPath + 'Add',
		method: 'post',
		data: data,
	})
}
// 批量删除
export function bBatchDelete(reqPath, data) {
	return request({
		url: reqPath + 'BatchDelete',
		method: 'post',
		data: data,
	})
}
// 修改
export function bEdit(reqPath, data) {
	return request({
		url: reqPath + 'Edit',
		method: 'put',
		data: data,
	})
}
// 详情
export function bDetail(reqPath, id) {
	return request({
		url: reqPath + id,
		method: 'get',
	})
}

//导出excel
export function bExportExcel(reqPath, data) {
	return request({
		url: reqPath + 'ExportExcel',
		method: 'post',
		contentType: contentType.stream,
		data: data,
	})
}
export function bExportExcelByIds(reqPath, data) {
	return request({
		url: reqPath + 'ExportExcelByIds',
		method: 'post',
		contentType: contentType.stream,
		data: data,
	})
}
export function bGetExcelTemplate(reqPath, data) {
	return request({
		url: reqPath + 'GetExcelTemplate',
		method: 'get',
		contentType: contentType.stream,
		data: data,
	})
}
//导入
export function bImported(reqPath, data) {
	return request({
		url: reqPath + 'Import',
		method: 'post',
		data: data,
	})
}
// 加載json配置文件
export function loadJson(reqPath) {
	let domain = localStorage.getItem('domain')
	if (domain === null) domain = 'default'
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: `static/configs/${domain}/${reqPath}.json`,
			dataType: 'json',
			crossDomain: true,
			cache: false,
		})
			.then((res) => {
				resolve(res.data)
			})
			.catch((error) => {
				reject(error)
			})
	})
}
