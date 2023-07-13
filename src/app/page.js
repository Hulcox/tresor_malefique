"use client";
import Player from "@/components/player";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomePage = () => {
  const [player, setPlayer] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const color = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "orange",
    "teal",
    "indigo",
    "fuchsia",
  ];

  const handleAddPlayer = () => {
    const input = document.getElementsByClassName("inputPlayer")[0];
    console.log(input.value);
    if (input.value.length <= 8) {
      setPlayer((prev) => [
        ...prev,
        { name: input.value, position: 0, color: color[player.length] },
      ]);
    }
  };

  const handlePlayerName = (e) => setPlayerName(e.target.value);

  const play = (mode) => {
    localStorage.setItem("mode", mode);
    localStorage.setItem("player", JSON.stringify(player));
    router.push("/game");
  };

  return (
    <div className="bg-[#545454] min-h-screen flex flex-col items-center gap-5">
      <Image alt="logo" src="/images/logo.png" width={200} height={200} />
      <h1 className="text-xl font-bold my-4">Ajouter les participants : </h1>
      <div className="flex gap-2">
        <div className="relative flex">
          <input
            type="text"
            className="inputPlayer border border-black rounded-lg text-black bg-slate-400 opacity-60"
            placeholder="Maximun 8 charactères"
            onChange={handlePlayerName}
          />
          <p
            className={`absolute right-2 top-2 ${
              playerName.length > 8 && "text-red-600"
            }`}
          >
            {playerName.length}/8
          </p>
        </div>
        <button
          className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleAddPlayer}
          disabled={player.length >= 10}
        >
          Ajouter
        </button>
      </div>
      <div className="flex gap-10 flex-wrap justify-center mt-4">
        {player.map(({ color, position, name }, key) => (
          <Player couleur={color} name={name} key={key} />
        ))}
      </div>
      {player.length > 1 && (
        <div className="flex flex-col gap-5">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              play("facile");
            }}
          >
            Jouer en mode facile
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              play("normal");
            }}
          >
            Jouer en mode normal
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              play("difficile");
            }}
          >
            Jouer en mode difficile
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
