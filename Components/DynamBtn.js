import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";

const DynamBtn = ({ action, btnText, buttonStyle, disabled }) => {
  return (
    <Pressable
      onPressOut={action}
      style={[styles.button, buttonStyle]}
      disabled={disabled}
    >
      <Text style={styles.text}>{btnText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    padding: "4%",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default DynamBtn;
