import React from "react"
import { StyleSheet, TextInput } from "react-native"

export const ItemSearch = ({ setItemCode }) => {
	const [number, onChangeNumber] = React.useState("")

	React.useEffect(() => {
		if (number.length === 13) {
			setItemCode(number)
		}
	}, [number])

	return <TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder='Barcode' keyboardType='numeric' />
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		width: 200,
		padding: 10,
		margin: 12,

		textAlign: "center",
		// color: "#FFF",

		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 1,
		// borderBottomColor: "#FFF",
	},
})
