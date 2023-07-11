"use client";
import BoxGame from "@/components/box";
import De from "@/components/de";
import Player from "@/components/player";
import { useEffect, useState } from "react";

const GamePage = () => {
  const [gameBase, setGameBase] = useState(null);
  const [deNumber, setDeNumber] = useState(null);

  const gameBaseSize = 20;

  const CreateGameBase = () => {
    const line = ["start"];

    const blocksConfig = [
      { type: "avancer", probability: 0.1 },
      { type: "reculer", probability: 0.1 },
      { type: "+4", probability: 0.1 },
      { type: "+2", probability: 0.2 },
      { type: "-4", probability: 0.05 },
      { type: "-2", probability: 0.1 },
      { type: "normal", probability: 0.35 },
    ];

    for (let i = 0; i < gameBaseSize; i++) {
      const randomNumber = Math.random();
      let selectedBlockType = "";

      let accumulatedProbability = 0;
      for (const blockConfig of blocksConfig) {
        accumulatedProbability += blockConfig.probability;
        if (randomNumber <= accumulatedProbability) {
          if (
            (blockConfig.type == "avancer" &&
              line[line.length - 1] == "reculer") ||
            (blockConfig.type == "reculer" &&
              line[line.length - 1] == "avancer")
          ) {
            selectedBlockType = "normal";
          } else {
            selectedBlockType = blockConfig.type;
          }
          break;
        }
      }

      line.push(selectedBlockType);
    }

    line.push("end");

    return line;
  };

  useEffect(() => {
    setGameBase(CreateGameBase());
  }, []);

  const lancerDe = () => {
    const intervale = setInterval(() => {
      setDeNumber(Math.round(Math.random() * 3));
    }, 10);

    setTimeout(() => {
      clearInterval(intervale);
    }, 3000);
  };

  return (
    <>
      <div className="min-w-[100vw] min-h-[100vh] bg-slate-900 p-4">
        <div className="w-full h-14 bg-green-500 rounded-lg my-2 sticky top-4 z-10 shadow-sm shadow-slate-600 flex justify-center items-center">
          <h1 className=" text-white font-bold text-xl">
            Au joueur 1 de lancer le dé
          </h1>
        </div>

        <div className="flex flex-col-reverse items-center gap-2 relative">
          {gameBase?.map((elm, key) => (
            <BoxGame key={key} name={elm} />
          ))}
          <Player />
        </div>
        <div className="m-10 flex justify-center relative">
          <De number={deNumber} />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={lancerDe}
          >
            LANCER LE DÉS
          </button>
        </div>
      </div>
    </>
  );
};

export default GamePage;
