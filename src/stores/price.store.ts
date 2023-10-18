import { makeAutoObservable } from "mobx"

import { PriceService } from "../services/price.service"
import { IItem, IItemGroup } from "../interfaces/interfaces"

export class PriceStore {
	private items: IItemGroup[] = []
	private item: IItemGroup

	constructor(private readonly priceService: PriceService) {
		makeAutoObservable(this)
		this.fetchItems()
	}

	fetchItem = async (itemId: number) => {
		const priceService = new PriceService()
		try {
			const item = await priceService.queryItem(itemId)
			if (item?.stores.length) {
				const sortedItemStores = item.stores.sort((a: any, b: any) => +a.ItemPrice - +b.ItemPrice)
				const updatedItem = {...item, stores: sortedItemStores}
				console.log("item", updatedItem)
				this.setItem(updatedItem)
				this.setItems(updatedItem)
			} else this.setItem(null)
			return item
		} catch (error) {
			console.log("error:", error)
		}
	}

	fetchItems = async () => {
		const priceService = new PriceService()
		try {
			const items = await priceService.getData()
			if (items) this.items = items
			else console.log("No data available")

			return items
		} catch (error) {
			console.log("error:", error)
		}
	}

	removeItem = async (itemCode: string) => {
		const priceService = new PriceService()
		try {
			this.items = this.items.filter(item => item.itemCode !== itemCode)
			await priceService.storeData(this.items)
		} catch (error) {
			console.log("error:", error)
		}
	}

	private async setItems(item: IItemGroup) {
		const priceService = new PriceService()
		if (!this.items) {
			this.items = [item]
			await priceService.storeData([item])
		} else {
			const idx = this.items.findIndex(i => i.itemCode === item.itemCode)
			if (idx >= 0) this.items[idx] = item
			else this.items.unshift(item)
			await priceService.storeData(this.items)
		}
	}

	private setItem(item: IItemGroup) {
		this.item = item
	}

	get getItems() {
		return this.items
	}

	get getItem() {
		return this.item
	}
}
