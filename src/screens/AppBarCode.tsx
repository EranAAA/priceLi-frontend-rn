import { useFocusEffect } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, View, Text } from "react-native"

import { BarCode } from "../components/BarCode"

export const AppBarCode = ({ navigation }) => {
	const [itemCode, setItemCode] = useState<number>(0)
	const [isBarCodeOpen, setIsBarCodeOpen] = useState(true)

	useEffect(() => {
		setIsBarCodeOpen(true)
	}, [])

	useFocusEffect(() => {
		setIsBarCodeOpen(true)
		console.log('useFocusEffect');
	})

	useEffect(() => {
		if (itemCode) {
			setIsBarCodeOpen(false)
			navigation.navigate("Home", { barcode: itemCode })
			setItemCode(0)
		}
	}, [itemCode])

	return (
		<SafeAreaView>
			<View style={styles.container}>{isBarCodeOpen && <BarCode setIsBarCodeOpen={setIsBarCodeOpen} setItemCode={setItemCode} />}</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
})
