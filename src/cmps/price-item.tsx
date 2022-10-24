import { utilService } from "../services/util.service"
import { IItem } from "../interfaces/interfaces"
import { toJS } from "mobx"

export const PriceItem = ({ price, idx }: { price: IItem; idx: number }) => {

	return (
		<tr className={`price-item`}>
			{/* <td className='item-number center small'>{price.ItemCode._text}</td> */}
			<td className='item-number center'>{price.ItemName._text}</td>
			{/* <td className='item-number center small'>{price.ManufacturerName._text}</td> */}
			{/* <td className='item-number center small'>{`${price.Quantity._text} ${price.UnitQty._text}`}</td> */}
			<td className='item-number center small'>{price.ItemPrice._text}</td>
			<td className='item-number center'>{price?.promotion[0]?.PromotionDescription._text}</td>
		</tr>
	)
}
