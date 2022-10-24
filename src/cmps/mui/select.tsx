import * as React from "react"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import { IItemFilter } from "../../interfaces/interfaces"

interface IProps {
	label: string
	list: { value: string; label: string }[]
	getFilterdPrices: (filter: IItemFilter) => void
}

export const Select = ({ label, list, getFilterdPrices }: IProps) => {
	const [item, setItem] = React.useState("")

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setItem(target.value)
		if (label === "Origin") getFilterdPrices({ takeoffAirport: target.value })
		else if (label === "Destination") getFilterdPrices({ landingAirport: target.value })
	}

	return (
		<Box component='form' sx={{ "& .MuiTextField-root": { m: 1, width: "18ch" } }} noValidate autoComplete='off'>
			<TextField
				select
				label={label}
				value={item}
				onChange={handleChange}
				variant='standard'
				sx={{ "& > :not(style)": { fontSize: "0.9rem", fontWeight: "900", fontFamily: "Mukta, sans-serif" } }}
			>
				{list &&
					list.map((option, idx) => (
						<MenuItem key={idx} value={option.value} sx={{ fontWeight: "900", fontSize: "0.9rem", fontFamily: "Mukta, sans-serif" }}>
							{option.label}
						</MenuItem>
					))}
			</TextField>
		</Box>
	)
}
