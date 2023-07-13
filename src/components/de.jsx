const De = ({ number }) => {
  return (
    <div className="rounded-md bg-green-500 p-4 w-28">
      <div className="h-20 w-full bg-slate-400 rounded-md shadow-sm shadow-stone-500 flex justify-center items-center">
        <h1 className="text-white font-bold text-5xl">{number}</h1>
      </div>
    </div>
  );
};

export default De;
