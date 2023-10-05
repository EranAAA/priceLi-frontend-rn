import React, { useEffect } from "react"
import { Dimensions, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native"

const DEVICE_WIDTH = Dimensions.get("window").width

export const ItemSearchField = ({ setItemCode, itemCode }) => {
	const [number, onChangeNumber] = React.useState<string>(itemCode ? String(itemCode) : "")

	useEffect(() => {
		if (number.length === 13) {
			setItemCode(number)
			Keyboard.dismiss()
		}
	}, [number])

	useEffect(() => {
		onChangeNumber(itemCode ? String(itemCode) : "")
	}, [itemCode])

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1, backgroundColor: "transparent" }}>
				<TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder='חפש ברקוד (13 תווים)' keyboardType='numeric' />
			</View>
		</TouchableWithoutFeedback>
	)
}

export default ItemSearchField

const styles = StyleSheet.create({
	input: {
		width: DEVICE_WIDTH * 0.9,
		padding: 15,
		marginTop: 10,
		borderRadius: 10,

		textAlign: "center",
		fontFamily: "OpenSans-Medium",
		borderBottomColor: "#25316D",
		borderBottomWidth : 1.0
	},
})
