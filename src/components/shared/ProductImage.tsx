import { Image, ImageSourcePropType, StyleProp, ImageStyle } from "react-native"
import React, { useEffect, useState } from "react"

type ProductImageProps = {
	style?: StyleProp<ImageStyle>
	ItemCode: string
}
const ProductImage = ({ style, ItemCode }: ProductImageProps) => {
	const [imageSource, setImageSource] = useState<ImageSourcePropType>()

	useEffect(() => {
		if (ItemCode) setImageSource({ uri: `https://img.rami-levy.co.il/product/${ItemCode}/small.jpg` })
	}, [ItemCode])

	return imageSource && <Image style={style} onError={error => setImageSource(require("../../assets/product.png"))} source={imageSource}></Image>
}

export default ProductImage
