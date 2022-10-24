import { useContext } from "react"
import { StoreContext } from "../App"

import { IItemFilter } from "../interfaces/interfaces"

import { PriceHeader } from "../cmps/price-header"
import PriceCards from "../cmps/price-cards"
import PriceSearch from "../cmps/price-search"
import PriceList from "../cmps/price-list"
import Pagination from "../cmps/mui/pagination"
import Notistack from "../cmps/mui/notistack"

const AppPrice = () => {
	const priceStore = useContext(StoreContext)

	const getFilterdPrices = (filter: IItemFilter): void => {
		priceStore.setFilter(filter)
	}

	const getSelectedPage = (page: number): void => {
		priceStore.setPaging(page)
	}

	console.log("Rendering AppPrice")

	return (
		<section className='app-price'>
			{/* <PriceHeader /> */}
			{/* <PriceCards /> */}
			<PriceSearch getFilterdPrices={getFilterdPrices} />
			<PriceList />
			<Pagination getSelectedPage={getSelectedPage} />
			<Notistack />
		</section>
	)
}

export default AppPrice
