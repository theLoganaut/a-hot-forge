import React from "react";
import { useState, useContext, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import DynamBtn from "../Components/DynamBtn";
import { GameContext } from "../Data/StateProvider";
import SelectDropdown from "react-native-select-dropdown";
import * as Progress from "react-native-progress";
import { partData } from "../Data/partList";

const Parts = () => {
  const partSelect = partData;

  const { setPartQueue, partQueue } = useContext(GameContext);

  const [success, setSuccess] = useState(0);

  const [partDetails, setPartDetails] = useState(partSelect[0]);

  //the amount it increases and how much each affects
  const [statIncrease, setStatIncrease] = useState({
    iron: {
      affects: {
        pwr: {
          min: 2,
          max: 4,
        },
        spd: {
          min: 0,
          max: 1,
        },
        pro: {
          min: 0,
          max: 1,
        },
      },
      amount: 0,
    },
    gunpowder: {
      affects: {
        pwr: {
          min: 0,
          max: 1,
        },
        spd: {
          min: 2,
          max: 4,
        },
        pro: {
          min: 1,
          max: 2,
        },
      },
      amount: 0,
    },
    silicon: {
      affects: {
        pwr: {
          min: 0,
          max: 1,
        },
        spd: {
          min: 1,
          max: 3,
        },
        pro: {
          min: 2,
          max: 4,
        },
      },
      amount: 0,
    },
  });

  //the stats that are actually changing
  const [overloadObject, setOverloadObject] = useState({});

  const [statTotal, setStatTotal] = useState({});

  const handleOverload = (resourceString) => {
    if (statIncrease[resourceString].amount >= 4) {
      setStatIncrease({
        ...statIncrease,
        [resourceString]: {
          ...statIncrease[resourceString],
          amount: 0,
        },
      });
    } else {
      setStatIncrease({
        ...statIncrease,
        [resourceString]: {
          ...statIncrease[resourceString],
          amount: statIncrease[resourceString].amount + 1,
        },
      });
    }
  };

  //updates to display the current overload ranges on UI

  useEffect(() => {
    let tempObj = {
      pwr: {
        min: 0,
        max: 0,
      },
      spd: {
        min: 0,
        max: 0,
      },
      pro: {
        min: 0,
        max: 0,
      },
    };
    for (stat in statIncrease.iron.affects) {
      for (resource in statIncrease) {
        tempObj = {
          ...tempObj,
          [stat]: {
            min:
              tempObj[stat].min +
              statIncrease[resource].affects[stat].min *
                statIncrease[resource].amount,
            max:
              tempObj[stat].max +
              statIncrease[resource].affects[stat].max *
                statIncrease[resource].amount,
          },
        };
      }
    }
    total = {
      dur: {
        min:
          tempObj.pwr.min +
          partDetails.base[0].min +
          Math.ceil(tempObj.spd.min / 2),
        max:
          tempObj.pwr.max +
          partDetails.base[0].max +
          Math.ceil(tempObj.spd.max / 2),
      },
      dps: {
        min:
          tempObj.pwr.min +
          partDetails.base[1].min +
          Math.ceil((tempObj.spd.min + partDetails.base[1].min) / 2),
        max:
          tempObj.pwr.max +
          partDetails.base[1].max +
          Math.ceil((tempObj.spd.max + partDetails.base[1].max) / 2),
      },
      prd: {
        min:
          tempObj.pro.min +
          partDetails.base[2].min +
          Math.ceil((tempObj.spd.min + partDetails.base[2].min) / 2),
        max:
          tempObj.pro.max +
          partDetails.base[2].max +
          Math.ceil((tempObj.spd.max + partDetails.base[2].max) / 2),
      },
    };

    //counts the amounts to subtract success
    let newSuccess = 1000;
    for (stat in statIncrease) {
      newSuccess = newSuccess - statIncrease[stat].amount * 130;
    }

    setSuccess(newSuccess / 1000);
    setOverloadObject(tempObj);
    setStatTotal(total);
  }, [statIncrease, partDetails]);

  const buttonMap = {};

  //!template for the part data
  // let newPart = {
  //   type: current.name,
  //   dur: statFinalizer(current.dur.min, current.dur.max),
  //   dps: statFinalizer(current.dps.min, current.dps.max),
  //   prd: statFinalizer(current.prd.min, current.prd.max),
  //   cost: current.cost,
  // };

  const handlePartQueuePush = () => {
    let tempTime =
      statIncrease.iron.amount +
      partDetails.cost[0].amount +
      statIncrease.gunpowder.amount +
      partDetails.cost[1].amount +
      statIncrease.silicon.amount +
      partDetails.cost[2].amount;
    let tempPart = {
      type: partDetails.name,
      dur: {
        min: statTotal.dur.min,
        max: statTotal.dur.max,
      },
      dps: {
        min: statTotal.dps.min,
        max: statTotal.dps.max,
      },
      prd: {
        min: statTotal.prd.min,
        max: statTotal.prd.max,
      },
      cost: {
        iron: statIncrease.iron.amount + partDetails.cost[0].amount,
        gunpowder: statIncrease.gunpowder.amount + partDetails.cost[1].amount,
        silicon: statIncrease.silicon.amount + partDetails.cost[2].amount,
      },
      time: tempTime,
      success: success,
    };
    setPartQueue([...partQueue, tempPart]);
  };

  return (
    <View
      style={{
        height: "100%",
        maxHeight: vh(50),
      }}
    >
      {/* select part type */}
      <SelectDropdown
        buttonStyle={{
          backgroundColor: null,
          borderWidth: 1,
          borderColor: "black",
          alignSelf: "center",
          margin: 5,
        }}
        dropdownStyle={{
          marginTop: "-9%",
          height: "37%",
          padding: 10,
          borderBottomColor: null,
        }}
        rowStyle={{ borderTopWidth: 1, borderColor: "lightgray" }}
        defaultButtonText="select part type"
        data={partData}
        onSelect={(selectedItem, index) => {
          setPartDetails(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
      />

      {/* stat ranges */}

      {/* <StatRanges
        partDetails={partDetails}
        overloadObject={overloadObject}
        statTotal={statTotal}
        success={success}
      /> */}
      <View style={styles.row}>
        {partDetails?.base.map((stat, index) => {
          // console.log(overloadObject[stat.name]);
          return (
            <View
              style={{ alignItems: "center", justifyContent: "center" }}
              key={index}
            >
              <Text>{stat.name}</Text>
              <View>
                <Text>
                  {stat.min}⇔{stat.max}
                </Text>
                {overloadObject[stat.name]?.max > 0 ? (
                  <Text style={{ alignSelf: "center" }}>
                    {overloadObject[stat.name].min}⇔
                    {overloadObject[stat.name].max}
                  </Text>
                ) : (
                  <Text style={{ color: "lightblue", alignSelf: "center" }}>
                    0⇔0
                  </Text>
                )}
              </View>
            </View>
          );
        })}
        <Text style={{ alignSelf: "center" }}>|</Text>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center" }}>Totals</Text>
          <Text style={{ alignSelf: "center" }}>
            DUR:{statTotal.dur?.min}⇔{statTotal.dur?.max}
          </Text>
          <Text style={{ alignSelf: "center" }}>
            DPS:{statTotal.dps?.min}⇔{statTotal.dps?.max}
          </Text>
          <Text style={{ alignSelf: "center" }}>
            PRD:{statTotal.prd?.min}⇔{statTotal.prd?.max}
          </Text>
        </View>

        <Text style={{ alignSelf: "center" }}>|</Text>
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text style={{ alignSelf: "center" }}>success:</Text>
          <Progress.Circle
            showsText={true}
            progress={success}
            textStyle={{ fontSize: 16 }}
            size={60}
            thickness={3}
            duration={1000}
          />
        </View>
      </View>

      {/* part costs and part type stat mulipliers */}
      <View style={styles.row}>
        {partDetails?.cost.map((resource, index) => {
          return (
            <View key={index}>
              <View style={{ flexDirection: "row", margin: 5 }}>
                <View
                  style={[
                    styles.overloadIndicator,
                    {
                      backgroundColor:
                        statIncrease[resource.full].amount >= 1
                          ? "blue"
                          : "white",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.overloadIndicator,
                    {
                      backgroundColor:
                        statIncrease[resource.full].amount >= 2
                          ? "blue"
                          : "white",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.overloadIndicator,
                    {
                      backgroundColor:
                        statIncrease[resource.full].amount >= 3
                          ? "blue"
                          : "white",
                    },
                  ]}
                />
                <View
                  style={[
                    styles.overloadIndicator,
                    {
                      backgroundColor:
                        statIncrease[resource.full].amount >= 4
                          ? "blue"
                          : "white",
                    },
                  ]}
                />
              </View>
              <DynamBtn
                btnText={`${resource.name}: ${
                  statIncrease[resource.full].amount
                }`}
                key={index}
                action={() => handleOverload(resource.full)}
              />
            </View>
          );
        })}
      </View>

      <View></View>
      {/* spec and create buttons */}
      <View style={styles.row}>
        <DynamBtn btnText={"+Spec"} />
        <DynamBtn btnText={"=Spec"} />
        <DynamBtn btnText={"Create"} action={handlePartQueuePush} />
      </View>
      {/* progress bar */}
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  overloadIndicator: {
    borderWidth: 1,
    height: 10,
    flex: 1,
    margin: 1,
  },
});

export default Parts;
