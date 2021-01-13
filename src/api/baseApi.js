import request from '@/utils/request'
import config from '@/configs/index'
import contentType from '@/configs/content-type'
const reqPath = config.headerApi
export function upload() {
	return request({
		url: reqPath + '/_file/Upload',
		method: 'post',
	})
}

export function getFilePath(id) {
	return request({
		url: reqPath + '/_file/GetFilePath/' + id,
		method: 'get',
	})
}

export function getFileModel(id) {
	return request({
		url: reqPath + '/_file/GetFileModel/' + id,
		method: 'get',
	})
}

export function deleteFile(id) {
	return request({
		url: reqPath + '/_file/DeletedFile',
		method: 'delete',
		data: {
			id: id,
		},
	})
}
