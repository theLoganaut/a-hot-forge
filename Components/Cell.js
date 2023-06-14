import React, { useState, useEffect } from "react";
import DynamBtn from "./DynamBtn";
import { GameContext } from "../Data/StateProvider";
import useNeighbors from "../Data/useNeighbors";

export const Cell = ({
  map,
  cellData,
  removeCell,
  finalPos,
  setModalVisible,
  modalVisible,
  updateCellMap,
  row,
}) => {
  // hp, dmg
  // let cell = cellData;
  const [cellState, setCellState] = useState();
  // returns this cells nearest point, as an array
  const { getNeighbors } = useNeighbors();

  useEffect(() => {
    if (cellData !== "#") {
      //updates the parent cell map with key: value -> start pos: final pos
      setCellState(getNeighbors(map, cellData.pos, finalPos));
      // updateCellMap(cellData.pos, endingPoint);
      // setCellState(endingPoint);
    }
  }, []);

  if (cellData !== "#") {
    console.log(cellState);
  }
  // if (Object.keys(cellData).length !== 0) {
  //   console.log(cellData);
  // }
  // console.log(row);
  // console.log("cell", cell);

  return (
    <DynamBtn
      action={() => setModalVisible(!modalVisible)}
      btnText={cellData.mech ? cellData.mech.display : "#"}
    />
  );
};

export default Cell;
