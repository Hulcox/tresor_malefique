"use client";
import BoxGame from "@/components/box";
import De from "@/components/de";
import EndCard from "@/components/endCard";
import Player from "@/components/player";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// const player = [
//   { name: "Romain", position: 30, color: "red" },
//   // { name: "Lucas", position: 0, color: "blue" },
//   // { name: "Quentin", position: 0, color: "green" },
//   // { name: "TTTTTTTTTT", position: 0, color: "yellow" },
//   // { name: "Joueur 5", position: 0, color: "purple" },
//   // { name: "Joueur 6", position: 0, color: "pink" },
//   // { name: "Joueur 7", position: 0, color: "orange" },
//   // { name: "Joueur 8", position: 0, color: "indigo" },
//   // { name: "Joueur 9", position: 0, color: "teal" },
//   // { name: "Joueur 10", position: 0, color: "fuchsia" },
//   // Ajoutez ici les autres joueurs avec leurs noms et positions initiales
// ];

const GamePage = () => {
  const [gameBase, setGameBase] = useState(null);
  const [deNumber, setDeNumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [end, setEnd] = useState(false);
  const router = useRouter();

  const gameBaseSize = mode === "facile" ? 10 : mode === "normal" ? 20 : 30;

  const CreateGameBase = () => {
    const line = ["start"];

    const blocksConfig = [
      { type: "avancer", probability: 0.1 },
      { type: "reculer", probability: 0.1 },
      { type: "+4", probability: 0.25 },
      { type: "+2", probability: 0.5 },
      { type: "-4", probability: 0.25 },
      { type: "-2", probability: 0.5 },
      { type: "normal", probability: 0.05 },
    ];

    for (let i = 0; i < gameBaseSize; i++) {
      const randomNumber = Math.random();
      let selectedBlockType = "";

      let accumulatedProbability = 0;
      for (const blockConfig of blocksConfig) {
        accumulatedProbability += blockConfig.probability;

        if (randomNumber <= accumulatedProbability) {
          selectedBlockType = blockConfig.type;
          break;
        }
      }

      // Vérification pour éviter les cas "reculer" ou "avancer" côte à côte
      if (
        (selectedBlockType === "reculer" &&
          line[line.length - 1] === "reculer") ||
        (selectedBlockType === "avancer" && line[line.length - 1] === "avancer")
      ) {
        selectedBlockType = "normal";
      }

      line.push(selectedBlockType);
    }

    line.push("end");

    // Remplacement aléatoire de 7 cases par des cases normales
    const lastIndex = line.length - 2; // Ne pas toucher à l'index line.length - 1
    const normalReplacementCount = 7;
    let replacedCount = 0;

    // Comptage des cases normales déjà présentes dans la liste
    const normalCount = line
      .slice(1, line.length - 1)
      .filter((block) => block === "normal").length;

    // Décompte du normalReplacementCount en fonction des cases normales déjà présentes
    let remainingNormalCount = normalReplacementCount - normalCount;
    if (remainingNormalCount < 0) {
      remainingNormalCount = 0;
    }

    // Remplacement aléatoire des cases par des cases normales
    while (replacedCount < remainingNormalCount) {
      const randomIndex = Math.floor(Math.random() * lastIndex) + 1; // Ne pas toucher à l'index 0
      if (line[randomIndex] !== "normal") {
        line[randomIndex] = "normal";
        replacedCount++;
      }
    }

    return line;
  };

  useEffect(() => {
    const player = localStorage.getItem("player");
    if (player) {
      setPlayers(JSON.parse(player));
      setMode(localStorage.getItem("mode"));
      setTitle(`A ${JSON.parse(player)[0]?.name} de lancer le dé`);
      if (localStorage.getItem("grid")) {
        setGameBase(JSON.parse(localStorage.getItem("grid")));
      } else {
        const grid = CreateGameBase();
        localStorage.setItem("grid", JSON.stringify(grid));
        setGameBase(grid);
      }
    } else {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }, [gameBase]);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(players));
  }, [players]);

  const lancerDe = () => {
    setDisabledButton(true);
    const diceRoll = Math.floor(Math.random() * 3) + 1;

    const interval = setInterval(() => {
      setDeNumber(0);
      setDeNumber(Math.floor(Math.random() * 3) + 1);
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setDeNumber(diceRoll);

      const currentPlayer = players[currentPlayerIndex];

      setTitle(`${currentPlayer.name} avance de ${diceRoll} case !`);

      if (gameBase[currentPlayer.position + diceRoll] == "normal") {
        setTimeout(() => {
          step(1, currentPlayer, diceRoll);
          setTimeout(() => {
            step(4, currentPlayer, diceRoll);
          }, 2000);
        }, 2000);
      } else {
        for (let i = 1; i <= 4; i++) {
          setTimeout(() => {
            step(i, currentPlayer, diceRoll);
          }, i * 2000);
        }
      }
    }, 3000);
  };

  const step = (numberStep, currentPlayer, diceRoll) => {
    // etape 1 faire avancer le joueur
    if (numberStep == 1) {
      currentPlayer.position += diceRoll;

      if (currentPlayer.position >= gameBaseSize + 1) {
        currentPlayer.position = gameBaseSize + 1;
        endGame();
      }

      setPlayers((prev) => [...prev]);
      setDeNumber(null);
    } else if (numberStep == 2) {
      // etape 2 check si le joueur est sur une case spécial
      switch (gameBase[currentPlayer.position]) {
        case "avancer":
          setTitle(`Bonus : ${currentPlayer.name} avance de 1 case !`);
          currentPlayer.position += 1;
          setPlayers((prev) => [...prev]);
          break;
        case "reculer":
          setTitle(`Malus : ${currentPlayer.name} recule de 1 case !`);
          currentPlayer.position -= 1;
          setPlayers((prev) => [...prev]);
          break;
        default:
          break;
      }
    } else if (numberStep == 3) {
      // etape 3 check la case du joueur
      switch (gameBase[currentPlayer.position]) {
        case "+4":
          setTitle(`${currentPlayer.name} bois 4 gorgées !`);
          break;
        case "+2":
          setTitle(`${currentPlayer.name} bois 2 gorgées !`);
          break;
        case "-4":
          setTitle(`${currentPlayer.name} donne 4 gorgées !`);
          break;
        case "-2":
          setTitle(`${currentPlayer.name} donne 2 gorgées !`);
          break;
        default:
          break;
      }
    } else if (numberStep == 4) {
      if (currentPlayerIndex === players.length - 1) {
        setCurrentPlayerIndex(0);
        setTitle(`A ${players[0].name} de lancer le dé`);
      } else {
        setCurrentPlayerIndex((prev) => prev + 1);
        setTitle(`A ${players[currentPlayerIndex + 1].name} de lancer le dé`);
      }
      setDisabledButton(false);
    }
  };

  const endGame = () => {
    console.log("La partie est terminée.");
    setEnd(true);
    // Enregistrez ici les informations de la partie dans le local storage si nécessaire
  };

  return (
    gameBase && (
      <div className="min-w-[100vw] min-h-[100vh] bg-slate-900 p-2">
        {!end && (
          <div className="w-full h-14 bg-green-500 rounded-lg my-2 sticky top-4 z-20 shadow-sm shadow-slate-600 flex justify-center items-center">
            <h1 className=" text-white font-bold text-xl">{title}</h1>
          </div>
        )}
        {end && (
          <div className="bg-[#2d2d2d] sticky top-4 left-0 z-20 min-h-[40vh] rounded-lg p-2 mb-4">
            <h1 className="text-xl font-bold text-center">
              Félicitations {players[currentPlayerIndex].name} tu as gagné
            </h1>
            <h2 className="text-lg font-bold text-center mt-2">
              🍻 choisi une des 3 carte 🍻 :
            </h2>
            <EndCard />
          </div>
        )}
        <div className="flex flex-col-reverse items-center gap-5 relative">
          {gameBase?.map((elm, key) => (
            <BoxGame
              key={key}
              name={elm}
              players={players?.filter(({ position }) => position == key)}
            />
          ))}
        </div>

        {!end && (
          <div className="mt-40 flex flex-col justify-center items-center gap-4 sticky bottom-8 z-20">
            {/* Affichez ici le résultat du dé */}
            {deNumber && <De number={deNumber} />}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={lancerDe}
              disabled={disabledButton}
            >
              LANCER LE DÉS
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default GamePage;
