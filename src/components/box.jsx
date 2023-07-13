import Image from "next/image";
import Player from "./player";

const BoxGame = ({ name, players }) => {
  return (
    <div className="bg-[#545454] w-[90%] h-28 rounded-md relative flex justify-center">
      {name != "normal" && (
        <Image
          alt={name}
          src={`/images/case/${name}.png`}
          width={112}
          height={112}
          className="rounded-md"
        />
      )}
      <div className="absolute -bottom-2 -left-2 flex flex-wrap gap-2 z-10">
        {players.map(({ color, position, name }, key) => (
          <Player couleur={color} name={name} key={key} />
        ))}
      </div>
    </div>
  );
};

export default BoxGame;
