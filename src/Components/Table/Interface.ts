interface ITableData {
	headers?: string[]
	rows?: IRow[]
}

export interface IRow {
	/** The row ID is used for selections. It must be unique throughout the entire table if selections are turned on. */
	id?: any
	/** Data object that is bound to the row. This is used, for example, when filtering data using a provided function. */
	data?: any
	/** These styles will be applied inline to the tr element */
	style?: string
	/** Cells of the row */
	cells: ICell[]
	/** Child rows that will be rendered as a hierarchy */
	children?: IRow[]
	/** If a particular row is not selectable it can be configured by setting this to false */
	selectable?: boolean
	/** Click listener for the tr element */
	onClick?: (row: IRow) => void
}

interface ICell {
	/** Cell value type */
	type?: "text" | "function" | "unsafehtml"
	/** The actual value to be written to the cell */
	value: string | (() => HTMLElement)
	/** Colspan for the td element */
	colspan?: number
	/** If an icon URL is provided it will be prepended the other user content */
	icon?: string
	/** Click listener for the td element */
	onClick?: (cell: ICell) => void
}
