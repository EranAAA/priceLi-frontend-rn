export interface IItemFilter {
	priceNumber?: string
	takeoffAirport?: string
	landingAirport?: string
}

export interface IItemGroup {
	date: string
	itemCode: string
	stores: IItem[]
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
	store: IStore
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

export interface IStore {
	StoreId: string
	BikoretNo: string
	StoreType: string
	StoreName: string
	Address: string
	City: string
	ZipCode: string
}
