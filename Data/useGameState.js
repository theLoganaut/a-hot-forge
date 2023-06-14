import React, { useState, useEffect, useTransition } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { partData } from "./partList";
import { tempMechs } from "./tempData";
function useGameState() {
  const [isPending, startTransition] = useTransition();
  //background time counter
  const [gameClock, setGameClock] = useState(0);

  //! NEW STATE VALUES

  //looks like i have to use cap names?
  const tempGameRaw = {
    scrap: 0,
    ore: 0,
    waste: 0,
    sand: 0,
  };

  const tempGameSmelted = {
    iron: 0,
    gunpowder: 0,
    silicon: 0,
  };

  const tempParts = {
    arms: [
      {
        id: "123",
        tier: 1,
        type: "arms",
        durability: 2,
        damage: 5,
        speed: 3,
        processing: 1,
      },
    ],
    engine: [
      {
        id: "123",
        tier: 1,
        type: "engine",
        durability: 4,
        damage: 0,
        speed: 2,
        processing: 1,
      },
    ],
    locomotion: [
      {
        id: "123",
        tier: 1,
        type: "locomotion",
        durability: 4,
        damage: 2,
        speed: 10,
        processing: 2,
      },
    ],
    processors: [
      {
        id: "123",
        tier: 1,
        type: "processors",
        durability: 0,
        damage: 1,
        speed: 2,
        processing: 6,
      },
    ],
    chassis: [
      {
        id: "123",
        tier: 1,
        type: "chassis",
        durability: 5,
        damage: 0,
        speed: -2,
        processing: 0,
      },
    ],
  };

  const tempPatrols = [
    {
      patrolId: "123",
      patrolLocation: "All",
      stats: { durability: 5, damage: 0, speed: -2, processing: 0 },
      mechs: [],
    },
  ];

  const tempEnemeies = [
    { id: "123", dps: 5, durability: 50 },
    { id: "1243", dps: 6, durability: 60 },
  ];

  const [gameRaw, setGameRaw] = useState({
    scrap: 4,
    ore: 0,
    waste: 0,
    sand: 0,
  });

  const [gameSmelted, setGameSmelted] = useState({
    iron: 0,
    gunpowder: 0,
    silicon: 0,
  });

  const [gameParts, setGameParts] = useState({
    arms: [
      {
        id: "123",
        type: "arms",
        stats: {
          dur: 2,
          dps: 5,
          prd: 3,
        },
        cost: {
          iron: 2,
          gunpowder: 1,
          silicon: 1,
        },
      },
    ],
    engines: [
      {
        id: "123",
        type: "engine",
        stats: {
          dur: 2,
          dps: 5,
          prd: 3,
        },
        cost: {
          iron: 2,
          gunpowder: 1,
          silicon: 1,
        },
      },
    ],
    locomotion: [
      {
        id: "123",
        type: "locomotion",
        stats: {
          dur: 2,
          dps: 5,
          prd: 3,
        },
        cost: {
          iron: 2,
          gunpowder: 1,
          silicon: 1,
        },
      },
    ],
    processors: [
      {
        id: "123",
        type: "processors",
        stats: {
          dur: 2,
          dps: 5,
          prd: 3,
        },
        cost: {
          iron: 2,
          gunpowder: 1,
          silicon: 1,
        },
      },
    ],
    chassis: [
      {
        id: "123",
        type: "chassis",
        stats: {
          dur: 2,
          dps: 5,
          prd: 3,
        },
        cost: {
          iron: 2,
          gunpowder: 1,
          silicon: 1,
        },
      },
    ],
  });

  const [waveTrigger, setWaveTrigger] = useState(false);

  const [gameBaseStats, setGameBaseStats] = useState({
    dur: 0,
    dps: 0,
    health: 100,
  });

  const [gameMechs, setGameMechs] = useState(tempMechs);

  const [gamePatrols, setGamePatrols] = useState(tempPatrols);

  const [gameEnemeies, setGameEnemies] = useState([]);

  //! NEW TRIGGER VALUES
  //? make these a single object?

  const [mechQueue, setMechQueue] = useState([]);

  const [mechTimer, setMechTimer] = useState(0);

  const [partQueue, setPartQueue] = useState([]);

  const [partTimer, setPartTimer] = useState(0);

  const [saveTrigger, setSaveTrigger] = useState(true);

  const [forgeTrigger, setForgeTrigger] = useState(false);

  const [loadTrigger, setLoadTrigger] = useState(true);

  const [mineTrigger, setMineTrigger] = useState(false);

  const [mineLoads, setMineLoads] = useState({
    scrap: { load: 0, time: 2, max: 10 },
    ore: { load: 0, time: 6, max: 5 },
  });
  // [{scrap: [], time: 1}, {iron: [], time: 4}]
  // {scrap: { load: [], time: 1}, }
  // maybe an object instead? {scrap: { load: [], time: 1}, iron: {}}
  const [mineTimers, setMineTimers] = useState({ scrap: 0, ore: 0 });

  //! testing resources being an object in an array for easier
  const [forgeLoads, setForgeLoads] = useState({
    scrap: { load: 0, time: 2, max: 20, cost: 4, yield: 1 },
    ore: { load: 0, time: 6, max: 15, cost: 3, yield: 1 },
  });

  const [forgeTimers, setForgeTimers] = useState({ scrap: 0, ore: 0 });

  // * MAIN LOOP
  useEffect(() => {
    //* LOAD LOCAL GAME DATA
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("full_state");
        if (value !== null) {
          // value previously stored
          console.log("game state loaded");
          const data = JSON.parse(value);
          setGameData(data);
        }
      } catch (e) {
        // error reading value
        console.log("unable to find load", e);
      }
    };
    if (loadTrigger === true) {
      getData();
      setLoadTrigger(false);
    }

    startTransition(() => {
      //* MANUAL MINE LOOP
      if (mineTrigger === true) {
        for (resource in mineLoads) {
          // increment timer if resource has item in it
          if (mineLoads[resource].load >= 1) {
            console.log("scrap?", resource);
            setMineTimers({
              ...mineTimers,
              [resource]: mineTimers[resource] + 1,
            });
          }
          //if resource timer is equal to the time it takes, load it
          if (mineTimers[resource] >= mineLoads[resource].time) {
            setMineLoads({
              ...mineLoads,
              [resource]: {
                ...mineLoads[resource],
                load: mineLoads[resource].load - 1,
              },
            });

            setMineTimers({
              ...mineTimers,
              [resource]: 0,
            });

            setGameRaw({ ...gameRaw, [resource]: gameRaw[resource] + 1 });
          }
        }
      }

      //* FORGE NEW MATS
      if (forgeTrigger === true) {
        for (resource in forgeLoads) {
          // increment timer if resource has item in it
          if (forgeLoads[resource].load >= 1) {
            console.log("forge", resource);
            setForgeTimers({
              ...forgeTimers,
              [resource]: forgeTimers[resource] + 1,
            });
          }
          //if resource timer is equal to the time it takes, load it
          if (forgeTimers[resource] >= forgeLoads[resource].time) {
            setForgeLoads({
              ...forgeLoads,
              [resource]: {
                ...forgeLoads[resource],
                load: forgeLoads[resource].load - forgeLoads[resource].cost,
              },
            });

            setForgeTimers({
              ...forgeTimers,
              [resource]: 0,
            });

            //if scrap, give all, else singular
            if (resource === "scrap") {
              setGameSmelted({
                ...gameSmelted,
                iron: gameSmelted.iron + 1,
                silicon: gameSmelted.silicon + 1,
                gunpowder: gameSmelted.gunpowder + 1,
              });
            } else {
              setGameSmelted({
                ...gameSmelted,
                [resource]: gameSmelted[resource] + forgeLoads[resource].yeild,
              });
            }
          }
        }
      }

      //* ATTEMPT PART CREATION
      if (partQueue.length > 0) {
        //gets the first part in the queue
        //doesnt need a loop or an if increment, just increment based of first index
        setPartTimer((partTimer) => partTimer + 1);
        console.log("in creator", partTimer, partQueue[0].time);
        if (partTimer >= partQueue[0].time) {
          console.log("part queue timer hit", partQueue[0].type);
          if (Math.random() < partQueue[0].success) {
            let current = partQueue[0];
            console.log("current", current.type);
            //chooses the stats
            function statFinalizer(min, max) {
              return Math.floor(Math.random() * (max - min + 1) + min);
            }
            let newPart = {
              id: uuid.v4(),
              type: current.type,
              stats: {
                dur: statFinalizer(current.dur.min, current.dur.max),
                dps: statFinalizer(current.dps.min, current.dps.max),
                prd: statFinalizer(current.prd.min, current.prd.max),
              },
              cost: current.cost,
            };
            partQueue.shift();
            setGameParts({
              ...gameParts,
              [current.type]: [...gameParts[current.type], newPart],
            });
            setPartTimer(0);
            console.log("built!", gameParts);
          } else {
            partQueue.shift();
            setPartTimer(0);
            console.log("failed!", gameParts);
          }
        }
      }

      //* MECH CREATION;

      // for each part in the mech, it needs to grab that part type from the data
      // then remove the item that has the same id

      // console.log(mechQueue);
      if (mechQueue.length > 0) {
        // actually needs to filter the parts now, but keep a copy
        // but filtering everytime is bad, should only do it once
        if (0 >= mechTimer >= 5) {
          console.log("in filter");
          let tempFullPartList = partData;
          for (mechPart in mechQueue[0].parts) {
            let partId = mechQueue[0].parts[mechPart].id;
            //filter for id
            let tempPartList = partData[mechPart];
            tempPartList = tempPartList.filter((part) => part.id !== partId);
            tempFullPartList = {
              ...tempFullPartList,
              [mechPart]: tempPartList,
            };
            console.log(tempFullPartList);
          }

          // setGameParts(tempFullPartList)
        }
        setMechTimer((mechTimer) => mechTimer + 1);
        if (mechTimer >= mechQueue[0].time) {
          // creates the mech
          let newMech = {
            // id: uuid.v4()
            stats: mechQueue[0].stats,
            parts: mechQueue[0].parts,
            cost: mechQueue[0].cost,
            location: "None",
            inUse: false,
          };
          console.log(newMech);
          setGameMechs([...gameMechs, newMech]);
          mechQueue.shift();
          setMechTimer(0);
        }
        console.log(mechTimer);
      }
    });
    //* INCREMENTS GAME TIMER
    console.log(gameClock);
    const timerReset = setInterval(() => {
      if (gameClock > 120) {
        setGameClock(0);
      } else {
        setGameClock((c) => c + 1);
      }
    }, 1000);
    return () => clearInterval(timerReset);
  }, [gameClock]);

  return {
    mineLoads,
    setMineLoads,
    setMineTrigger,
    forgeLoads,
    setForgeLoads,
    setForgeTrigger,
    gameRaw,
    setGameRaw,
    partQueue,
    setPartQueue,
    mechQueue,
    setMechQueue,
    gameBaseStats,
    setGameBaseStats,
    gameSmelted,
    gameParts,
    gameMechs,
  };
}

export default useGameState;
