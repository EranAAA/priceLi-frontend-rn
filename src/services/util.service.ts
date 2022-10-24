import { IItem } from "../interfaces/interfaces"

const getRowColor = (status: string): string => {
	if (status === "malfunction") return "red"
	else return ""
}

const getBlinkClass = (status: string, idx: number): string => {
	if (status === "malfunction" && idx === 0) return "blink"
	else return ""
}

const getDateFixedFormat = (date: string): Date => {
	let splitDate: string[] = date.replace("-", "/").split("/")
	let fixedDate = new Date(
		parseInt(splitDate[2].trim()),
		parseInt(splitDate[1]) - 1,
		parseInt(splitDate[0].trim()),
		parseInt(splitDate[3].trim().substring(0, 2)),
		parseInt(splitDate[3].trim().substring(3, 5))
	)
	return fixedDate
}

const getTimeDiffCalc = (newTime: Date, currentTime: Date): Number => {
	let diffInMilliSeconds = Math.abs(newTime.getTime() - currentTime.getTime()) / 1000

	const minutes = Math.floor(diffInMilliSeconds / 60) % 60
	diffInMilliSeconds -= minutes * 60
	return minutes
}

const getDistinctList = (field: keyof IItem, prices: IItem[]) => {
	// let list: { value: string; label: string }[] = []
	// if (field === "takeoffAirport" || field === "landingAirport")
	// 	list = prices
	// 		.map(price => price[field])
	// 		.filter((value, index, self) => self.indexOf(value) === index)
	// 		.map(price => ({ label: price, value: price }))
	// list.unshift({ label: "None", value: "" })
	// return list
}

const getList = (prices: IItem[], name: string) => {
	// let statusList = 0
	// for (let i = 0; i < prices.length; i++) {
	// 	if (prices[i].status === name) statusList += 1
	// 	if (prices[i]?.takeoffTimeLate && name === "delay") statusList += 1
	// }
	// return statusList
}

const getBinarySearch = (arr: [], x: number, start: number, end: number): boolean => {
	// Base Condition
	if (start > end) return false

	// Find the middle index
	let mid = Math.floor((start + end) / 2)

	// Compare mid with given key x
	if (arr[mid] === x) return true
	// If element at mid is greater than x,
	// search in the left half of mid
	if (arr[mid] > x) return getBinarySearch(arr, x, start, mid - 1)
	// If element at mid is smaller than x,
	// search in the right half of mid
	else return getBinarySearch(arr, x, mid + 1, end)
}

export const utilService = {
	getRowColor,
	getBlinkClass,
	getDateFixedFormat,
	getTimeDiffCalc,
	getDistinctList,
	getList,
	getBinarySearch,
}
