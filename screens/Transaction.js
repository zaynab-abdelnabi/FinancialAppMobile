import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import axios from "axios";
import numbro from "numbro";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";

import { Header, Footer, Cards } from "../components";

export default function Transaction({ navigation }) {
  const [data, setData] = useState([]);
  const [view, setView] = useState("all");
  const [loading, setLoading] = useState(true);

  const getData = async (type = "all") => {
    try {
      await axios
        .get(`http://192.168.0.111:8000/api/transactions/${type}`)
        .then((res) => {
          setData(res.data.data);
          setLoading(false);

          // console.log(res.data.data);
        })
        .catch((err) => console.log("error: ", err));
    } catch (e) {
      console.log("error: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`http://192.168.0.111:8000/api/transactions/${id}`)
      .then((res) => {
        let newData = [...data].filter((elt) => {
          return elt.id !== id;
        });
        setData(newData);
        // console.log(newData);
      })
      .catch((err) => console.log(err));
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.TranView}>
      <View>
        <Text style={{ fontWeight: "bold", color: "#df4600" }}>
          {item.title}
        </Text>
        <Text style={styles.smalltext}>{item.category.name}</Text>
      </View>

      <View style={styles.DateAmountView}>
        <Text style={({ textAlign: "right" }, styles.smalltext)}>
          {item.date}{" "}
          <FontAwesome5
            name={"calendar"}
            style={{ textAlign: "right", marginLeft: 5 }}
            light
          />
        </Text>

        <Text
          style={
            item.category.type === "income" ? styles.income : styles.expense
          }
        >
          {item.category.type === "income" ? "+" : "-"}{" "}
          {numbro(item.amount).format({ thousandSeparated: true })} $
        </Text>
      </View>

      <View style={styles.DescView}>
        <Text style={{ textDecorationLine: "underline" }}>Description:</Text>
        <Text style={styles.Desc}>{item.description}</Text>
      </View>

      <View style={styles.ButtonView}>
        <Pressable
          onPress={() => navigation.navigate("EditTransaction", item)}
          style={{
            backgroundColor: "green",
            marginRight: 8,
            borderRadius: 5,
          }}
        >
          <Text style={styles.buttons}>
            <FontAwesome5 name={"edit"} />
          </Text>
        </Pressable>
        <Pressable
          onPress={() => deleteItem(item.id)}
          style={{ backgroundColor: "red", borderRadius: 5 }}
        >
          <Text style={styles.buttons}>
            <FontAwesome5 name={"trash"} />
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#a04610" />

      <View style={{ flex: 1 }}>
        <Header title="Transactions" />
        <Cards />
        <View
          style={{
            width: "100%",
            // flex: 1,
            display: "flex",
            flexDirection: "row",
            padding: 10,
            paddingHorizontal: 30,
          }}
        >
          <Pressable
            style={{ width: "30%" }}
            onPress={() => {
              if (view != "all") {
                setLoading(true);
                setView("all");
                getData();
              }
            }}
          >
            <Text style={view === "all" ? styles.active : styles.inactive}>
              All
            </Text>
          </Pressable>
          <Pressable
            style={{ width: "30%" }}
            onPress={() => {
              if (view != "income") {
                setLoading(true);
                setView("income");
                getData("income");
              }
            }}
          >
            <Text style={view === "income" ? styles.active : styles.inactive}>
              Income
            </Text>
          </Pressable>
          <Pressable
            style={{ width: "30%" }}
            onPress={() => {
              if (view != "expense") {
                setLoading(true);
                setView("expense");
                getData("expense");
              }
            }}
          >
            <Text style={view === "expense" ? styles.active : styles.inactive}>
              Expense
            </Text>
          </Pressable>
        </View>
        <View style={styles.AllTranView}>
          {loading ? (
            <LottieView
              style={{
                width: 100,
                height: 100,
                // resizeMode: "contain",
              }}
              source={require("../assets/lf30_editor_illezvgi.json")}
              autoPlay
              loop
            />
          ) : (
            <FlatList
              style={{ width: "100%", marginBottom: 110 }}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
        <Footer navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  AllTranView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  TranView: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    paddingBottom: 25,
    margin: 5,
    width: "95%",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  DescView: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 4,
  },
  smalltext: {
    color: "#555",
    fontSize: 12,
  },
  ButtonView: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttons: {
    color: "white",
    padding: 8,
  },
  active: {
    color: "#df4600",
    borderBottomColor: "#df4600",
    borderBottomWidth: 2,
    borderStyle: "solid",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  inactive: {
    color: "#000",
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  income: {
    textAlign: "right",
    color: "green",
    fontSize: 20,
    paddingTop: 3,
  },
  expense: {
    textAlign: "right",
    color: "red",
    fontSize: 20,
    paddingTop: 3,
  },
});
