import React, { useState } from "react";
import useGameState from "./useGameState";

export const GameContext = React.createContext();
export const StateProvider = ({ children }) => {
  const {
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
  } = useGameState();

  return (
    <GameContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
