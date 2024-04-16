import React from "react";

interface Props {
  onChangeContent: (y: number, x: number, content: string) => void;
  content: string;
  y: number;
  x: number;
}

const Square = React.memo(({ content, onChangeContent, x, y }: Props) => {
  const handleEvent = (event: string) => {
    onChangeContent(y, x, event);
  };
  const handleClear = () => {
    onChangeContent(y, x, "empty");
  };

  return (
    <div
      className={`flex h-8 w-8 items-center justify-center border-2 border-accent-light ${content === "wall" ? "bg-stone-500" : "bg-accent-dark"}`}
      onClick={handleClear}
      onDoubleClick={() => handleEvent("dot")}
      onDragStart={() => handleEvent("wall")}
      onDragOver={() => handleEvent("wall")}
    >
      {content === "dot" && (
        <span className="h-1 w-2 rounded-full bg-emerald-700"></span>
      )}
    </div>
  );
});

export default Square;
