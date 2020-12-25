import request from '@/utils/request'
import config from '@/configs/index'
import contentType from '@/configs/content-type'
import {
	bSearch,
	bBatchDelete,
	bEdit,
	bDetail,
	bExportExcel,
	bExportExcelByIds,
	bGetExcelTemplate,
	bImported,
} from '@/api/baseCURD'

const reqPath = config.headerApi + '/_ActionLog/'
const API = {
	// 列表查询
	Search: (data) => {
		return bSearch(reqPath, data)
	},
	// 批量删除
	BatchDelete: (data) => {
		return bBatchDelete(reqPath, data)
	},
	// 详情
	Detail: (id) => {
		return bDetail(reqPath, id)
	},
	//导出excel
	ExportExcel: (data) => {
		return bExportExcel(reqPath,data)
	},
	ExportExcelByIds: (data) => {
		return bExportExcelByIds(reqPath, data)
	},
	GetExcelTemplate: (data) => {
		return bGetExcelTemplate(reqPath, data)
	},
	//导入
	Imported: (data) => {
		return bImported(reqPath, data)
	},
}
export default API
