import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// table data转tree格式
export function getTreeData(list, parentCol, idCol) {
	const getChildren = (pid, children = []) => {
		list
			.filter((x) => x[parentCol] == pid)
			.map((item) => {
				const itemChild = getChildren(item[idCol], item.children)
				if (itemChild.length === 0) {
					children.push(item)
				} else {
					children.push({ ...item, children: itemChild })
				}
			})
		return children
	}
	let tree = getChildren(null)
	// if (list.length > 0 && tree.length == 0) {
	// 	tree = getChildren('')
	// }
	return tree
}

export function getTreeNode(tree, parentCol, idCol, nodeValue) {
	const getNode = (treeData, node = {}) => {
		if (treeData == undefined) {
			return {}
		}
		treeData.forEach((element) => {
			if (element[idCol] === nodeValue) {
				node = element
			} else {
				if (element.children !== undefined) {
					node = getNode(element.children)
				}
			}
		})
		return node
	}
	let node = getNode(tree)
	return node
}

// 加載json配置文件
// export function loadJson(reqPath) {
// 	let domain = localStorage.getItem('domain')
// 	if (domain === null) domain = 'default'
// 	return new Promise((resolve, reject) => {

// 		axios({
// 			method: 'get',
// 			url: `static/configs/${domain}/${reqPath}.json`,
// 			dataType: 'json',
// 			crossDomain: true,
// 			cache: false,
// 		})
// 			.then((res) => {
// 				resolve(res.data)
// 			})
// 			.catch((error) => {
// 				reject(error)
// 			})
// 	})
// }
