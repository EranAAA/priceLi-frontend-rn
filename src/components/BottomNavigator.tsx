import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import AppHome from "../screens/AppHome"
import AppList from "../screens/AppList"
import { AppBarCode } from "../screens/AppBarCode"

export type BottomTabNavigatorParamList = {
	בית: undefined
	רשימה: undefined
	ברקוד: undefined
}
const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>()

export const BottomTabs = () => {
	return (
		<Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "#25316D" }, tabBarInactiveTintColor: "#FFF", tabBarActiveTintColor: "#FEF5AC" }}>
			<Tab.Screen
				name='בית'
				component={AppHome}
				options={{
					headerShown: false,
					tabBarLabel: "בית",
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='information' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='ברקוד'
				component={AppBarCode}
				options={{
					// tabBarLabel: "ברקוד",
					// title: "",
					headerShown: false,
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='barcode' color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name='רשימה'
				component={AppList}
				options={{
					tabBarLabel: "רשימה",
					headerShown: false,
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name='cart' color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	)
}
