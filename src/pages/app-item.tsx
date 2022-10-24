// import { toJS } from "mobx"
// import { observer } from "mobx-react"
// import { useContext } from "react"
// import { StoreContext } from "../App"
// import PriceSearch from "../cmps/price-search"

// import { IItemFilter } from "../interfaces/interfaces"

// const AppItem = () => {
// 	const priceStore = useContext(StoreContext)
// 	const items = priceStore.getItems

// 	console.log("Rendering AppItem")

// 	const getFilterdPrices = (filter: IItemFilter): void => {
// 		priceStore.setFilter(filter)
// 	}

// 	console.log(toJS(items))

// 	return (
// 		<section className='app-item'>
// 			{/* <PriceSearch getFilterdPrices={getFilterdPrices} /> */}

// 			<div className='img'>
// 				<img src={`https://img.rami-levy.co.il/product/${items[0]?.ItemCode._text}/small.jpg`} alt='' />
// 			</div>

// 			<div className='item-container'>
// 				<p className='manufacturer'> {!!items.length ? items[0]?.ManufacturerName._text : "אין מידע"}</p>
// 				<p className='name'> {!!items.length && items[0]?.ItemName._text}</p>
// 				<p className='code'> ברקוד {!!items.length && items[0]?.ItemCode._text}</p>
// 				<p className='price'>
// 					<span>{!!items.length && items[0]?.ItemPrice._text}</span> <span className='symbol'>₪</span>{" "}
// 				</p>

// 				<p className='quantity'>
// 					<span>כמות: </span>
// 					{`${!!items.length && items[0]?.Quantity._text}`} {!!items.length && items[0]?.UnitQty._text}
// 				</p>
// 				<br />

// 				<span>מבצע: </span>
// 				<p className=''> {!!items.length && items[0]?.promotion[0]?.PromotionDescription._text}</p>
// 				<p className=''> {!!items[0]?.promotion[0]?.DiscountRate && parseInt(items[0]?.promotion[0]?.DiscountRate._text) / 100}%</p>
// 				<p className=''> כמות מינמלית {!!items.length && items[0]?.promotion[0]?.MinQty._text}</p>
// 				<p className=''>{`${!!items.length && items[0]?.promotion[0]?.PromotionEndDate._text} - ${!!items.length && items[0]?.promotion[0]?.PromotionStartDate._text}` }</p>
// 				<br />
// 			</div>
// 		</section>
// 	)
// }

// export default observer(AppItem)
