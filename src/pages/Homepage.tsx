import Board from "../components/GameOne/Board";

const Homepage = () => {
  return (
    <div className="flex w-full flex-col justify-center gap-10 py-3">
      <h1 className="text-center text-7xl font-bold text-accent-dark underline">
        Welcome to the Arcade
      </h1>
      <Board />
    </div>
  );
};

export default Homepage;
