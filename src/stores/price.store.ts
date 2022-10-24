import { makeAutoObservable, toJS } from "mobx"

import { PriceService } from "../services/price.service"
import { utilService } from "../services/util.service"

import { IItem, IItemFilter } from "../interfaces/interfaces"

export class PriceStore {
	private items: IItem[] = []
	private itemsCodeList: string[] = []
	private itemsFromLocalStorage: IItem[] = []
	private itemFilter: IItemFilter = {}

	private pages: number = 1

	constructor(private readonly priceService: PriceService) {
		makeAutoObservable(this)
		// this.fetchItems()
		this.fetchItemCodeList()
		this.fetchItemsFromStorage()
	}

	private async fetchItems() {
		try {
			const { items } = await this.priceService.queryItems()
			console.log("Got Items;: ", items.length)
			// this.setPagesCount(1)
			this.setItems(items)
		} catch (err) {
			this.setItems([])
		}
	}

	private async fetchItem(itemId: any) {
		console.log("Got itemId: ", itemId)
		try {
			const item = await this.priceService.queryItem(itemId)
			console.log("Got Item: ", item)
			this.setItems([item])
			this.fetchItemsFromStorage()
		} catch (err) {
			this.setItemsFromLocalStorage([])
		}
	}

	private async fetchItemCodeList() {
		try {
			const { itemsList } = await this.priceService.queryItemCodeList()
			console.log("Got Items Code: ", itemsList.length)
			this.setItemsCodeList(itemsList)
			console.log(itemsList)
		} catch (err) {
			this.setItemsCodeList([])
		}
	}

	private async fetchItemsFromStorage() {
		try {
			const list = await this.priceService.queryItemsLocalStorage()
			console.log("Got List from local storage: ", list.length)
			this.setItemsFromLocalStorage(list)
		} catch (err) {
			this.setItemsFromLocalStorage([])
		}
	}

	private setItems(items: IItem[]) {
		this.items = items
	}

	private setItemsCodeList(items: string[]) {
		this.itemsCodeList = items
	}

	private setItemsFromLocalStorage(items: IItem[]) {
		this.itemsFromLocalStorage = items
	}

	get getItems() {
		return this.items
	}

	get getItemsCodeList() {
		return this.itemsCodeList
	}

	get getItemsFromLocalStorage() {
		return this.itemsFromLocalStorage
	}

	get getItemFilter() {
		return this.itemFilter
	}

	get getPages() {
		return this.pages
	}

	setFilter(filter: IItemFilter) {
		let priceFilter = this.itemFilter
		filter?.priceNumber !== undefined && (priceFilter.priceNumber = filter.priceNumber)
		this.fetchItem(priceFilter.priceNumber)

		return (this.itemFilter = priceFilter)
	}

	setPaging(page: number) {
		this.fetchItems()
	}
}
