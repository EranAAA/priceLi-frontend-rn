import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from "react-native"
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

	const [data, setData] = useState<IItem[]>()

	useFocusEffect(() => {
		if (route?.params?.item) {
			const sorted = route?.params?.item.stores.sort((a: any, b: any) => +a.ItemPrice - +b.ItemPrice)
			setData(sorted)
		} else {
			const sorted = item.stores.sort((a: any, b: any) => +a.ItemPrice - +b.ItemPrice)
			setData(sorted)
		}
	})

	if (!data) return

	return (
		<SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<View style={styles.ItemContainer}>
					<Text style={styles.ManufacturerName}>{data[0]?.ManufacturerName && data[0]?.ManufacturerName}</Text>
					<Text style={styles.ItemName}>{data[0]?.ItemName && data[0]?.ItemName}</Text>
					<Text style={styles.ItemCode}>{data[0]?.ItemCode && `ברקוד: ${data[0]?.ItemCode}`}</Text>
					<Text style={styles.Quantity}>{`${data[0]?.Quantity ? data[0]?.Quantity : ""} ${data[0]?.UnitQty ? data[0]?.UnitQty : ""}`}</Text>
					<ProductImage style={styles.productImg} ItemCode={data[0]?.ItemCode} />
					<FlatList
						data={data}
						renderItem={({ item }) => (
							<View style={styles.Row}>
								<View style={styles.PricesRow}>
									<Text style={styles.ItemPrice}>{`${item.store.StoreName}`}</Text>
									<Text style={styles.ItemPrice}>{`${item?.ItemPrice} ₪`}</Text>
								</View>
								<View style={styles.SaleRow}>
									<Text style={styles.SaleTitle}>{item?.promotions.length ? "מבצעים" : "לא נמצאו מבצעים"}</Text>
								</View>
							</View>
						)}
						keyExtractor={item => item.ItemId}
					/>
				</View>

				{/* <ScrollView>
					{data?.promotions.length >= 1 &&
						data?.promotions.map(promo => (
							<View key={promo.PromotionId} style={styles.SaleContainer}>
								<Text style={styles.PromotionDescription}>{promo.PromotionDescription}</Text>
								{promo.PromotionDiscountRate && <Text style={styles.DiscountRate}>{"אחוז הנחה: " + parseInt(promo.PromotionDiscountRate) / 100 + "%"}</Text>}
								<Text style={styles.MinQty}>{"כמות מינמלית: " + promo.PromotionMinQty ?? "אין מידע"}</Text>
								<Text style={styles.PromotionDate}>{`בתוקף: ${new Date(promo.PromotionEndDate).toLocaleDateString()} - ${new Date(promo.PromotionStartDate).toLocaleDateString()}`}</Text>
							</View>
						))}
				</ScrollView> */}
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
	Row: {
		height: 80,
		textAlign: "left",
		fontSize: 16,
		borderColor: "#D7D8DA",
		borderBottomWidth: 1,
		marginBottom: 1,
		flexDirection: "column",
		// justifyContent: "space-between",
		// alignItems: "center",
	},
	PricesRow: {
		textAlign: "left",
		fontSize: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	SaleRow: {
		textAlign: "left",
		fontSize: 16,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	ItemPrice: {
		textAlign: "left",
		fontSize: 20,
		fontWeight: "600",
		paddingTop: "2.5%",
	},
	ItemPriceSymbol: {
		textAlign: "left",
		fontSize: 20,
		fontWeight: "600",
	},
	Quantity: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "400",
	},
	productImg: {
		height: "100%",
		maxHeight: "100%",
		width: "100%", // imageWidth,
		marginBottom: "4%",
		resizeMode: "contain",
	},
	SaleTitle: {
		textAlign: "left",
		fontSize: 13,
		// paddingLeft: 20,
		// paddingTop: 10,
		paddingBottom: "1%",
		fontWeight: "600",
	},
	SaleContainer: {
		padding: 20,
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
