const host = "https://www.dnd5eapi.co";

export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type Monster = {
  index: string;
  name: string;
  url: string;
  image?: string;
  desc?: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};
export type MonsterPreview = Pick<Monster, "index" | "name" | "url">;

export async function fetchMonsters(): Promise<Result<MonsterPreview[]>> {
  return fetch(`${host}/api/monsters`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      return { ok: true as true, value: result.results };
    })
    .catch((error) => {
      return { ok: false, error: error };
    });
}

export async function fetchMonster(index: string): Promise<Result<Monster>> {
  return fetch(`${host}/api/monsters/${index}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      return { ok: true as true, value: result };
    })
    .catch((error) => {
      return { ok: false, error: error };
    });
}
