export interface IItemFilter {
	priceNumber?: string
	takeoffAirport?: string
	landingAirport?: string
}

export interface IItem {
	_id: string
	PriceUpdateDate: { _text: string }
	ItemCode: { _text: string }
	ItemType: { _text: string }
	ItemName: { _text: string }
	ManufacturerName: { _text: string }
	ManufactureCountry: { _text: string }
	ManufacturerItemDescription: { _text: string }
	UnitQty: { _text: string }
	Quantity: { _text: string }
	UnitOfMeasure: { _text: string }
	bIsWeighted: { _text: string }
	QtyInPackage: { _text: string }
	ItemPrice: { _text: string }
	UnitOfMeasurePrice: { _text: string }
	AllowDiscount: { _text: string }
	ItemStatus: { _text: string }
	ItemId: { _text: string }
	promotion: IPromo[]
}

export interface IPromo {
	PromotionDescription: { _text: string }
	DiscountRate: { _text: string }
	MinQty: { _text: string }
	PromotionStartDate: { _text: string }
	PromotionEndDate: { _text: string }

}
