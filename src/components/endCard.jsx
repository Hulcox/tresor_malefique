import Link from "next/link";
import { useEffect, useState } from "react";

const EndCard = () => {
  const card = [
    "Fait un cul sec !",
    "Tous le monde doit faire un cul sec !",
    "Tous le monde sauf toi doit faire un cul sec !",
  ];
  const [cardSelected, setCardSelected] = useState(null);

  const handleSelectCard = (index) => {
    if (cardSelected) {
      return;
    }
    setCardSelected(index);
  };

  const [cardOrder, setCardOrder] = useState([]);

  useEffect(() => {
    const order = generateRandomOrder();
    setCardOrder(order);
  }, []);

  const generateRandomOrder = () => {
    const order = [0, 1, 2];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex">
        {cardOrder.map((index) => (
          <div
            key={index}
            className={`flex-1 bg-gray-200 p-4 rounded-md m-2 text-black font-bold min-w-[100px] min-h-[180px]`}
            onClick={() => {
              handleSelectCard(index);
            }}
          >
            {cardSelected == index && card[index]}
          </div>
        ))}
      </div>
      <Link
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
        href={"/"}
      >
        Rejouer
      </Link>
    </div>
  );
};

export default EndCard;
