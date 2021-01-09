import request from '@/utils/request'
import config from '@/configs/index'
import contentType from '@/configs/content-type'
const reqPath = config.headerApi + '/_FrameworkRole/'
import {
	bSearch,
	bBatchDelete,
	bAdd,
	bEdit,
	bDetail,
	bExportExcel,
	bExportExcelByIds,
	bGetExcelTemplate,
	bImported,
} from '@/api/baseCURD'
const apiEvents = {
	// 列表查询
	search(data) {
		return bSearch(reqPath, data)
	},
	// 批量删除
	batchDelete(data) {
		return bBatchDelete(reqPath, data)
	},
	// 新增
	add(data) {
		return bAdd(reqPath, data)
	},
	// 修改
	edit(data) {
		return bEdit(reqPath, data)
	},
	// 详情
	detail(id) {
		return bDetail(reqPath, id)
	},
	//导出excel
	exportExcel(data) {
		return bExportExcel(reqPath,data)
	},
	exportExcelByIds(data) {
		return bExportExcelByIds(reqPath, data)
	},
	getExcelTemplate(data) {
		return bGetExcelTemplate(reqPath, data)
	},
	//导入
	imported(data) {
		return bImported(reqPath, data)
	},
}
export default apiEvents
