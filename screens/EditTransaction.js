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
} from "react-native";
import axios from "axios";
import { Header, Footer, DatePicker } from "../components";

export default function EditTransaction({ route, navigation }) {
  const [title, setTitle] = useState(route.params.title);
  const [amount, setAmount] = useState(route.params.amount);
  const [date, setDate] = useState(route.params.date);

  const [selectedCurrency, setSelectedCurrency] = useState(
    route.params.currency
  );
  const [selectedCategory, setSelectedCategory] = useState(
    route.params.category_id
  );
  const [categories, setCategories] = useState([]);
  const [textArea, setTextArea] = useState(route.params.description);

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

  const getByType = (arr = categories, type = route.params.category.type) => {
    return arr.filter((category) => category.type === type);
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
        .put(
          `http://192.168.0.111:8000/api/transactions/edit/fixed/${route.params.id}`,
          data
        )
        .then((res) => {
          setTitle("");
          setAmount("");
          setSelectedCurrency("$");
          setSelectedCategory("");
          setTextArea("");

          // console.log(res.data.data);

          navigation.navigate("Income", data);
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
        <Header title="Edit Transaction"/>
        <ScrollView>
          <View style={{ padding: 10 }}>
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
                {getByType().map((elt) => (
                  <Picker.Item key={elt.id} label={elt.name} value={elt.id} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setAmount}
              value={amount.toString()}
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
              <DatePicker
                dateHandler={(date) => setDate(date)}
                dateToEdit={date}
              />
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
              <Text style={{paddingLeft: 10 }}>
                <Button
                  onPress={() => navigation.goBack()}
                  title="Discard"
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
});
