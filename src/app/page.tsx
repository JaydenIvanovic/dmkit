"use client";

import { Modal } from "@/components/Modal";
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
