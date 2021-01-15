import config from '@/configs/index'
import contentType from '@/configs/content-type'
const reqPath = config.headerApi + '/_FrameworkUserBase/'

const actions = {
	// 列表查询
	Search: {
		url: reqPath + 'Search',
		method: 'post',
	},
	// 批量删除
	BatchDelete: {
		url: reqPath + 'BatchDelete',
		method: 'post',
	},
	Add: {
		url: reqPath + 'Add',
		method: 'post',
	},
	// 修改
	Edit: {
		url: reqPath + 'Edit',
		method: 'put',
	},
	// 详情
	Detail: {
		url: reqPath + '{id}',
		method: 'get',
	},
	//导出excel
	ExportExcel: {
		url: reqPath + 'ExportExcel',
		method: 'post',
		contentType: contentType.stream,
	},
	ExportExcelByIds: {
		url: reqPath + 'ExportExcelByIds',
		method: 'post',
		contentType: contentType.stream,
	},
	GetExcelTemplate: {
		url: reqPath + 'GetExcelTemplate',
		method: 'get',
		contentType: contentType.stream,
	},
	//导入
	Imported: {
		url: reqPath + 'Import',
		method: 'post',
	},
	GetFrameworkRoles: {
		url: reqPath + 'GetFrameworkRoles',
		method: 'get',
	},
	GetFrameworkGroups: {
		url: reqPath + 'GetFrameworkGroups',
		method: 'get',
	},
}
export default actions
