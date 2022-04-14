import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
// import { Icon } from "react-native-vector-icons/FontAwesome5";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Header(props) {
  return (
    <View>
      <Text style={styles.header}>
        {"  "}
        {props.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#df4600",
    color: "white",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    shadowColor: "#171717",
    elevation: 5,
    zIndex: 0
  },
  icons: {
    marginTop:20,
    fontSize: 20,
    color: "black",
    position: "absolute",
    top: 10,
    right: 350,
    zIndex:1
    // backgroundColor: "#000",
    // zIndex: 1000,
    // width: 100
  },
});
