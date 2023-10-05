import { makeAutoObservable } from "mobx"

import { PriceService } from "../services/price.service"
import { IItem } from "../interfaces/interfaces"

export class PriceStore {
	private items: IItem[] = []
	private item: IItem

	constructor(private readonly priceService: PriceService) {
		makeAutoObservable(this)
		this.fetchItems()
	}

	fetchItem = async (itemId: number) => {
		const priceService = new PriceService()
		try {
			const item = await priceService.queryItem(itemId)
			if (item?.ItemName) {
				console.log("item", item)
				this.setItem(item)
				this.setItems(item)
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
			this.items = this.items.filter(item => item.ItemCode !== itemCode)
			await priceService.storeData(this.items)
		} catch (error) {
			console.log("error:", error)
		}
	}

	private async setItems(item: IItem) {
		const priceService = new PriceService()
		if (!this.items) {
			this.items = [item]
			await priceService.storeData([item])
		} else {
			const idx = this.items.findIndex(i => i.ItemCode === item.ItemCode)
			if (idx >= 0) this.items[idx] = item
			else this.items.unshift(item)
			await priceService.storeData(this.items)
		}
	}

	private setItem(item: IItem) {
		this.item = item
	}

	get getItems() {
		return this.items
	}

	get getItem() {
		return this.item
	}
}
