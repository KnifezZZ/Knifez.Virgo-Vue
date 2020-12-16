import request from '@/utils/request'
import config from '@/configs/index'
import contentType from '@/configs/content-type'
const reqPath = config.headerApi + '/_FrameworkUserBase/'

export function Search(data) {
	return request({
		url: reqPath + 'Search',
		method: 'post',
		data: data,
	})
}

export function BatchDelete(data) {
	return request({
		url: reqPath + 'BatchDelete',
		method: 'post',
		data: data,
	})
}

export function ExportExcel(data) {
	return request({
		url: reqPath + 'ExportExcel',
		method: 'post',
		contentType: contentType.stream,
		data: data,
	})
}
export function ExportExcelByIds(data) {
	return request({
		url: reqPath + 'ExportExcelByIds',
		method: 'post',
		contentType: contentType.stream,
		data: data,
	})
}
