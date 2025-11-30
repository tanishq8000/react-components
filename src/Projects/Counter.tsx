import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <h3>{count}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default Counter;
