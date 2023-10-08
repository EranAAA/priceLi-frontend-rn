import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { IItem, IItemGroup } from "../interfaces/interfaces"
import { storageService } from "../services/storage.service"

const BASE_URL = process.env.NODE_ENV === "production" ? "/api" : "http://192.168.1.236:3030/api"
const KEY = "item"

export class PriceService {
	async queryItem(itemId: number) {
		try {
			const items = await axios.get(`https://ytg6de3onb.execute-api.us-east-1.amazonaws.com/getItem?ItemCode=${itemId}`)
			const data = items.data
			if (data?.stores.length) return data as IItemGroup 
		} catch (error) {
			console.log("Got error: ", error)
		}
	}

	async storeData(item: IItemGroup[]) {
		try {
			const jsonValue = JSON.stringify(item)
			// console.log('jsonValue',jsonValue);

			await AsyncStorage.setItem("itemsDB", jsonValue)
		} catch (err) {
			// saving error
			console.log("storeData err", err)
		}
	}

	async getData() {
		try {
			const jsonValue = await AsyncStorage.getItem("itemsDB")
			return jsonValue != null ? JSON.parse(jsonValue) : null
		} catch (err) {
			console.log("getData err", err)
		}
	}

	async removeData() {
		try {
			await AsyncStorage.removeItem("itemsDB")
		} catch (err) {
			console.log("removeValue err", err)
		}

		console.log("Done.")
	}
}
