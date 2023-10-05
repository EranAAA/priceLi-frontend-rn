import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingIndicator = () => (
	<View style={[styles.container, styles.horizontal]}>
	  <ActivityIndicator size="large" />
	</View>
 );
 
 export default LoadingIndicator

 const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: "55%",
	  flex: 1,
	  justifyContent: "center"
	},
	horizontal: {
	  flexDirection: "row",
	  justifyContent: "space-around",
	  padding: 10
	}
 });
 