import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { debounce } from "lodash"

import { IItemFilter } from "../../interfaces/interfaces"

export const BasicTextField = ({ getFilterdPrices }: { getFilterdPrices: (filter: IItemFilter) => void }) => {
	// eslint-disable-next-line
	const [item, setItem] = React.useState("")

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setItem(target.value)
		if (target.value.length > 12) getFilterdPrices({ priceNumber: target.value })
		// if (target.value.length === 0) getFilterdPrices({ priceNumber: "" })
	}

	const debouncedOnChange = debounce(handleChange, 1000)

	return (
		<Box dir="rtl" component='form' sx={{ "& > :not(style)": { m: 1, width: "50vw" } }} noValidate autoComplete='off'>
			<TextField
				id='standard-basic'
				dir="rtl"
				label='Add Item (BarCode)'
				variant='standard'
				inputProps={{ inputMode: 'numeric' }}
				sx={{ "& > :not(style)": { fontSize: "1rem", textAlign:'center', fontFamily: "Mukta, sans-serif" } }}
				onChange={debouncedOnChange}
			/>
		</Box>
	)
}
