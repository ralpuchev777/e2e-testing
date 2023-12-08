import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <br />
      <br />
      <div>
        <button data-testid="increment" onClick={() => setCount(count + 1)}>
          +
        </button>
        &nbsp;&nbsp;&nbsp;
        <span data-testid="count">{count}</span>
        &nbsp;&nbsp;&nbsp;
        <button data-testid="decrement" onClick={() => setCount(count - 1)}>
          -
        </button>
        <br />
        <br />
        <button data-testid="reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </>
  );
}

export default Counter;
