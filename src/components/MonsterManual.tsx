import {
  Monster,
  MonsterPreview,
  fetchMonster,
  fetchMonsters,
} from "@/api-clients/dnd";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export function MonsterManual() {
  const [monsters, setMonsters] = useState<MonsterPreview[]>([]);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string>("");
  const [searchedMonsters, setSearchedMonsters] = useState<MonsterPreview[]>(
    []
  );

  useEffect(() => {
    fetchMonsters().then((monsters) => setMonsters(monsters));
  }, []);

  if (monsters.length === 0) {
    return (
      <div className="flex h-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (selectedMonsterId !== "") {
    return <MonsterDetail monsterId={selectedMonsterId} />;
  } else {
    return (
      <div>
        <div className="flex w-full justify-center">
          <input
            className="text-black text-lg p-4 w-64 text-center"
            placeholder="Search for monster by name"
            defaultValue=""
            onChange={(e) => {
              setSearchedMonsters(
                monsters.filter((m) => m.name.includes(e.target.value))
              );
            }}
          />
        </div>
        <MonstersList
          monsters={searchedMonsters.length > 0 ? searchedMonsters : monsters}
          selectedMonsterCallback={setSelectedMonsterId}
        />
      </div>
    );
  }
}

type MonstersListProps = {
  monsters: MonsterPreview[];
  selectedMonsterCallback: (monsterId: string) => void;
};
function MonstersList({
  monsters,
  selectedMonsterCallback,
}: MonstersListProps) {
  return (
    <ol>
      {monsters.map((monster) => {
        return (
          <li
            className="w-full p-4 [&:nth-child(2n)]:bg-[color:#0000003b]"
            key={monster.index}
          >
            <button
              className="text-lg"
              onClick={() => selectedMonsterCallback(monster.index)}
            >
              {monster.name}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

type MonsterDetailProps = {
  monsterId: string;
};
function MonsterDetail({ monsterId }: MonsterDetailProps) {
  const [monster, setMonster] = useState<Monster | null>(null);
  const [state, setState] = useState<"FETCHING_DATA" | "FETCHED">(
    "FETCHING_DATA"
  );

  useEffect(() => {
    setState("FETCHING_DATA");
    fetchMonster(monsterId).then((m) => {
      setMonster(m);
      setState("FETCHED");
    });
  }, [monsterId]);

  if (state === "FETCHING_DATA") {
    return (
      <div className="flex h-full justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (state === "FETCHED" && monster) {
    return (
      <div>
        <h1 className="text-4xl">{monster.name}</h1>
        <div>
          <p>Strength: {monster.strength}</p>
          <p>Dexterity: {monster.dexterity}</p>
          <p>Constition: {monster.constitution}</p>
          <p>Intelligence: {monster.intelligence}</p>
          <p>Wisdom: {monster.wisdom}</p>
          <p>Charisma: {monster.charisma}</p>
        </div>
        {monster.desc ? <p className="text-lg">{monster.desc}</p> : null}
        {monster.image ? (
          <img
            src={`https://www.dnd5eapi.co${monster.image}`}
            alt={monster.desc}
          />
        ) : null}
      </div>
    );
  }
}
