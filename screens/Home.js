import { StatusBar, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Header, Footer, Cards, Chart } from "../components";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#a04610" />
      <View style={{ flex: 1 }}>
        <Header title="Home" />
        <Cards />
        <View
          style={{
            flex: 1,
            // width: "90%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ScrollView style={{ flex: 1 }}>
            <Chart />
          </ScrollView>
        </View>

        <Footer navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
