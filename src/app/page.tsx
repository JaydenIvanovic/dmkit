"use client";

import { DiceRoller } from "@/components/DiceRoller";
import { Modal } from "@/components/Modal";
import { MonsterManual } from "@/components/MonsterManual";
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
        return <DiceRoller />;
      default:
        return <DiceRoller />;
    }
  }

  const roundedGlowStyles = [
    "[border-radius:100%]",
    "[box-shadow:0px_0px_20px_15px_#37243a]",
  ].join(" ");

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] relative">
        <Image
          className={roundedGlowStyles}
          src="/images/dungeon-master.jpg"
          alt="A wizard in a dungeon rolling d20 dice"
          fill
        ></Image>
        <button
          className="absolute top-0 right-0 hover:scale-125 transition-transform"
          onClick={() => {
            setToolInUse("MONSTER_MANUAL");
            setModalState("VISIBLE");
          }}
        >
          <img
            className={`w-16 ${roundedGlowStyles}`}
            alt=""
            src="/images/monster-face.jpg"
          ></img>
        </button>
        <button
          className="absolute top-0 left-0 hover:scale-125 transition-transform"
          onClick={() => {
            setToolInUse("DICE");
            setModalState("VISIBLE");
          }}
        >
          <img
            className={`w-16 ${roundedGlowStyles}`}
            alt=""
            src="/images/d20.jpg"
          ></img>
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
