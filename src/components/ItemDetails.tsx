import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native"
import React, { useContext, useState } from "react"
import { StoreContext } from "../../Context"
import { IItem } from "../interfaces/interfaces"
import { useFocusEffect } from "@react-navigation/native"
import ProductImage from "./shared/ProductImage"

const dimensions = Dimensions.get("window")
const imageWidth = dimensions.width

const ItemDetails = ({ route }) => {
	const priceStore = useContext(StoreContext)
	const item = priceStore.getItem

	const [data, setData] = useState<IItem>()

	useFocusEffect(() => {
		if (route?.params?.item) setData(route.params.item)
		else setData(item)
	})

	return (
		<SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<View style={styles.ItemContainer}>
					<Text style={styles.ManufacturerName}>{data?.ManufacturerName && data?.ManufacturerName}</Text>
					<Text style={styles.ItemName}>{data?.ItemName && data?.ItemName}</Text>
					<Text style={styles.ItemCode}>{data?.ItemCode && `ברקוד: ${data?.ItemCode}`}</Text>
					<Text style={styles.ItemPrice}>
						<Text style={styles.ItemPriceSymbol}>{`${data?.ItemPrice ? "₪ " : ""}`}</Text>
						{`${data?.ItemPrice ? data?.ItemPrice : ""} `}
					</Text>
					<Text style={styles.Quantity}>{`${data?.Quantity ? data?.Quantity : ""} ${data?.UnitQty ? data?.UnitQty : ""}`}</Text>
				</View>

				<ProductImage style={styles.productImg} ItemCode={data?.ItemCode}/>

				{data?.PromotionDescription && <Text style={styles.title}>מבצעים</Text>}
				{!data?.PromotionDescription && <Text style={styles.title}>לא נמצאו מבצעים</Text>}
				{data?.PromotionDescription && (
					<View style={styles.SaleContainer}>
						<Text style={styles.PromotionDescription}>{data?.PromotionDescription}</Text>
						{data?.PromotionDiscountRate && <Text style={styles.DiscountRate}>{parseInt(data?.PromotionDiscountRate) / 100 + "%"}</Text>}
						<Text style={styles.MinQty}>{"כמות מינמלית: " + data?.PromotionMinQty ?? "אין מידע"}</Text>
						<Text style={styles.PromotionDate}>{`בתוקף: ${data?.PromotionStartDate} - ${data?.PromotionEndDate ?? "אין מידע"}`}</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	)
}

export default ItemDetails

const styles = StyleSheet.create({
	container: {
		height: "100%",
		justifyContent: "flex-start",
		backgroundColor: "#FFFFFF",
	},
	ItemContainer: {
		padding: 20,
	},
	ManufacturerName: {
		textAlign: "left",
		fontSize: 20,
		fontWeight: "300",
	},
	ItemName: {
		textAlign: "left",
		fontSize: 30,
		fontWeight: "300",
	},
	ItemCode: {
		textAlign: "left",
		fontSize: 16,
		color: "gray",
		fontWeight: "300",
	},
	ItemPrice: {
		textAlign: "left",
		fontSize: 40,
		fontWeight: "600",
	},
	ItemPriceSymbol: {
		textAlign: "left",
		fontSize: 25,
		fontWeight: "600",
	},
	Quantity: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "400",
	},
	productImg: {
		height: "35%",
		width: imageWidth,
		resizeMode: "contain",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	title: {
		textAlign: "left",
		fontSize: 16,
		paddingLeft: 20,
		paddingTop: 10,
		paddingBottom: "1%",
		fontWeight: "600",
	},
	SaleContainer: {
		paddingTop: 20,
		paddingLeft: 20,
		borderTopWidth: 1,
		display: "flex",
		rowGap: 5,
		borderTopColor: "lightgray",
	},
	PromotionDescription: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "400",
	},
	DiscountRate: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "400",
	},
	MinQty: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "400",
	},
	PromotionDate: {
		textAlign: "left",
		fontSize: 16,
	},
})
