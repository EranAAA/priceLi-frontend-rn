export interface IItemFilter {
	priceNumber?: string
	takeoffAirport?: string
	landingAirport?: string
}

export interface IItem {
	ItemCode: string
	AllowDiscount: string
	ItemId: string
	ItemName: string
	ItemPrice: string
	ItemStatus: string
	ItemType: string
	ManufactureCountry: string
	ManufacturerItemDescription: string
	ManufacturerName: string
	PriceUpdateDate: string
	QtyInPackage: string
	Quantity: string
	UnitOfMeasure: string
	UnitOfMeasurePrice: string
	UnitQty: string
	bIsWeighted: string
	promotions: IPromotion[]
}

export interface IPromotion {
	PromotionId?: string
	PromotionDescription?: string
	PromotionEndDate?: string
	PromotionUpdateDate?: string
	PromotionStartDate?: string
	PromotionMinQty?: string | null
	PromotionDiscountedPrice?: string | null
	PromotionDiscountedPricePerMida?: string | null
	PromotionMinNoOfItemOfered?: string | null
	PromotionWeightUnit?: string | null
	PromotionDiscountRate?: string | null
	PromotionItemCode?: string[]
}