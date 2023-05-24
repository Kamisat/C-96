import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import firebase from "firebase";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  signIn = async (email, password) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_0.png")}
          style={styles.logoImage}
        ></Image>
        <Text style={styles.titleText}>Fazer login</Text>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="Senha"
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.signIn(email, password)}
          >
            <Text style={{ color: "white" }}>Fazer Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => this.props.navigation.navigate("CreateAccount")}
          >
            <Text style={{ color: "#EE3B40" }}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121C39",
    flex: 1,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "white",
    height: 30,
    width: 350,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#EE3B40",
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
    marginLeft: "38%",
    marginRight: "50%",
  },
  logoImage: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 40,
  },
  createAccountButton: {
    borderRadius: 5,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30%",
    marginLeft: "38%",
    marginRight: "50%",
  },
});
