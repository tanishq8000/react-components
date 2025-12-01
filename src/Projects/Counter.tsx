import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="w-[200px] h-[200px] m-10 p-4 border border-amber-200 ">
      <h1 className="text-center">Basic Counter</h1>
      <h3 className="mt-3">Current count is : {count}</h3>
      <div className="text-center mt-3">
        <button
          onClick={handleIncrement}
          className="border border-black bg-green-300 m-2"
        >
          ➕
        </button>
        <button
          onClick={handleDecrement}
          className="border border-black bg-green-300"
        >
          ➖
        </button>
      </div>
    </div>
  );
};

export default Counter;
