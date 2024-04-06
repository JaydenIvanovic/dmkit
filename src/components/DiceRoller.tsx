import { DiceType, roll } from "@/math";
import { useState } from "react";
import Image from "next/image";

export function DiceRoller() {
  const [total, setTotal] = useState(0);
  const [lastNumberRolled, setLastNumberRolled] = useState(0);

  function rollDice(diceType: DiceType) {
    const result = roll(diceType);
    setLastNumberRolled(result);
    setTotal((total) => total + result);
  }

  return (
    <div className="flex flex-col justify-center items-center text-2xl">
      <div className="relative w-80 h-80">
        <Image
          className="filter invert"
          src="/images/d20-container.png"
          alt=""
          fill
        ></Image>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 text-black text-3xl">
          {total}
        </span>
      </div>
      <p className="mt-8">
        Total: <span>{total}</span>
      </p>
      <p>
        Last number rolled: <span>{lastNumberRolled}</span>
      </p>
      <div className="flex flex-wrap mt-8">
        <DiceButton onClick={() => rollDice(4)}>d4</DiceButton>
        <DiceButton onClick={() => rollDice(6)}>d6</DiceButton>
        <DiceButton onClick={() => rollDice(8)}>d8</DiceButton>
        <DiceButton onClick={() => rollDice(10)}>d10</DiceButton>
        <DiceButton onClick={() => rollDice(12)}>d12</DiceButton>
        <DiceButton onClick={() => rollDice(20)}>d20</DiceButton>
      </div>
      <button
        className="bg-black rounded-lg p-4 mt-5"
        onClick={() => setTotal(0)}
      >
        Reset total
      </button>
    </div>
  );
}

type DiceButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};
function DiceButton({ children, onClick }: DiceButtonProps) {
  return (
    <button className="p-4 bg-black rounded-lg mx-2" onClick={onClick}>
      {children}
    </button>
  );
}
