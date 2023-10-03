import React from "react"
import { useFonts } from "expo-font"
import { NavigationContainer } from "@react-navigation/native"
import { I18nManager, SafeAreaView } from "react-native"

import { BottomTabs } from "./src/components/BottomNavigator"

import { PriceService } from "./src/services/price.service"
import { PriceStore } from "./src/stores/price.store"

const priceService = new PriceService()
const priceStore = new PriceStore(priceService)

I18nManager.forceRTL(true)
I18nManager.allowRTL(true)

import { StoreContext } from "./Context"

export default function App() {
	const [fontsLoaded] = useFonts({
		"OpenSans-Light": require("./src/assets/fonts/OpenSans/OpenSans-Light.ttf"),
		"OpenSans-Medium": require("./src/assets/fonts/OpenSans/OpenSans-Medium.ttf"),
		"OpenSans-Bold": require("./src/assets/fonts/OpenSans/OpenSans-Bold.ttf"),
		"OpenSans-MediumItalic": require("./src/assets/fonts/OpenSans/OpenSans-MediumItalic.ttf"),
		"OpenSans-ExtraBoldItalic": require("./src/assets/fonts/OpenSans/OpenSans-ExtraBoldItalic.ttf"),
	})

	if (!fontsLoaded) return null

	return (
		<StoreContext.Provider value={priceStore}>
			<NavigationContainer>
				<BottomTabs />
			</NavigationContainer>
		</StoreContext.Provider>
	)
}