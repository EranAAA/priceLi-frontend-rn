import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import CropFreeIcon from "@mui/icons-material/CropFree"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits"

export default function SimpleBottomNavigation() {
	const [value, setValue] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (!value) return
      
		navigate(`/${value}`)
	}, [value])

	console.log("Rendering SimpleBottomNavigation")
	
	return (
		<Box sx={{ width: '100vw' }}>
			<BottomNavigation showLabels value={value} onChange={(event, newValue) => setValue(newValue)}>
				<BottomNavigationAction label='Item' value={"item/0"} icon={<ProductionQuantityLimitsIcon />} />
				<BottomNavigationAction label='BarCode' value={"barcode"} icon={<CropFreeIcon />} />
				<BottomNavigationAction label='Cart' value={"cart"} icon={<ShoppingCartIcon />} />
			</BottomNavigation>
		</Box>
	)
}
