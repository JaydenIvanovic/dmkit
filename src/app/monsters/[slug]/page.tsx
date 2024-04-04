"use client";

import { Monster, fetchMonster } from "@/api-clients/dnd";
import { useEffect, useState } from "react";

export default function MonsterDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const monsterId = params.slug;

  // Assert monsterIndex is truthy
  if (!monsterId) {
    return; //TODO: 404
  }

  // Assert monsterIndex is a string
  if (Array.isArray(monsterId)) {
    return; //TODO: 404
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MonsterDetail monsterId={monsterId} />
    </main>
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
