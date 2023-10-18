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
		console.log("Scanned", data, type)
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
		<BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, styles.container]}>
			<View style={styles.layerTop} />
			<View style={styles.layerCenter}>
				<View style={styles.layerLeft} />
				<View style={styles.focused} />
				<View style={styles.layerRight} />
			</View>
			<View style={styles.layerBottom} />
		</BarCodeScanner>
	)
}

export default BarCode

const opacity = "rgba(0, 0, 0, .6)"

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	layerTop: {
		flex: 2,
		backgroundColor: opacity,
	},
	layerCenter: {
		flex: 1,
		flexDirection: "row",
	},
	layerLeft: {
		flex: 1,
		backgroundColor: opacity,
	},
	focused: {
		flex: 10,
	},
	layerRight: {
		flex: 1,
		backgroundColor: opacity,
	},
	layerBottom: {
		flex: 2,
		backgroundColor: opacity,
	},
})
