import { Image, StyleSheet, Dimensions, ImageSourcePropType, StyleProp, ImageStyle, View, TouchableOpacity, Button, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import Modal from "react-native-modal"

const dimensions = Dimensions.get("window")
const imageHeight = dimensions.height

type ProductImageProps = {
	style?: StyleProp<ImageStyle>
	ItemCode: string
}
const ProductImage = ({ style, ItemCode }: ProductImageProps) => {
	const [imageSource, setImageSource] = useState<ImageSourcePropType>()
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	useEffect(() => {
		if (ItemCode) setImageSource({ uri: `https://img.rami-levy.co.il/product/${ItemCode}/${isModalVisible ? "large" : "small"}.jpg` })
	}, [ItemCode])
	
	return (
		imageSource && (
			<>
				<TouchableOpacity style={{ height: "25%" }} onPress={() => setIsModalVisible(true)}>
					<Image style={style} onError={error => setImageSource(require("../../assets/product.png"))} source={imageSource}></Image>
				</TouchableOpacity>

				<Modal isVisible={isModalVisible}>
					<View style={{ flex: 1 }}>
						<Image style={styles.Expand} onError={error => setImageSource(require("../../assets/product.png"))} source={imageSource}></Image>
						<Pressable style={styles.Button} onPressOut={() => setIsModalVisible(false)}>
							<Text style={styles.Text}>{"HIDE"}</Text>
						</Pressable>
					</View>
				</Modal>
			</>
		)
	)
}

export default ProductImage

const styles = StyleSheet.create({
	Expand: {
		height: imageHeight,
		maxHeight: "100%",
		width: "100%", // imageWidth,
		marginBottom: "4%",
		resizeMode: "contain",
	},
	Button: {
		position: "absolute",
		top: 100,
		left: 0,
		right: 0,
		padding: "10%",
		// justifyContent: "center",
		alignItems: "center",
	},
	Text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
})
