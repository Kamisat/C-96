import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class Details extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textStyle}>Detalhes do lembrete</Text>
          <Image
            source={require("../assets/logo_0.png")}
            style={styles.sideLogoImage}
          ></Image>
        </View>
        <Text style={styles.textStyle}>
          {this.props.route.params.lembrete.details}
        </Text>
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
  header: {
    flex: 0.2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  sideLogoImage: {
    resizeMode: "contain",
    width: 90,
    height: 90,
    alignSelf: "flex-end",
    marginTop: 20,
  },
});
