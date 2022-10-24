import { useContext } from "react"
import { StoreContext } from "../App"

import { IItemFilter } from "../interfaces/interfaces"

import { CameraHandler } from "../cmps/video/camera-handler"

const AppBarCode = () => {
	const priceStore = useContext(StoreContext)

	const getFilterdPrices = (filter: IItemFilter): void => {
		priceStore.setFilter(filter)
	}

	console.log("Rendering AppBarCode")

	return (
		<section className='app-barcode'>
			<CameraHandler getFilterdPrices={getFilterdPrices}/>
		</section>
	)
}

export default AppBarCode
