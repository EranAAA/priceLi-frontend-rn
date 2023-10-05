import { observer } from "mobx-react"
import React, { useContext } from "react"
import { Animated, Dimensions, FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native"
import { GestureHandlerRootView, Swipeable, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler"
import { StoreContext } from "../../Context"
import ProductImage from "../components/shared/ProductImage"
import { IItem } from "../interfaces/interfaces"

const DEVICE_WIDTH = Dimensions.get("window").width

const AppList = ({ navigation }) => {
	const priceStore = useContext(StoreContext)
	const items = priceStore.getItems

	const renderItem = (item: IItem) => (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Swipeable
				renderRightActions={(progress: Animated.AnimatedInterpolation<any>, dragX: Animated.AnimatedInterpolation<any>) => {
					const opacity = dragX.interpolate({
						inputRange: [-150, 0],
						outputRange: [1, 0],
						extrapolate: "clamp",
					})

					return (
						<View style={styles.swipedRow}>
							<Animated.View style={[styles.deleteButton, { opacity }]}>
								<TouchableOpacity onPress={() => priceStore.removeItem(item.ItemCode)}>
									<Text style={styles.deleteButtonText}>Delete</Text>
								</TouchableOpacity>
							</Animated.View>
						</View>
					)
				}}
			>
				<TouchableHighlight
					activeOpacity={0.4}
					underlayColor='white'
					onPress={() => {
						navigation.navigate("Details", { item })
					}}
				>
					<View style={styles.row}>
						<Text style={styles.ManufacturerName}>{item.ManufacturerName}</Text>
						<Text style={styles.ItemName}>{item.ItemName}</Text>
						<Text style={styles.ItemCode}>{item.ItemCode}</Text>
						<Text style={styles.ItemPrice}>
							<Text style={styles.ItemPriceSymbol}>{`${"₪ "}`}</Text>
							{`${item.ItemPrice} `}
						</Text>
						<Text style={styles.Quantity}>{`${item.Quantity} ${item.UnitQty}`}</Text>
						{item?.promotions?.length >= 1 && <Text style={styles.promotion}>{item?.promotions?.length && item?.promotions[0]?.PromotionDescription}</Text>}
						<ProductImage style={styles.productImg} ItemCode={item?.ItemCode} />
					</View>
				</TouchableHighlight>
			</Swipeable>
		</GestureHandlerRootView>
	)

	return (
		<SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<Text style={styles.title}>היסטורית חיפושים</Text>
				<FlatList data={items} renderItem={({ item }) => renderItem(item)} keyExtractor={item => item.ItemCode} />
			</View>
		</SafeAreaView>
	)
}
export default observer(AppList)

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: DEVICE_WIDTH,
		justifyContent: "flex-start",
		alignItems: "center",
		// backgroundColor: "#5F6F94",
	},
	title: {
		padding: 15,
		fontSize: 18,
	},
	row: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		width: DEVICE_WIDTH,
		textAlign: "left",
		padding: 15,
		fontSize: 18,
		height: 130,
		borderColor: "#D7D8DA",
		borderBottomWidth: 1,
		marginBottom: 1,
	},
	swipedRow: {
		backgroundColor: "#C02A2A",
		borderColor: "#D7D8DA",
		borderBottomWidth: 1,
		marginBottom: 1,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	deleteButton: {
		fontWeight: "600",
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	deleteButtonText: {
		color: "#fcfcfc",
		fontWeight: "bold",
		padding: 3,
	},
	item: {
		textAlign: "left",
		padding: 15,
		fontSize: 18,
		height: 130,
		borderColor: "#D7D8DA",
		borderBottomWidth: 1,
		backgroundColor: "#FFFFFF",
		marginBottom: 1,
	},
	ItemCode: {
		textAlign: "left",
		fontSize: 12,
		color: "gray",
		fontWeight: "400",
	},
	ManufacturerName: {
		textAlign: "left",
		fontSize: 15,
		fontWeight: "300",
	},
	ItemName: {
		textAlign: "left",
		fontSize: 15,
		fontWeight: "300",
	},
	ItemPrice: {
		textAlign: "left",
		fontSize: 16,
		fontWeight: "500",
	},
	ItemPriceSymbol: {
		textAlign: "left",
		fontSize: 12,
	},
	Quantity: {
		textAlign: "left",
		fontSize: 12,
	},
	productImg: {
		position: "absolute",
		right: 10,
		height: 120,
		width: 100,
		resizeMode: "contain",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	promotion: {
		position: "absolute",
		fontSize: 12,
		top: "25%",
		right: 140,
		height: "auto",
		width: 100,
		textAlign: "center",
		borderColor: "#121212",
		borderWidth: 1,
		padding: 5,
		borderRadius: 5,
	},
})
