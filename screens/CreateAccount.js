import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import firebase from "firebase";

export default class CreateAccount extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password_comfirm: "",
    };
  }

  createAccount = (name, email, password, password_comfirm) => {
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      password_comfirm !== ""
    ) {
      if (password_comfirm === password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            Alert.alert("Usuário registrado");
            console.log(userCredential.user);

            this.props.navigation.replace("Login");
            firebase
              .database()
              .ref("/users/" + userCredential.user.uid)
              .set({
                email: userCredential.user.email,
                name: name,
              });
          });
      }
    } else {
      Alert.alert("Preencha todos os campos");
    }
  };

  render() {
    const { name, email, password, password_comfirm } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_0.png")}
          style={styles.sideLogoImage}
        ></Image>
        <Text style={styles.textStyle}>Crie sua conta</Text>

        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            onChangeText={(text) => this.setState({ name: text })}
          ></TextInput>

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

          <TextInput
            style={styles.textInput}
            placeholder="Confirme sua senha"
            onChangeText={(text) => this.setState({ password_comfirm: text })}
            secureTextEntry
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.createAccount(name, email, password, password_comfirm)
          }
        >
          <Text style={{ color: "white" }}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    textAlign: "center",
    marginTop: "20%",
    color: "white",
  },
  container: {
    backgroundColor: "#121C39",
    flex: 1,
  },
  sideLogoImage: {
    resizeMode: "contain",
    width: 90,
    height: 90,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "white",
    height: 30,
    width: 350,
    marginTop: 50,
    alignSelf: "center",
    borderRadius: 5,
  },
  button: {
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
});
