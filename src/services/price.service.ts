import { IItem } from "../interfaces/interfaces"
import { storageService } from "../services/storage.service"
import axios from "axios"

const BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "http://192.168.1.236:3030/api"

const KEY = "item"

export class PriceService {
	async queryItems() {
		const response = await fetch(`${BASE_URL}/price`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})

		const parsedResponse = await response.json()
		if (!response.ok) throw new Error(parsedResponse)
		return parsedResponse
	}

	async queryItem(itemId: number) {
		try {
			const { data }: { data: IItem } = await axios.get(`${BASE_URL}/price/${itemId}`)
			console.log('items', data);
			// console.log("Got Item: ", items?.data?.ItemName._text)
			if (data) return data
		} catch (error) {
			console.log("Got error: ", error)
		}
	}

	async queryItemCodeList() {
		const response = await fetch(`${BASE_URL}/price/list`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})

		const parsedResponse = await response.json()
		if (!response.ok) throw new Error(parsedResponse)
		return parsedResponse
	}

	async queryItemsLocalStorage() {
		try {
			return await storageService.query(KEY)
		} catch (err) {
			console.log("cant get cards!")
			throw err
		}
	}

	async queryItemLocalStorage(itemId: string) {
		try {
			const card = await storageService.get(KEY, itemId)
			return card
		} catch (err) {
			console.log("cant get card by id!")
			throw err
		}
	}

	async saveToLocalStorage(item: IItem) {
		try {
			return await storageService.post(KEY, item)
		} catch (err) {
			console.log("cant save card")
			throw err
		}
	}

	async removeFromLocalStorage(itemId: string) {
		try {
			return await storageService.remove(KEY, itemId)
		} catch (err) {
			console.log("cant delete card")
			throw err
		}
	}
}
