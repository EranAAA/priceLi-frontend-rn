import React, { useContext, useState } from "react"
import { StoreContext } from "../../App"

import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { observer } from "mobx-react"

const BasicPagination = ({ getSelectedPage }: { getSelectedPage: (page: number) => void }) => {
	const priceStore = useContext(StoreContext)
	const pages = priceStore.getPages

	const [page, setPage] = useState(1)

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
		getSelectedPage(value)
	}

	console.log("Rendering Pagination", pages)

	return (
		<div className='pagination'>
			<Stack>
				<Pagination count={pages} color='primary' page={page} onChange={handleChange} />
			</Stack>
		</div>
	)
}

export default observer(BasicPagination)
