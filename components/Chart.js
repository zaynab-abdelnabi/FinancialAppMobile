import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";

const screenWidth = Dimensions.get("window").width;

export default function Chart() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("monthly");
  const [range, setRange] = useState(0);
  const getRecords = async (value = "monthly", range = 0) => {
    setType(type);
    setRange(range);
    try {
      await axios
        .get(
          `http://192.168.0.111:8000/api/transactions/mobile/${value}?range=${range}`
        )
        .then((res) => {
          // console.log(res.data.data);

          setRecords(res.data.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <>
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
        <View style={styles.chart}>
          <View style={styles.ChartBtns}>
            <View style={styles.prev_next}>
              <Pressable
                onPress={() => {
                  // setRange(range - 1);
                  getRecords(type, range - 1);
                }}
              >
                <FontAwesome5 style={styles.ChartRange} name={"chevron-left"} />
              </Pressable>
              <Pressable
                onPress={() => {
                  getRecords(type, range + 1);
                }}
              >
                <FontAwesome5
                  style={styles.ChartRange}
                  name={"chevron-right"}
                />
              </Pressable>
            </View>
            <View style={styles.type}>
              <Pressable
                onPress={() => {
                  getRecords("weekly");
                }}
              >
                <Text style={styles.ChartBtn}>W</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  getRecords();
                }}
              >
                <Text style={styles.ChartBtn}>M</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  getRecords("yearly");
                }}
              >
                <Text style={styles.ChartBtn}>Y</Text>
              </Pressable>
            </View>
          </View>
          <LineChart
            data={{
              labels: records.map((elt) => elt.date),
              datasets: [
                {
                  data: records.map((elt) => elt.income),
                  color: (opacity = 1) => `green`,
                  labelColor: (opacity = 1) => `green`,
                  fillShadowGradient: "green",
                  fillShadowGradientOpacity: 5,
                },
                {
                  data: records.map((elt) => elt.expense),
                  color: (opacity = 1) => `#DF4600`,
                  labelColor: (opacity = 1) => `#DF4600`,
                  fillShadowGradient: "#DF4600",
                  fillShadowGradientOpacity: 5,
                },
              ],
              legend: ["income", "expenses"],
            }}
            yLabelsOffset={10}
            width={screenWidth - 0.15 * screenWidth} // from react-native
            height={360}
            yAxisLabel="$"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              // styles: {
              //   marginVertical: 40,
              //   paddingVertical: 40,
              // },
              useShadowColorFromDataset: true,
              backgroundColor: "#efefef",
              backgroundGradientFrom: "#efefef",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `#555`,
              labelColor: (opacity = 1) => `#555`,
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                // stroke: "#DF460050",
              },
              propsForVerticalLabels: {
                // rotation:"-90"
                // height:"100"
              },
            }}
            // style={{ marginVertical: 40, paddingVertical: 40 }}
            verticalLabelRotation={-90}
            xLabelsOffset={50}
            bezier
            flatColor={false}
            fromZero={true}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chart: {
    padding: 10,
    paddingBottom: 20,
    backgroundColor: "#efefef",
    borderRadius: 16,
    margin: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  ChartBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ChartBtn: {
    backgroundColor: "#DF4600",
    color: "#FFFFFF",
    width: 33,
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  prev_next: {
    display: "flex",
    flexDirection: "row",
  },
  ChartRange: {
    color: "#DF4600",
    borderColor: "#DF4600",
    borderWidth: 2,
    borderStyle: "solid",
    width: 30,
    height: 30,
    lineHeight: 20,
    textAlign: "center",
    paddingVertical: 5,
    marginHorizontal: 5,
  },
});
