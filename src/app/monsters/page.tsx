"use client";

import { MonsterPreview, fetchMonsters } from "@/api-clients/dnd";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <List></List>
    </main>
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
