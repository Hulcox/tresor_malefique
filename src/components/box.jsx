import Image from "next/image";

const BoxGame = ({ name }) => {
  return (
    <div className="bg-[#545454] w-20 h-20 rounded-md relative">
      {name != "normal" && (
        <Image
          alt={name}
          src={`/images/case/${name}.png`}
          fill={true}
          className="rounded-md"
        />
      )}
    </div>
  );
};

export default BoxGame;
