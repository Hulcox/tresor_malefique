const De = ({ number }) => {
  return (
    <div className=" absolute rounded-md bg-green-500 p-4 w-28 bottom-14">
      <div className="h-20 w-full bg-white rounded-md shadow-sm shadow-stone-500 relative">
        {number == 1 ? (
          <div className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        ) : number == 2 ? (
          <>
            <div className="w-4 h-4 bg-black rounded-full absolute top-3 left-3"></div>
            <div className="w-4 h-4 bg-black rounded-full absolute bottom-3 right-3"></div>
          </>
        ) : number == 3 ? (
          <>
            <div className="w-4 h-4 bg-black rounded-full absolute top-3 left-3"></div>
            <div className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-4 h-4 bg-black rounded-full absolute bottom-3 right-3"></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default De;
