interface ITableData {
	headers?: string[]
	rows?: IRow[]
}

interface IRow {
	id?: any
	data?: any
	style?: string
	cells: ICell[]
	children?: IRow[]
	treeText?: string
	treeIcon?: string
}

interface ICell {
	type?: "text" | "function" | "unsafehtml"
	value: string | (() => HTMLElement)
	colspan?: number
}
