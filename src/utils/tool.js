// table data转tree格式
export function getTreeData(list, parentCol, idCol,top) {
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
	let tree = getChildren(top)
	return tree
}
