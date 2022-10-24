import { useContext } from "react"
import { observer } from "mobx-react"
import { StoreContext } from "../App"

import { utilService } from "../services/util.service"
import { Card } from "./template/card"

const PriceCards = () => {
	const priceStore = useContext(StoreContext)
	const items = priceStore.getItems

	console.log("Rendering PriceCards", items.length)

	return (
		<section className='price-cards'>
			<div className='card-container'>
				{/* <Card title={"Prices Malfunction"} value={utilService.getList(items, "malfunction")} />
				<Card title={"Prices Airborne"} value={utilService.getList(items, "airborne")} />
				<Card title={"Prices Hangar"} value={utilService.getList(items, "hangar")} />
				<Card title={"Prices Delay"} value={utilService.getList(items, "delay")} /> */}
			</div>
		</section>
	)
}

export default observer(PriceCards)
