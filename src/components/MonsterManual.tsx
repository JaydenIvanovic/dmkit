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
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchMonsters().then((result) => {
      if (result.ok) {
        setMonsters(result.value);
      } else {
        // Could log to bugsnag, sentry or some equivalent in a real app
        console.error(result.error);
        setError(result.error);
      }
    });
  }, []);

  if (error) {
    return (
      <div className="flex h-full justify-center items-center">
        <p>Oh noes! Fetching data failed. Close this window and try again.</p>
      </div>
    );
  }

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
                monsters.filter((m) =>
                  m.name
                    .toLocaleLowerCase()
                    .includes(e.target.value.toLocaleLowerCase())
                )
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
            className="w-full p-6 [&:nth-child(2n)]:bg-[color:#0000003b]"
            key={monster.index}
          >
            <button
              className="w-full h-full text-lg text-left"
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
  const [state, setState] = useState<"FETCHING_DATA" | "FETCHED" | "FAILED">(
    "FETCHING_DATA"
  );

  useEffect(() => {
    setState("FETCHING_DATA");
    fetchMonster(monsterId).then((result) => {
      if (result.ok) {
        setMonster(result.value);
        setState("FETCHED");
      } else {
        // Could log to bugsnag, sentry or some equivalent in a real app
        console.error(result.error);
        setState("FAILED");
      }
    });
  }, [monsterId]);

  if (state === "FAILED") {
    return (
      <div className="flex h-full justify-center items-center">
        <p>Oh noes! Fetching data failed. Close this window and try again.</p>
      </div>
    );
  }

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
        <div className="mt-5">
          <p>Strength: {monster.strength}</p>
          <p>Dexterity: {monster.dexterity}</p>
          <p>Constition: {monster.constitution}</p>
          <p>Intelligence: {monster.intelligence}</p>
          <p>Wisdom: {monster.wisdom}</p>
          <p>Charisma: {monster.charisma}</p>
        </div>
        {monster.desc ? <p className="mt-5 text-lg">{monster.desc}</p> : null}
        {monster.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="mt-5"
            src={`https://www.dnd5eapi.co${monster.image}`}
            alt={monster.desc}
          />
        ) : null}
      </div>
    );
  }
}
