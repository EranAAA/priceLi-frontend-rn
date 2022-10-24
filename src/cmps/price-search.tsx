import { useContext } from "react"
import { observer } from "mobx-react"
import { StoreContext } from "../App"

import { Select } from "./mui/select"
import { BasicTextField } from "./mui/text-field"

import { IItemFilter } from "../interfaces/interfaces"
import { utilService } from "../services/util.service"

export const PriceSearch = ({ getFilterdPrices }: { getFilterdPrices: (filter: IItemFilter) => void }) => {
	const priceStore = useContext(StoreContext)
	const prices = priceStore.getItems

	console.log("Rendering PriceSearch", prices.length)

	return (
		<section className='price-search'>
			<BasicTextField getFilterdPrices={getFilterdPrices} />
			<div className='select'>
				{/* <Select label={"Origin"} list={utilService.getDistinctList("takeoffAirport", prices)} getFilterdPrices={getFilterdPrices} /> */}
				{/* <Select label={"Destination"} list={utilService.getDistinctList("landingAirport", prices)} getFilterdPrices={getFilterdPrices} /> */}
			</div>
		</section>
	)
}

export default observer(PriceSearch)

