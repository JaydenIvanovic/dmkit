"use client";

import { MonsterPreview, fetchMonsters } from "@/api-clients/dnd";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-4xl mb-6">Monster Manual</h1>
      <List></List>
    </div>
  );
}

function List() {
  const [monsters, setMonsters] = useState<MonsterPreview[]>([]);

  useEffect(() => {
    fetchMonsters().then((monsters) => setMonsters(monsters));
  }, []);

  return (
    <ol>
      {monsters.map((monster) => {
        return (
          <li key={monster.index}>
            <a href={`/monsters/${monster.index}`}>{monster.name}</a>
          </li>
        );
      })}
    </ol>
  );
}
