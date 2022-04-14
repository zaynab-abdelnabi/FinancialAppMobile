import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  ScrollView,
  Picker,
  Pressable,
} from "react-native";
import axios from "axios";
import { Header, Footer, DatePicker } from "../components";

export default function AddTransaction({ navigation }) {
  const [view, setView] = useState(true);
  const [title, setTitle] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [textArea, setTextArea] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        await axios
          .get(`http://192.168.0.111:8000/api/categories`)
          .then((res) => {
            setCategories(res.data.data);
            // console.log(res.data.data);
          })
          .catch((err) => console.log("error: ", err));
      } catch (e) {
        console.log("error: ", e);
      }
    };
    getCategories();
  }, []);

  const getByType = (type) => {
    return categories.filter((category) => category.type === type);
  };

  const onSubmitHandler = async () => {
    let data = {
      title: title,
      category_id: selectedCategory,
      amount: amount,
      currency: selectedCurrency,
      date: date,
      description: textArea,
    };

    try {
      await axios
        .post(`http://192.168.0.111:8000/api/transactions/create/fixed`, data)
        .then((res) => {
          setTitle("");
          setAmount("");
          setSelectedCurrency("$");
          setSelectedCategory("");
          setTextArea("");

          navigation.navigate("Income");
        })
        .catch((err) => console.log("error: ", err));
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#a04610" />
      <View style={{ flex: 1 }}>
        <Header title="Add Transaction" />
        <View
          style={{
            width: "100%",
            // flex: 1,
            display: "flex",
            flexDirection: "row",
            padding: 20,
            paddingHorizontal: 30,
          }}
        >
          <Pressable style={{ width: "50%" }} onPress={() => setView(true)}>
            <Text style={view ? styles.active : styles.inactive}>Income</Text>
          </Pressable>
          <Pressable style={{ width: "50%" }} onPress={() => setView(false)}>
            <Text style={!view ? styles.active : styles.inactive}>Expense</Text>
          </Pressable>
        </View>
        <ScrollView>
          <View style={{ padding: 10, paddingTop: 0 }}>
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="title"
            />
            <View
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <Picker.Item label="choose a category" value="" color="#999" />
                {view
                  ? getByType("income").map((elt) => (
                      <Picker.Item
                        key={elt.id}
                        label={elt.name}
                        value={elt.id}
                      />
                    ))
                  : getByType("expense").map((elt) => (
                      <Picker.Item
                        key={elt.id}
                        label={elt.name}
                        value={elt.id}
                      />
                    ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setAmount}
              value={amount}
              placeholder="amount"
              keyboardType="numeric"
            />
            <View
              style={{
                borderColor: "#ccc",
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <Picker
                selectedValue={selectedCurrency}
                onValueChange={(value) => setSelectedCurrency(value)}
              >
                <Picker.Item label="$" value="$" />
                <Picker.Item label="L.L." value="L.L." />
              </Picker>
            </View>
            <View>
              <DatePicker dateHandler={(date) => setDate(date)} />
            </View>

            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={7}
              onChangeText={setTextArea}
              value={textArea}
              placeholder="description"
            />
            <View style={styles.formBtns}>
              <Text>
                <Button
                  onPress={onSubmitHandler}
                  title="Submit"
                  color="#df4600"
                />
              </Text>
              <Text style={{ paddingLeft: 10 }}>
                <Button
                  onPress={() => navigation.goBack()}
                  title="Cancel"
                  color="#555"
                />
              </Text>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    backgroundColor: "transparent",
    padding: 10,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
  },
  textArea: {
    marginVertical: 10,
    backgroundColor: "transparent",
    padding: 10,
    textAlignVertical: "top",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
  },
  formBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
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
});
