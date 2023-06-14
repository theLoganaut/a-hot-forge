import { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DynamBtn from "../Components/DynamBtn";
import { vw, vh, vmin, vmax } from "react-native-expo-viewport-units";
import { FlatGrid, SimpleGrid } from "react-native-super-grid";
import PartModal from "../Components/PartModal";
import Cell from "../Components/Cell";
import { GameContext } from "../Data/StateProvider";

const Base = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { gameData, forgeTrigger } = useContext(GameContext);

  const tempCell = {
    mech: {
      hp: 10,
      dmg: 2,
      friendly: false,
      display: "!!",
    },
    pos: [2, 2],
    id: 123,
  };

  const [grid, setGrid] = useState([
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", tempCell, "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#"],
  ]);

  // set?
  const [movingCells, SetMovingCells] = useState(new Map());
  const updateCellMap = (key, value) => {
    SetMovingCells(movingCells.set(key, value));
  };
  // add points by; updateCellMap(key, value)) where key is start, and value is end

  useEffect(() => {
    // tests if any of the ends are equal, if they are, removes one at random
    // put all the end points in an array
    function mapEndValuesToIndex(objects) {
      const endValues = [];
      const endValueToIndexMap = new Map();
      for (const obj of objects) {
        const end = obj.end;
        if (Array.isArray(end)) {
          for (const value of end) {
            if (!endValues.includes(value)) {
              endValues.push(value);
              endValueToIndexMap.set(value, endValues.length - 1);
            }
          }
        }
      }
      return endValueToIndexMap;
    }

    // function filterByIndices(indices, array) {
    //   return array.filter((index) => indices.includes(index));
    // }

    // let filtered = filterByIndices(
    //   mapEndValuesToIndex(movingCells),
    //   movingCells
    // );

    // updateList = map where start is key and end is value,
    // so updating the grid to grid[end] = grid[start], grid[start] = {}
    function updateGrid(updateList, grid) {
      for (let i = updateList.keys().length; i > 0; i++) {
        grid[updateList[key]] = grid[updateList.next().value];
        grid[updateList.next().value] = "#";
      }
    }

    // this is really the only function that runs here

    // setGrid((grid) => updateGrid(filtered, grid));
  }, [forgeTrigger]);
  //! needs to run and update when the forge updates too, or another game engine tick

  const basePoint = [7, 4];
  // const
  // console.log("grid", grid);
  console.log("to update", movingCells);

  return (
    <View style={{ height: "100%", maxHeight: vh(50) }}>
      <Text>Welcome to the forge</Text>
      {/* creating the grid from an array? */}
      {/* grid wrapper */}
      <PartModal
        errorType={"mechs"}
        modalData={gameData.mechs}
        setModalVisible={setModalVisible}
        modalFunction={null} //placeMech(row, col)
        modalVisible={modalVisible}
      />
      <View
        style={{
          height: "80%",
          width: "80%",
          alignSelf: "center",
        }}
      >
        {grid.map((row, key) => {
          // console.log("row", row);
          return (
            // making the row
            <View
              key={key}
              style={{
                flex: 1,
                flexDirection: "row",
                // borderWidth: 1,
                borderColor: "black",
              }}
            >
              {/* making each cell */}
              {row.map((cell, key) => {
                // console.log("cell", cell);
                let cellInfo = cell;
                return (
                  // <View
                  //   key={key}
                  //   style={{
                  //     flex: 1,
                  //     borderWidth: 1,
                  //     borderColor: "black",
                  //     justifyContent: "center",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   <Text>#</Text>
                  // </View>
                  <Cell
                    key={key}
                    updateGrid={updateCellMap}
                    row={row}
                    cellData={cellInfo}
                    map={grid}
                    finalPos={basePoint}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flexDirection: "row",
    padding: "5%",
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

export default Base;
