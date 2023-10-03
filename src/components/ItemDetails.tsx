import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import { StoreContext } from "../../Context"
import { IItem } from "../interfaces/interfaces"
import { useFocusEffect } from "@react-navigation/native"

const dimensions = Dimensions.get("window")
const imageWidth = dimensions.width

export const ItemDetails = ({ route }) => {
	const priceStore = useContext(StoreContext)
	const item = priceStore.getItem

	const [data, setData] = useState<IItem>()

	useFocusEffect(() => {
		console.log('ItemDetails: useEffect');
		
		if (route?.params?.item) setData(route.params.item)
		else setData(item)
	})

	return (
		<SafeAreaView style={{ backgroundColor: "#5F6F94" }}>
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

				<Image style={styles.productImg} source={{ uri: `https://img.rami-levy.co.il/product/${data?.ItemCode}/small.jpg` }}></Image>

				<View style={styles.SaleContainer}>
					<Text style={styles.title}>מבצע</Text>
					<Text style={styles.PromotionDescription}>{data?.promotion?.M && data?.promotion?.M?.PromotionDescription}</Text>
					<Text style={styles.DiscountRate}>{data?.promotion?.M?.DiscountRate && parseInt(data?.promotion.M?.DiscountRate) / 100 + "%"}</Text>
					<Text style={styles.MinQty}>{data?.promotion?.M?.DiscountRate && "כמות מינמלית: " + data?.promotion?.M?.MinQty}</Text>
					<Text style={styles.PromotionDate}>{data?.promotion?.M?.PromotionStartDate && `בתוקף: ${data?.promotion?.M?.PromotionStartDate} - ${data?.promotion?.M?.PromotionEndDate}`}</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

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
		// direction: "rtl",
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
