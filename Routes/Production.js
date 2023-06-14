import { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { vh } from "react-native-expo-viewport-units";
import DynamBtn from "../Components/DynamBtn";
import { GameContext } from "../Data/StateProvider";

function Production() {
  const [metal, setMetal] = useState(0);
  const [sulfur, setSulfur] = useState(0);
  const [silicon, setSilicon] = useState(0);

  const setMaterial = (action, amount, operand) => {
    action((material) => {
      if (operand == "-") {
        if (material - amount >= 0) {
          return material - amount;
        } else {
          return 0;
        }
      } else {
        return material + amount;
      }
    });
  };
  const { createPart, manualForge } = useContext(GameContext);

  return (
    <View style={{ height: "100%", maxHeight: vh(50) }}>
      {/* <View
        style={{
          // flex: 1,
          // flexDirection: "row",
          // marginTop: "-80%",
          height: "30%",
          justifyContent: "center",
        }}
      > */}
      <View style={{ padding: 10, alignSelf: "center" }}>
        <Text>Welcome to Production</Text>
      </View>

      {/* </View> */}
      <View style={[styles.row, {}]}>
        {/* action area wrapper */}
        <View style={[styles.col, { justifyContent: "center" }]}>
          {/* left side, mat adder, makes children rows */}
          <View style={[styles.col]}>
            <View style={styles.row}>
              {/* -5 */}
              <DynamBtn
                action={() => setMaterial(setMetal, 5, "-")}
                btnText={"-5"}
              />
              <DynamBtn
                action={() => setMaterial(setSulfur, 5, "-")}
                btnText={"-5"}
              />
              <DynamBtn
                action={() => setMaterial(setSilicon, 5, "-")}
                btnText={"-5"}
              />
            </View>
            <View style={styles.row}>
              {/* -1 */}
              <DynamBtn
                action={() => setMaterial(setMetal, 1, "-")}
                btnText={"-1"}
              />
              <DynamBtn
                action={() => setMaterial(setSulfur, 1, "-")}
                btnText={"-1"}
              />
              <DynamBtn
                action={() => setMaterial(setSilicon, 1, "-")}
                btnText={"-1"}
              />
            </View>
            <View
              style={[
                styles.row,
                { alignItems: "center", alignContent: "center" },
              ]}
            >
              {/* amount being used */}
              <View>
                <Text>{metal}</Text>
              </View>
              <View>
                <Text>{sulfur}</Text>
              </View>
              <View>
                <Text>{silicon}</Text>
              </View>
            </View>
            <View style={styles.row}>
              {/* +1 */}
              <DynamBtn
                action={() => setMaterial(setMetal, 1, "+")}
                btnText={"+1"}
              />
              <DynamBtn
                action={() => setMaterial(setSulfur, 1, "+")}
                btnText={"+1"}
              />
              <DynamBtn
                action={() => setMaterial(setSilicon, 1, "+")}
                btnText={"+1"}
              />
            </View>
            <View style={styles.row}>
              {/* +5 */}
              <DynamBtn
                action={() => setMaterial(setMetal, 5, "+")}
                btnText={"+5"}
              />
              <DynamBtn
                action={() => setMaterial(setSulfur, 5, "+")}
                btnText={"+5"}
              />
              <DynamBtn
                action={() => setMaterial(setSilicon, 5, "+")}
                btnText={"+5"}
              />
            </View>
          </View>

          <View
            style={[styles.row, { height: "100%", alignItems: "flex-end" }]}
          >
            {/* create part */}
            <DynamBtn
              action={() => createPart(metal, sulfur, silicon)}
              btnText={"Create Part"}
              buttonStyle={{
                maxHeight: vh(5),
                // marginTop: 10,
                width: "90%",
                height: "100%",
              }}
            />
          </View>
        </View>
        <View
          style={[
            styles.col,
            {
              alignContent: "space-between",
            },
          ]}
        >
          {/* right side, creation changer  */}
          <View style={[styles.row, { overflow: "hidden", flex: 2 }]}>
            {/* mat ratio chart */}
            <DynamBtn action={null} btnText={"M"} />
            <DynamBtn action={null} btnText={"Su"} />
            <DynamBtn action={null} btnText={"Si"} />
          </View>
          <View
            style={[
              styles.col,
              {
                flex: 3,
                justifyContent: "flex-end",
              },
            ]}
          >
            {/* +5 */}
            <DynamBtn action={null} btnText={"Armament"} />
            <DynamBtn action={null} btnText={"Engine"} />
            <DynamBtn action={null} btnText={"Locomotion"} />
            <DynamBtn action={null} btnText={"Processor"} />
            <DynamBtn action={null} btnText={"Chassis"} />
          </View>
        </View>
      </View>
    </View>
  );
}

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
});

export default Production;
