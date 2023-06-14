import DynamBtn from "../Components/DynamBtn";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { GameContext } from "../Data/StateProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MineListItems from "../Components/MineListItems";

const Mine = () => {
  const {} = useContext(GameContext);

  const scrapMine = { id: "1", name: "scrap", mechList: [] };

  const ironMine = { id: "2", name: "iron", mechList: [] };

  const manureMine = { id: "3", name: "manure(Nitrate)", mechList: [] };
  const sandMine = { id: "4", name: "sand(Silicon)", mechList: [] };

  const [mineArray, setMineArray] = useState([
    scrapMine,
    // ironMine,
    // manureMine,
    // sandMine,
  ]);

  return (
    <View style={{ height: "100%", maxHeight: vh(50) }}>
      <Text>Welcome to the Mine</Text>

      <View>
        <View>{/* top bar that holds mining per tick data */}</View>
        {/* //TODO make this a scrollable */}
        <View>
          {/* the for each array that shows each mine button */}
          <FlatList
            data={mineArray}
            renderItem={({ item }) => (
              <MineListItems
                resourceName={item.name}
                mineLength={mineArray.length}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          {/* {mineArray.map((mine, key) => {
            return (
              <MineListItems
                key={key}
                resourceName={mine.name}
                mineLength={mineArray.length}
              />
            );
          })} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: "black",
    borderWidth: 1,
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    padding: "4%",
  },
});
export default Mine;
