"use client";

import { MonsterManual } from "@/components/MonsterManual";
import { DiceIcon, MonsterIcon } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [modalState, setModalState] = useState<"VISIBLE" | "HIDDEN">("HIDDEN");
  const [toolInUse, setToolInUse] = useState<"MONSTER_MANUAL" | "DICE">("DICE");

  function getComponentForTool() {
    switch (toolInUse) {
      case "MONSTER_MANUAL":
        return <MonsterManual />;
      case "DICE":
        return "DICE";
      default:
        return "DICE";
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-[500px] h-[500px] relative">
        <Image
          className="[border-radius:100%] [box-shadow:0px_0px_20px_15px_#37243a]"
          src="/images/dungeon-master.jpg"
          alt="A wizard in a dungeon rolling d20 dice"
          fill
        ></Image>
        <button
          className="absolute top-0 right-0 hover:scale-105"
          onClick={() => {
            setToolInUse("MONSTER_MANUAL");
            setModalState("VISIBLE");
          }}
        >
          <MonsterIcon />
        </button>
        <button
          className="absolute top-0 left-0 hover:scale-105"
          onClick={() => {
            setToolInUse("DICE");
            setModalState("VISIBLE");
          }}
        >
          <DiceIcon />
        </button>
      </div>
      {modalState === "VISIBLE" ? (
        <Modal onCloseCallback={() => setModalState("HIDDEN")}>
          {getComponentForTool()}
        </Modal>
      ) : null}
    </div>
  );
}

type ModalProps = {
  children: React.ReactNode;
  onCloseCallback: () => void;
};
function Modal({ children, onCloseCallback }: ModalProps) {
  return (
    <div className="absolute bg-[color:#91332ae6] w-4/5 h-screen overflow-y-auto">
      <button className="absolute right-0 p-4" onClick={onCloseCallback}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>

      <h1>This would be the modal</h1>
      {children}
    </div>
  );
}
