import React, { useEffect, useState, useContext } from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"

import ItemSearchField from "../shared/ItemSearchField"
import LoadingIndicator from "../shared/LoadingIndicator"
import { StoreContext } from "../../../Context"

const WelcomPage = ({ route, navigation }) => {
	const [msg, setMsg] = useState<string>("")
	const [itemCode, setItemCode] = useState<number>(0)
	const [isLoading, setIsLoading] = useState(false)

	const priceStore = useContext(StoreContext)

	useEffect(() => {
		if (itemCode) fetchItem(itemCode)
	}, [itemCode])

	useEffect(() => {
		if (route?.params?.barcode) {
			fetchItem(route?.params?.barcode)
			setItemCode(0)
			navigation.setParams({ barcode: "" })
		}
	}, [route?.params?.barcode])

	const fetchItem = async (itemId: number) => {
		setIsLoading(true)
		try {
			const item = await priceStore.fetchItem(itemId)
			if (item) {
				navigation.push("Details")
				setMsg("")
			} else setMsg(`לא נמצא מוצר  ${itemId}`)
		} catch (error) {
			console.log("error: fetchItem", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 0, backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<Text style={styles.appTitle}>PRICES</Text>
				<View style={styles.searchBar}>
					<ItemSearchField setItemCode={setItemCode} itemCode={itemCode} />
				</View>

				{/* <View style={styles.infoWrapper}>
					<Text style={styles.info}>רשת: רמי לוי</Text>
					<Text style={styles.info}>סניף: ביג פרדס חנה</Text>
					<Text style={styles.info}>תאריך עדכון: 31/10/2023</Text>
				</View> */}

				{!isLoading && msg && <Text style={styles.msg}>{msg}</Text>}
				{isLoading && <LoadingIndicator />}
			</View>
		</SafeAreaView>
	)
}

export default WelcomPage

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	appTitle: {
		padding: 5,
		fontSize: 30,
		fontFamily: "OpenSans-ExtraBoldItalic",
	},
	searchBar: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	msg: {
		position: "absolute",
		width: "100%",
		top: "50%",
		color: "#25316D",
		textAlign: "center",
		fontSize: 30,
		fontFamily: "OpenSans-ExtraBoldItalic",
	},
	infoWrapper: {
		position: "absolute",
		top: "20%",
		width: "100%",
		paddingLeft: "6%",
		fontFamily: "OpenSans-ExtraBoldItalic",
	},
	info: {
		textAlign: "left",
		direction: "rtl",
		fontSize: 22,
		fontFamily: "OpenSans-ExtraBoldItalic",
	},
})
