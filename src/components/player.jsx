const Player = ({ position, couleur, name }) => {
  const color = {
    red: ["bg-red-600", "bg-red-800"],
    blue: ["bg-blue-600", "bg-blue-800"],
    green: ["bg-green-600", "bg-green-800"],
    yellow: ["bg-yellow-600", "bg-yellow-800"],
    purple: ["bg-purple-600", "bg-purple-800"],
    pink: ["bg-pink-600", "bg-pink-800"],
    orange: ["bg-orange-600", "bg-orange-800"],
    teal: ["bg-teal-600", "bg-teal-800"],
    indigo: ["bg-indigo-600", "bg-indigo-800"],
    fuchsia: ["bg-fuchsia-600", "bg-fuchsia-800"],
  };
  return (
    <div className="flex flex-col items-center">
      <div className={`head ${color[couleur][0]} w-5 h-5 rounded-full`}></div>
      <div className={`body ${color[couleur][1]} w-5 h-5 rounded-t-xl`}></div>
      <h1 className="text-sm text-white ">{name}</h1>
    </div>
  );
};

export default Player;
