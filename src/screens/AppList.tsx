import { observer } from "mobx-react"
import React, { useContext, useState } from "react"
import { Animated, Dimensions, FlatList, StyleSheet, Text, View, Image, SafeAreaView } from "react-native"
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler"
import { StoreContext } from "../../Context"
import { IItem } from "../interfaces/interfaces"

const DEVICE_WIDTH = Dimensions.get("window").width

const AppList = ({ navigation }) => {
	const priceStore = useContext(StoreContext)
	const items = priceStore.getItems

	const renderItem = (item: IItem) => (
		// <Swipeable
		// 	renderRightActions={(progress: Animated.AnimatedInterpolation<any>, dragX: Animated.AnimatedInterpolation<any>) => {
		// 		const opacity = dragX.interpolate({
		// 			inputRange: [-150, 0],
		// 			outputRange: [1, 0],
		// 			extrapolate: "clamp",
		// 		})

		// 		return (
		// 			<View style={styles.swipedRow}>
		// 				<Animated.View style={[styles.deleteButton, { opacity }]}>
		// 					<TouchableOpacity onPress={() => priceStore.removeItem(item.ItemCode)}>
		// 						<Text style={styles.deleteButtonText}>Delete</Text>
		// 					</TouchableOpacity>
		// 				</Animated.View>
		// 			</View>
		// 		)
		// 	}}
		// >
		// 	<TouchableOpacity onPress={() => navigation.navigate("Details", { item })}>
		// 		<View style={styles.row}>
		// 			<Text style={styles.ManufacturerName}>{item.ManufacturerName}</Text>
		// 			<Text style={styles.ItemName}>{item.ItemName}</Text>
		// 			<Text style={styles.ItemCode}>{item.ItemCode}</Text>
		// 			<Text style={styles.ItemPrice}>
		// 				<Text style={styles.ItemPriceSymbol}>{`${"₪ "}`}</Text>
		// 				{`${item.ItemPrice} `}
		// 			</Text>
		// 			<Text style={styles.Quantity}>{`${item.Quantity} ${item.UnitQty}`}</Text>
		// 			{item?.PromotionDescription && <Text style={styles.promotion}>{item?.PromotionDescription}</Text>}
		// 			<Image style={styles.productImg} source={{ uri: `https://img.rami-levy.co.il/product/${item?.ItemCode}/small.jpg` }}></Image>
		// 		</View>
		// 	</TouchableOpacity>
		// </Swipeable>
		<View style={styles.row}>
			<Text style={styles.ManufacturerName}>{item.ManufacturerName}</Text>
			<Text style={styles.ItemName}>{item.ItemName}</Text>
			<Text style={styles.ItemCode}>{item.ItemCode}</Text>
			<Text style={styles.ItemPrice}>
				<Text style={styles.ItemPriceSymbol}>{`${"₪ "}`}</Text>
				{`${item.ItemPrice} `}
			</Text>
			<Text style={styles.Quantity}>{`${item.Quantity} ${item.UnitQty}`}</Text>
			{item?.PromotionDescription && <Text style={styles.promotion}>{item?.PromotionDescription}</Text>}
			<Image style={styles.productImg} source={{ uri: `https://img.rami-levy.co.il/product/${item?.ItemCode}/small.jpg` }}></Image>
		</View>
	)

	return (
		<SafeAreaView style={{ backgroundColor: "#5F6F94" }}>
			<View style={styles.container}>
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
		backgroundColor: "#5F6F94",
	},
	row: {
		flex: 1,
		backgroundColor: "white",
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
		// color: '#1b1a17',
		//   paddingHorizontal: 10,
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
		backgroundColor: "#FFF",
		marginBottom: 1,
	},
	ItemCode: {
		textAlign: "left",
		fontSize: 12,
		color: "gray",
		fontFamily: "OpenSans-Medium",
	},
	ManufacturerName: {
		textAlign: "left",
		fontSize: 15,
		fontFamily: "OpenSans-Light",
	},
	ItemName: {
		textAlign: "left",
		fontSize: 15,
		fontFamily: "OpenSans-Light",
	},
	ItemPrice: {
		textAlign: "left",
		fontSize: 16,
		fontFamily: "OpenSans-Bold",
	},
	ItemPriceSymbol: {
		textAlign: "left",
		fontSize: 12,
		fontFamily: "OpenSans-Light",
	},
	Quantity: {
		textAlign: "left",
		fontSize: 12,
		fontFamily: "OpenSans-Medium",
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
		fontFamily: "OpenSans-Light",
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
