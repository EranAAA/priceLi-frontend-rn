import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, Dimensions, Pressable, Keyboard } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
// import Icon from "react-native-vector-icons/FontAwesome"

const DEVICE_WIDTH = Dimensions.get("window").width
const DEVICE_HEIGHT = Dimensions.get("window").height

const BarCode = ({ setIsBarCodeOpen, setItemCode }) => {
	const [hasPermission, setHasPermission] = useState(null)
	const [scanned, setScanned] = useState(false)

	useEffect(() => {
		Keyboard.dismiss()
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === "granted")
		}
		getBarCodeScannerPermissions()
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		setIsBarCodeOpen(false)
		setItemCode(data)
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<>
			<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.container} />
			<View style={styles.buttonContainer}>
				{/* <Pressable style={styles.button} onPress={() => setIsBarCodeOpen(false)}>
					<Text style={styles.text}>{"סגור"}</Text>
				</Pressable> */}
				{/* {scanned && (
					<Pressable style={styles.button} onPress={() => setScanned(false)}>
						<Text style={styles.text}>{"לחץ כאן כדי לסרוק שוב"}</Text>
					</Pressable>
				)} */}
			</View>
		</>
	)
}

export default BarCode

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		height: DEVICE_HEIGHT,
		width: DEVICE_WIDTH,
	},
	buttonContainer: {
		position: "absolute",
		top: 10,
		height: DEVICE_HEIGHT - 100,
		justifyContent: "space-between",
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
})
