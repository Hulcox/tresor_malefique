"use client";
import BoxGame from "@/components/box";
import De from "@/components/de";
import Player from "@/components/player";
import { useEffect, useState } from "react";

const player = [
  { name: "Romain", position: 0, color: "red" },
  { name: "Lucas", position: 0, color: "blue" },
  { name: "Quentin", position: 0, color: "green" },
  { name: "Jean bastite", position: 0, color: "yellow" },
  { name: "Joueur", position: 0, color: "purple" },
  { name: "Joueur 5", position: 0, color: "purple" },
  { name: "Joueur 5", position: 0, color: "purple" },
  { name: "Joueur 5", position: 0, color: "purple" },
  { name: "Joueur 5", position: 0, color: "purple" },
  { name: "Joueur 5", position: 0, color: "purple" },
  // Ajoutez ici les autres joueurs avec leurs noms et positions initiales
];

const GamePage = () => {
  const [gameBase, setGameBase] = useState(null);
  const [deNumber, setDeNumber] = useState(null);
  const [mode, setMode] = useState("difficile");
  const [players, setPlayers] = useState(player);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [title, setTitle] = useState(
    `A ${players[currentPlayerIndex].name} de lancer le dé`
  );

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
    setGameBase(CreateGameBase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lancerDe = () => {
    const diceRoll = Math.floor(Math.random() * 3) + 1;
    setDeNumber(diceRoll);

    const currentPlayer = players[currentPlayerIndex];

    setTitle(`${currentPlayer.name} avance de ${diceRoll} case !`);

    setTimeout(() => {
      currentPlayer.position += diceRoll;

      if (currentPlayer.position >= gameBaseSize) {
        presentChoicesToPlayer();
        endGame();
        return;
      }

      if (currentPlayerIndex === players.length - 1) {
        setCurrentPlayerIndex(0);
        setTitle(`A ${players[0].name} de lancé le dé`);
      } else {
        setCurrentPlayerIndex((prev) => prev + 1);
        setTitle(`A ${players[currentPlayerIndex + 1].name} de lancé le dé`);
      }
      setPlayers((prev) => [...prev]);
    }, 1000);
  };

  const presentChoicesToPlayer = () => {
    const currentPlayer = players[currentPlayerIndex];
    console.log(
      `Félicitations, ${currentPlayer.name} ! Vous avez atteint la fin de la grille.`
    );
    console.log("Veuillez choisir parmi les options suivantes :");
    console.log("1. Option 1");
    console.log("2. Option 2");
    console.log("3. Option 3");
    // Ajoutez ici votre propre logique pour la gestion des choix du joueur
    // Une fois que le joueur a fait son choix, vous pouvez terminer la partie ou effectuer d'autres actions en fonction de la sélection.
    // Exemple : endGame();
  };

  const endGame = () => {
    console.log("La partie est terminée.");
    // Enregistrez ici les informations de la partie dans le local storage si nécessaire
  };

  useEffect(() => {
    players.forEach((element) => {
      setTimeout(() => {
        if (
          gameBase &&
          (gameBase[element.position] == "avancer" ||
            gameBase[element.position] == "reculer")
        ) {
          setTitle(
            `${
              gameBase[element.position] == "avancer"
                ? `Bonus : ${element.name} avance`
                : `Malus : ${element.name} recule`
            } de 1 case !`
          );
          gameBase[element.position] == "avancer"
            ? (element.position += 1)
            : (element.position -= 1);
          setPlayers((prev) => [...prev]);
        }
      }, 1000);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  return (
    <>
      <div className="min-w-[100vw] min-h-[100vh] bg-slate-900 p-4">
        <div className="w-full h-14 bg-green-500 rounded-lg my-2 sticky top-4 z-20 shadow-sm shadow-slate-600 flex justify-center items-center">
          <h1 className=" text-white font-bold text-xl">{title}</h1>
        </div>
        <div className="flex flex-col-reverse items-center gap-5 relative">
          {gameBase?.map((elm, key) => (
            <BoxGame
              key={key}
              name={elm}
              players={players.filter(({ position }) => position == key)}
            />
          ))}
          {/* Vous pouvez afficher ici la position du joueur sur la grille */}
          {/* Exemple : <p>Position du joueur : {players[currentPlayerIndex].position}</p> */}
        </div>

        <div className="m-4 flex flex-col justify-center items-center gap-4 sticky bottom-4 z-20">
          {/* Affichez ici le résultat du dé */}
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
