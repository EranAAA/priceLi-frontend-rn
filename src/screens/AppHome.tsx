import React, { useEffect, useState, useContext } from "react"
import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react"

import { StoreContext } from "../../Context"
import { IItem } from "../interfaces/interfaces"

import { ItemSearch } from "../components/TextInput"
import { ItemDetails } from "../components/ItemDetails"
import { Indicator } from "../components/Indicator"

const HomeStack = createNativeStackNavigator()

const HomeScreen = ({ route, navigation }) => {
	const [msg, setMsg] = useState<string>("")
	const [itemCode, setItemCode] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(false)

	const priceStore = useContext(StoreContext)

	useEffect(() => {
		if (itemCode) fetchItem(itemCode)
		// console.log("useEffect itemSearch", itemCode)
	}, [itemCode])

	useEffect(() => {
		if (route?.params?.barcode) fetchItem(route?.params?.barcode)
		// console.log("useEffect barcode", route?.params?.barcode)
	}, [route?.params?.barcode])

	const fetchItem = async (itemId: number) => {
		setIsLoading(true)
		try {
			const item = await priceStore.fetchItem(itemId)
			if (item) {
				navigation.push("Details")
				setMsg("")
			} else setMsg("לא נמצא מוצר")
		} catch (error) {
			console.log("error:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 0, backgroundColor: "#5F6F94" }}>
			<View style={styles.container}>
				<View style={styles.searchBar}>
					<ItemSearch setItemCode={setItemCode} itemCode={itemCode} />
				</View>
				{!isLoading && msg && <Text style={styles.msg}>{msg}</Text>}
				{isLoading && <Indicator />}
			</View>
		</SafeAreaView>
	)
}

const AppHome = () => {
	return (
		<HomeStack.Navigator >
			<HomeStack.Screen name='Home' options={{ headerShown: false, }} component={HomeScreen} />
			<HomeStack.Screen name='Details' options={{  headerShown: false, title: "" }} component={ItemDetails} />
		</HomeStack.Navigator>
	)
}

export default observer(AppHome)

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#5F6F94",
	},
	searchBar: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	msg: {
		width: "100%",
		marginTop: "60%",
		textAlign: "center",
		fontSize: 30,
		fontFamily: "OpenSans-ExtraBoldItalic",
	},
})
