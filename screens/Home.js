import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { ListItem } from "react-native-elements";

import firebase from "firebase";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      lembretes: {},
      l: "",
    };
  }

  renderItem = ({ item: lembrete }) => {
    return (
      /*
      <View style={{ flex: 0.15 }}>
        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details")}
          style={styles.reminderButtonStyle}
        >
          <Text>{lembrete}</Text>
        </TouchableOpacity>
        
      </View>
      */
      <Text>{this.state.lembretes}</Text>

      //<ListItem title={"Lembrete"} subtitle={"ok"} bottomDivider></ListItem>
    );
  };

  componentDidMount() {
    this.fetchReminder();
  }

  fetchReminder = async () => {
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid + "/reminders/")
      .on(
        "value",
        (snapshot) => {
          var lembrete = [];
          if (snapshot.val()) {
            // console.log(snapshot.val())
            Object.keys(snapshot.val()).forEach(function (key) {
              lembrete.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          console.log("lembrete = " + lembrete);
          this.setState({ lembretes: lembrete }, () =>
            console.log("lembretes: " + this.state.lembretes)
          );
          console.log("linha 60 = " + this.state.lembretes.length);
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  render() {
    const lembretes = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textStyle}>Tela de lembretes</Text>
          <Image
            source={require("../assets/logo_0.png")}
            style={styles.sideLogoImage}
          ></Image>
        </View>

        {this.state.lembretes && this.state.lembretes.length === 0 ? (
          <Text style={styles.textStyle}>Sem lembretes</Text>
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.lembretes}
              renderItem={({ item, index }) => {
                console.log("item: " + item.value.title);
                return (
                  <ListItem
                    title={item.value.title}
                    textStyle={{ color: "snow" }}
                    containerStyle={{
                      backgroundColor: "snow",
                      marginTop: "5%",
                      borderRadius: 15,
                    }}
                    bottomDivider={true}
                  >
                    <View>
                      <Text style={{ color: "black", fontSize: 18}}>
                        {item.value.title}
                      </Text>
                      <Text style={{ color: "dark-gray", fontSize: 15}}>
                        {item.value.details}
                      </Text>
                    
                      <Text style={{ color: "dark-gray", fontSize: 16}}>
                        {"Data: " + item.value.date + "      " + "Hora: " + item.value.time}
                      </Text>
                    </View>
                  </ListItem>
                );
              }}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.createReminderButton}
          onPress={() => this.props.navigation.navigate("Create")}
        >
          <Text style={{ color: "white", fontSize: 33 }}>+</Text>
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
  createReminderButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: "80%",
    marginTop: "10%",
    marginBottom: "7%",
    backgroundColor: "#EE3B40",
    alignItems: "center",
  },
  reminderButtonStyle: {
    backgroundColor: "white",
    width: 100,
    height: 30,
    borderRadius: 11,
    marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
  },
  header: {
    flex: 0.2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
