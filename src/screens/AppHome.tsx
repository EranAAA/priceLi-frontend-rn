import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react"

import WelcomPage from "../components/app-home/WelcomPage"
import ItemDetails from "../components/ItemDetails"

const HomeStack = createNativeStackNavigator()

const AppHome = () => {
	return (
		<HomeStack.Navigator >
			<HomeStack.Screen name='Home' options={{ headerShown: false, }} component={WelcomPage} />
			<HomeStack.Screen name='Details' options={{  headerShown: false, title: "" }} component={ItemDetails} />
		</HomeStack.Navigator>
	)
}

export default observer(AppHome)
