import { StyleSheet, Text, View, Image, Dimensions } from "react-native"
import { useFonts } from "expo-font"

const dimensions = Dimensions.get("window")
const imageWidth = dimensions.width

export const ItemDetails = ({ data, msg }) => {
	const [fontsLoaded] = useFonts({
		"OpenSans-Light": require("../assets/fonts/OpenSans/OpenSans-Light.ttf"),
		"OpenSans-Medium": require("../assets/fonts/OpenSans/OpenSans-Medium.ttf"),
		"OpenSans-Bold": require("../assets/fonts/OpenSans/OpenSans-Bold.ttf"),
	})

	if (!fontsLoaded) {
		return null
	}

	return (
		<View>
			<View style={styles.ItemContainer}>
				<Text style={styles.ManufacturerName}>{data?.ManufacturerName._text ? data?.ManufacturerName._text : msg}</Text>
				<Text style={styles.ItemName}>{data?.ItemName._text && data?.ItemName._text}</Text>
				<Text style={styles.ItemCode}>ברקוד: {data?.ItemCode._text && data?.ItemCode._text}</Text>
				<Text style={styles.ItemPrice}>
					<Text style={styles.ItemPriceSymbol}>{`${data?.ItemPrice._text && "₪ "}`}</Text>
					{`${data?.ItemPrice._text && data?.ItemPrice._text} `}
				</Text>
				<Text style={styles.Quantity}>כמות: {`${data?.Quantity._text && data?.Quantity._text} ${data?.UnitQty._text && data?.UnitQty._text}`}</Text>
			</View>

			<Image style={styles.productImg} source={{ uri: `https://img.rami-levy.co.il/product/${data?.ItemCode._text}/small.jpg` }}></Image>

			<View style={styles.SaleContainer}>
				<Text style={styles.title}>מבצע</Text>
				<Text style={styles.PromotionDescription}>{data?.promotion[0] && data?.promotion[0]?.PromotionDescription._text}</Text>
				<Text style={styles.DiscountRate}>{data?.promotion[0]?.DiscountRate && parseInt(data?.promotion[0]?.DiscountRate._text) / 100 + "%"}</Text>
				<Text style={styles.MinQty}>{data?.promotion[0]?.DiscountRate && "כמות מינמלית: " + data?.promotion[0]?.MinQty._text}</Text>
				<Text style={styles.PromotionDate}>{data?.promotion[0]?.PromotionStartDate && `בתוקף: ${data?.promotion[0]?.PromotionStartDate._text} - ${data?.promotion[0]?.PromotionEndDate._text}`}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	ItemContainer: {
		direction: "rtl",
		padding: 20,
	},
	ManufacturerName: {
		textAlign: "left",
		fontSize: 20,
		fontFamily: "OpenSans-Light",
	},
	ItemName: {
		textAlign: "left",
		fontSize: 30,
		fontFamily: "OpenSans-Light",
	},
	ItemCode: {
		textAlign: "left",
		fontSize: 16,
		color: "gray",
		fontFamily: "OpenSans-Medium",
	},
	ItemPrice: {
		textAlign: "left",
		fontSize: 40,
		fontFamily: "OpenSans-Bold",
	},
	ItemPriceSymbol: {
		textAlign: "left",
		fontSize: 25,
		fontFamily: "OpenSans-Light",
	},
	Quantity: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
	productImg: {
		height: "40%",
		width: imageWidth,
		resizeMode: "contain",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	SaleContainer: {
		direction: "rtl",
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: "lightgray",
	},
	title: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
	PromotionDescription: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
	DiscountRate: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
	MinQty: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
	PromotionDate: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Medium",
	},
})
