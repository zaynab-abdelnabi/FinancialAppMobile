// import { StatusBar } from "expo-status-bar";
// import { getStatusBarHeight } from "react-native-status-bar-height";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home, Transaction, AddTransaction, EditTransaction } from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="AddTransaction" component={AddTransaction} />
          <Stack.Screen name="EditTransaction" component={EditTransaction} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    // marginTop: getStatusBarHeight() + 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
});
