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

export default class Create extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      details: "Indefinido",
      date: "Indefinido",
      time: "Indefinido",
    };
  }

  createReminder = (title, details, date, time) => {
    
    if (title !== "") {
      let reminder = {
        title: this.state.title,
        details: this.state.details,
        date: this.state.date,
        time: this.state.time,
      };
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid + "/reminders/" +(Math.random().toString(36).slice(2)))
        .set(reminder);

        this.props.navigation.replace("Home");

    }else{
      Alert.alert("Preencha ao menos o título")
    }
    
  };

  render() {
    const {title, details, date, time} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_0.png")}
          style={styles.sideLogoImage}
        ></Image>
        <Text style={styles.textStyle}>Definir novo lembrete:</Text>

        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Título"
            onChangeText={(text) => this.setState({ title: text })}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="Detalhes"
            onChangeText={(text) => this.setState({ details: text })}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="Data"
            onChangeText={(text) => this.setState({ date: text })}
          ></TextInput>

          <TextInput
            style={styles.textInput}
            placeholder="Horário"
            onChangeText={(text) => this.setState({ time: text })}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.createReminder(title, details, date, time)}
        >
          <Text style={{ color: "white" }}>Comfirmar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    marginTop: "20%",
    marginLeft: "20%",
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
