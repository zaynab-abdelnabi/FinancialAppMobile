import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Footer(props) {
  // const navigation = useNavigation();
  return (
    <View style={styles.Bar}>
      <Pressable onPress={() => props.navigation.navigate("Home")}>
        <Text style={{ padding: 10 }}>
          <FontAwesome5 style={styles.icons} name={"home"} solid />
        </Text>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate("AddTransaction")}>
        <Text
          style={{
            borderRadius: 50,
            borderColor: "#aaa",
            borderWidth: 1,
            borderStyle: "solid",
            paddingVertical: 10,
            paddingHorizontal: 13,
          }}
        >
          <FontAwesome5 style={styles.icons} name={"plus"} solid />
        </Text>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate("Transaction")}>
        <Text style={{ padding: 10 }}>
          <FontAwesome5 style={styles.icons} name={"coins"} solid />
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: "#efefef",
    shadowColor: "#171717",
    shadowOffset: { width: 2, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    // zIndex: 100,
    position:"absolute",
    bottom: 0,
    width: "100%",
    // right: "50%",
  },
  icons: {
    fontSize: 23,
    color: "#aaa",
  },
});
