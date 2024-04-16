import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(() =>
    Array(20).fill(Array(20).fill("empty")),
  );

  const handleSave = () => {
    fetch("http://localhost:3009/save-board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(squares),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleContentChange = (y: number, x: number, content: string) => {
    const newMatrix = [...squares];
    newMatrix[y] = [...squares[y]];
    newMatrix[y][x] = content;
    setSquares(newMatrix);
  };
  return (
    <section className="mx-auto flex max-w-screen-md flex-col gap-5">
      <section
        className="mx-auto grid max-w-screen-md"
        style={{
          gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
          gridTemplateRows: "repeat(20, minmax(0, 1fr))",
        }}
      >
        {squares.map((arr, i: number) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return arr.map((el: any, j: number) => (
            <Square
              key={i + "-" + j}
              content={el}
              onChangeContent={handleContentChange}
              y={i}
              x={j}
            />
          ));
        })}
      </section>
      <button
        className="w-full rounded-md border-accent-dark bg-accent-light text-3xl font-bold text-accent-dark transition-colors duration-300 hover:bg-accent-dark hover:text-accent-light"
        onClick={handleSave}
      >
        Save Board
      </button>
    </section>
  );
};

export default Board;
