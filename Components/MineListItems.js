import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GameContext } from "../Data/StateProvider";
import DynamBtn from "./DynamBtn";

const MineListItems = ({ resourceName, mineLength }) => {
  const { setMineLoads, mineLoads, setMineTrigger } = useContext(GameContext);
  const mineActionHandler = () => {
    // let tempMine = mineLoads[resourceName]?.load.push(1);
    // mineLoads[resourceName]?.load.push(1);
    setMineLoads({
      ...mineLoads,
      [resourceName]: {
        ...mineLoads[resourceName],
        load: mineLoads[resourceName].load + 1,
      },
    });
    // setMineLoads(tempMine);
    setMineTrigger(true);
    console.log(mineLoads);
  };

  // const [mineLoads, setMineLoads] = useState({
  //   Scrap: { load: [], time: 1, max: 10 },
  //   Iron: { load: [], time: 4, max: 5 },
  // });

  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (mineLoads[resourceName]?.load >= mineLoads[resourceName]?.max) {
      //! DISABLE THE BUTTON
    } else {
      //! ENABLE BUTTON
    }

    // counts each empty load, if that is equal to amt of objects in mineLength, disable, else enable
    for (mines in mineLoads) {
      let emptyCount = 0;
      if (mines.load < 1) {
        emptyCount += 1;
      }
      if (emptyCount === mineLength) {
        setMineTrigger(false);
      }
    }
  }, [mineLoads[resourceName]]);

  // console.log(mineLoads[resourceName]?.load.length);
  // console.log(mineLoads);

  return (
    <View style={[styles.wrapper]}>
      {/* indiv item wrapper */}
      <View style={[styles.border, styles.rowWrap]}>
        {/* info box */}
        <View style={[styles.border, { alignItems: "center" }]}>
          {/* info box top, mine name  */}
          <Text>{resourceName}</Text>
        </View>
        <View>
          {/* info box data */}
          <View
            style={[
              styles.wrapper,
              styles.border,
              { justifyContent: "space-between" },
            ]}
          >
            <View>
              <Text>{mineLoads[resourceName]?.load}</Text>
            </View>
            <View>
              {/* likelihood to get a resource? */}
              <Text>TickR</Text>
            </View>
            {/* mech numbers */}
            {/* <View>
              <Text>Mech#</Text>
            </View>
            <View>
              <Text>TickR</Text>
            </View> */}
          </View>
          {/* maybe eventually mech rarities */}
        </View>
      </View>
      <View style={[styles.rightWrap]}>
        {/* right side wrapper */}
        <View style={[styles.buttons]}>
          {/* manual mine button */}
          <DynamBtn btnText={`${resourceName}`} action={mineActionHandler} />
        </View>
        <View style={[styles.buttons]}>
          {/* add mechs to mine */}
          {/* //TODO add dynamic mine button, just mine(resource, amount) */}
          <DynamBtn btnText={"Add Mechs"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    padding: "2%",
  },
  border: {
    borderWidth: 1,
    borderColor: "black",
  },
  buttons: {
    width: "100%",
    paddingLeft: "5%",
  },
  rowWrap: {
    position: "relative",
    flexDirection: "column",
    padding: "5%",
    width: "50%",
  },
  rightWrap: {
    position: "relative",
    width: "50%",
    justifyContent: "space-between",
  },
});

export default MineListItems;
