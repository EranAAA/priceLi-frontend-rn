import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import * as Clipboard from "expo-clipboard"
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
	const [isCopied, setIsCopied] = useState<boolean>(false)

	useFocusEffect(() => {
		if (route?.params?.item) {
			const sorted = route?.params?.item.stores.sort((a: any, b: any) => +a.ItemPrice - +b.ItemPrice)
			setData(sorted)
		} else {
			const sorted = item.stores.sort((a: any, b: any) => +a.ItemPrice - +b.ItemPrice)
			setData(sorted)
		}
	})

	useEffect(() => {
		setIsCopied(false)
	}, [data])

	const copyToClipboard = async (ItemCode: string) => {
		await Clipboard.setStringAsync(ItemCode)
		setIsCopied(true)
	}

	if (!data) return

	return (
		<SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<View style={styles.ItemContainer}>
					<Text style={styles.ManufacturerName}>{data[0]?.ManufacturerName && data[0]?.ManufacturerName}</Text>
					<Text style={styles.ItemName}>{data[0]?.ItemName && data[0]?.ItemName}</Text>
					<TouchableOpacity onPress={() => copyToClipboard(data[0]?.ItemCode)}>
						<Text style={{ ...styles.ItemCode, color: isCopied ? "green" : "black" }}>{data[0]?.ItemCode && `${data[0]?.ItemCode}`}</Text>
					</TouchableOpacity>

					<Text style={styles.Quantity}>{`${data[0]?.Quantity ? data[0]?.Quantity : ""} ${data[0]?.UnitQty ? data[0]?.UnitQty : ""}`}</Text>
					<ProductImage style={styles.productImg} ItemCode={data[0]?.ItemCode} />
					<FlatList
						data={data}
						style={styles.FlatListWrapper}
						renderItem={({ item }) => (
							<View style={styles.Row}>
								<View style={styles.PricesRow}>
									<Text style={styles.StoreName}>{`${item.store.StoreName}`}</Text>
									<View style={styles.ItemPriceWrapper}>
										<Text style={styles.ItemPrice}>{`${item?.ItemPrice} ₪`}</Text>
										{item.promotions.map(
											promo =>
												promo.PromotionDiscountedPrice &&
												+promo.PromotionMinQty === 1 && <Text style={styles.ItemPriceSale} key={promo.PromotionId}>{`${promo.PromotionDiscountedPrice} ₪`}</Text>
										)}
									</View>
								</View>
								<View style={styles.SaleRow}>
									{/* <Text style={styles.SaleTitle}>{item?.promotions.length ? "מבצעים" : "לא נמצאו מבצעים"}</Text> */}
									{item.promotions.map(
										promo =>
											promo.PromotionDiscountedPrice &&
											+promo.PromotionMinQty > 1 && (
												<Text style={styles.ItemPriceSale} key={promo.PromotionId}>{`${promo.PromotionDescription} => ${(+promo.PromotionDiscountedPrice / +promo.PromotionMinQty).toFixed(2)} ₪`}</Text>
											)
									)}
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
	FlatListWrapper: {
		paddingTop: 10,
	},
	Row: {
		height: 80,
		textAlign: "left",
		fontSize: 16,
		borderColor: "#D7D8DA",
		borderBottomWidth: 1,
		padding: 10,
		flexDirection: "column",
	},
	PricesRow: {
		textAlign: "left",
		fontSize: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	SaleRow: {
		textAlign: "left",
		fontSize: 16,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	StoreName: {
		textAlign: "left",
		fontSize: 20,
		alignItems: "center",
	},
	ItemPriceWrapper: {
		// flex: 1,
		// rowGap: 20,
		// width: "40%",
		// justifyContent: "space-between",
		// alignItems: "flex-start",
		// flexDirection: "row",
		// alignItems: "center",
	},
	ItemPrice: {
		// flex: 1,
		fontSize: 20,

		// textAlign: "left",
		// fontSize: 20,
		// fontWeight: "600",
		// paddingTop: "2.5%",
		// justifyContent: "space-between",
		// flexDirection: "row",
		// alignItems: "center",
	},
	ItemPriceSale: {
		// flex: 1,
		fontSize: 15,
		borderRadius: 5,
		backgroundColor: "lightgreen",
		// textAlign: "left",
		// fontSize: 20,
		// fontWeight: "600",
		// paddingTop: "2.5%",
		// justifyContent: "space-between",
		// flexDirection: "row",
		// alignItems: "center",
		textAlign: "center",
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
