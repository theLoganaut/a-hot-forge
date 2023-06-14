import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { vw, vh } from "react-native-expo-viewport-units";

const EventBox = () => {
  const premade = [
    "the forge is dark",
    "the forge lights ablaze",
    "the forge roars, a room grows from its side",
    "a traveller wanders",
  ];

  const [state, setstate] = useState(premade);

  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 1,
        minHeight: vh(20),
        maxHeight: vh(25),
        alignContent: "center",
      }}
    >
      {/* container and scrollbox */}
      <FlatList
        data={state}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item) => item}
      />
      {/* {state.map((phrase, id) => {
        return <Text key={`${id}`}>{phrase}</Text>;
      })} */}
    </View>
  );
};

export default EventBox;
