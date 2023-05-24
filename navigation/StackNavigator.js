import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Details from "../screens/Details";
import Create from "../screens/Create";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
