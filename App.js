import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCamPermmision: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }

  getCamPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCamPermmision: status === "granted",
      buttonState: "clicked",
    });
  };
  handelBarCodeScanned = async ({ type, Data }) => {
    this.setState({
      scanned: true,
      scannedData: Data,
      buttonState: "normal",
    });
  };
  render() {
    const hasCamPermmision = this.state.hasCamPermmision;
    const scanned = this.state.scanned;
    const buttonState = this.buttonState;

    if (buttonState === "clicked" && hasCamPermmision) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handelBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === "normal") {
      return (
        <View>
          <Image
            style={styles.img}
            source={{
              uri:
                "https://4.imimg.com/data4/JL/US/MY-28451515/bar-code-scanners-500x500.jpg",
            }}
          />
          <Text style={{ top: 170, textAlign: "center", fontSize: 30 }}>
            BarCode Scanner
          </Text>
          <Text>
            {hasCamPermmision === true
              ? this.state.scannedData
              : "Request Camera Permission"}
          </Text>
          <TouchableOpacity onPress={this.getCamPermission} style={styles.btn}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>Scan</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  img: {
    width: 175,
    height: 175,
    left: 100,
    top: 75,
    justifyContent: "center",
  },
  btn: {
    margin: 8,
    backgroundColor: "rgb(217,78,78)",
    padding: 3,
  },
});
