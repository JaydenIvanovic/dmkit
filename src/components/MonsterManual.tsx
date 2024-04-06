import {
  Monster,
  MonsterPreview,
  fetchMonster,
  fetchMonsters,
} from "@/api-clients/dnd";
import { useEffect, useState } from "react";

export function MonsterManual() {
  const [monsters, setMonsters] = useState<MonsterPreview[]>([]);
  const [selectedMonsterId, setSelectedMonsterId] = useState<string>("");

  useEffect(() => {
    fetchMonsters().then((monsters) => setMonsters(monsters));
  }, []);

  if (monsters.length === 0) {
    return <div>TODO: Loading monsters...</div>;
  }

  if (selectedMonsterId !== "") {
    return <MonsterDetail monsterId={selectedMonsterId} />;
  } else {
    return (
      <MonstersList
        monsters={monsters}
        selectedMonsterCallback={setSelectedMonsterId}
      />
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
          <li key={monster.index}>
            <button onClick={() => selectedMonsterCallback(monster.index)}>
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
  const [state, setState] = useState<"INITIAL" | "FETCHING_DATA" | "FETCHED">(
    "INITIAL"
  );

  useEffect(() => {
    setState("FETCHING_DATA");
    fetchMonster(monsterId).then((m) => {
      setMonster(m);
      setState("FETCHED");
    });
  }, [monsterId]);

  if (state === "INITIAL") {
    return <div>TODO: Loading</div>;
  }

  if (state === "FETCHING_DATA") {
    return <div>TODO: Loading</div>;
  }

  if (state === "FETCHED" && monster) {
    return (
      <div>
        <h1>{monster.name}</h1>
        <img
          src={`https://www.dnd5eapi.co${monster.image}`}
          alt={monster.desc}
        />
      </div>
    );
  }
}
