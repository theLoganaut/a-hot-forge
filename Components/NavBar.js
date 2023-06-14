import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NavBar = ({ setScreen }) => {
  return (
    <View style={navStyles.navBar}>
      <TouchableOpacity
        onPress={() => setScreen("Mine")}
        style={navStyles.navButton}
      >
        <Text style={navStyles.navText}>Mine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setScreen("Forge")}
        style={navStyles.navButton}
      >
        <Text style={navStyles.navText}>Forge</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setScreen("Parts")}
        style={navStyles.navButton}
      >
        <Text style={navStyles.navText}>Parts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setScreen("Mechs")}
        style={navStyles.navButton}
      >
        <Text style={navStyles.navText}>Mechs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setScreen("Patrol")}
        style={navStyles.navButton}
      >
        <Text style={navStyles.navText}>Ptrl</Text>
      </TouchableOpacity>
    </View>
  );
};

const navStyles = StyleSheet.create({
  navBar: {
    position: "relative",
    flexDirection: "row",
    padding: "5%",
    justifyContent: "space-evenly",
  },
  navButton: {
    borderColor: "black",
    borderWidth: 1,
    top: 0,
    left: 0,
    position: "relative",
  },
  navText: {
    padding: "4%",
  },
});

export default NavBar;
