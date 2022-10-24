import { useContext } from "react"
import { observer } from "mobx-react"
import { StoreContext } from "../App"

import { PriceItem } from "./price-item"

const PriceList = () => {
	const priceStore = useContext(StoreContext)
	const listItems = priceStore.getItemsFromLocalStorage

	const renderList = (): JSX.Element[] => {

		return listItems.map((price, idx) => {
			return <PriceItem key={idx} idx={idx} price={price} />
		})
	}

	console.log("Rendering PriceList", listItems.length)

	return (
		<section className='price-list'>
			<table>
				<thead>
					<tr>
						{/* <th>ברקוד</th> */}
						<th>שם מוצר</th>
						{/* <th>יצרן</th> */}
						{/* <th>כמות</th> */}
						<th>מחיר</th>
						<th>מבצע</th>
					</tr>
				</thead>
				<tbody>{listItems && renderList()}</tbody>
			</table>
		</section>
	)
}

export default observer(PriceList)
