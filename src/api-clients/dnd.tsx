const host = "https://www.dnd5eapi.co";

export type Monster = {
  index: string;
  name: string;
  url: string;
  image: string;
  desc: string;
};
export type MonsterPreview = Pick<Monster, "index" | "name" | "url">;

export async function fetchMonsters(): Promise<MonsterPreview[]> {
  return fetch(`${host}/api/monsters`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => console.error(error));
}

export async function fetchMonster(index: string): Promise<Monster> {
  return fetch(`${host}/api/monsters/${index}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.error(error));
}
