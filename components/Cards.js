import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import numbro from "numbro";

export default function Cards() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const getTotalIncome = async () => {
      try {
        await axios
          .get(`http://192.168.0.111:8000/api/transactions/incomes`)
          .then((res) => {
            setTotalIncome(res.data.data);
            // console.log(res.data.data);
          })
          .catch((err) => console.log("error: ", err));
      } catch (e) {
        console.log("error: ", e);
      }
    };
    const getTotalExpenses = async () => {
      try {
        await axios
          .get(`http://192.168.0.111:8000/api/transactions/expenses`)
          .then((res) => {
            setTotalExpenses(res.data.data);
            // console.log(res.data.data);
          })
          .catch((err) => console.log("error: ", err));
      } catch (e) {
        console.log("error: ", e);
      }
    };
    getTotalIncome();
    getTotalExpenses();
  }, []);

  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.CardsView}>
        <View style={styles.CardText}>
          <Text style={styles.card}>Income</Text>
          <Text style={{ color: "green" }}>
            +{" "}
            {numbro(totalIncome).format({
              thousandSeparated: true,
              spaceSeparated: false,
              average: true,
              mantissa: 2,
            })}{" "}
            $
          </Text>
        </View>

        <View style={styles.CardText}>
          <Text style={styles.card}>Expense</Text>
          <Text style={{ color: "red" }}>
            -{" "}
            {numbro(totalExpenses).format({
              thousandSeparated: true,
              spaceSeparated: false,
              average: true,
              mantissa: 2,
            })}{" "}
            $
          </Text>
        </View>

        <View style={styles.CardText}>
          <Text style={styles.card}>Total</Text>
          <Text
            style={{
              color: `${totalIncome - totalExpenses > 0 ? "green" : "red"}`,
            }}
          >
            {numbro(totalIncome - totalExpenses).format({
              thousandSeparated: true,
              spaceSeparated: false,
              average: true,
              mantissa: 2,
            })}{" "}
            $
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CardsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  CardText: {
    backgroundColor: "#f3f3f3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
    borderRadius: 7,
  },
  card: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
