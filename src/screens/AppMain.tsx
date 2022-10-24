import React, { useEffect, useState } from "react"
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

import { IItem } from "../interfaces/interfaces"
import { PriceService } from "../services/price.service"

import { ItemSearch } from "../components/TextInput"
import { ItemDetails } from "../components/ItemDetails"
import { BarCode } from "../components/BarCode"

export const AppMain = () => {
	const [data, setData] = useState<IItem>()
	const [msg, setMsg] = useState<string>("")
	const [itemCode, setItemCode] = useState("")
	const [isBarCodeOpen, setIsBarCodeOpen] = useState(false)

	useEffect(() => {
		console.log("itemCode", itemCode)
		if (itemCode) fetchItem(itemCode)
	}, [itemCode])

	const fetchItem = async itemId => {
		const priceService = new PriceService()
		try {
			const item = await priceService.queryItem(itemId)
			if (item?.ItemName?._text) setData(item)
			else {
				setMsg("Item not found")
				setData(null)
			}
		} catch (error) {
			console.log("error:", error)
		}
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.searchBar}>
					<ItemSearch setItemCode={setItemCode} />
					<Icon.Button name='barcode' size={20} backgroundColor="#FFFFFF" color="#121212" onPress={() => setIsBarCodeOpen(!isBarCodeOpen)}></Icon.Button>
				</View>
				<ItemDetails data={data} msg={msg} />
				{ isBarCodeOpen && <BarCode setIsBarCodeOpen={setIsBarCodeOpen}/>}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		// backgroundColor: "#1E90FF",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	searchBar: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
})
