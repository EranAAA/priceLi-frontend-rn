import React, { useEffect } from "react"
import { Dimensions, Keyboard, StyleSheet, TextInput } from "react-native"

const DEVICE_WIDTH = Dimensions.get("window").width

export const ItemSearch = ({ setItemCode, itemCode }) => {
	const [number, onChangeNumber] = React.useState<string>(itemCode ? String(itemCode) : "")

	useEffect(() => {
		if (number.length === 13) {
			setItemCode(number)
			Keyboard.dismiss()
		}
	}, [number])

	return <TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder='חפש ברקוד' keyboardType='numeric' />
}

const styles = StyleSheet.create({
	input: {
		width: DEVICE_WIDTH * 0.9,
		padding: 15,
		marginTop: 10,
		borderRadius: 10,

		textAlign: "center",
		fontFamily: "OpenSans-Medium",

		backgroundColor: "#FFFFFF",
	},
})
