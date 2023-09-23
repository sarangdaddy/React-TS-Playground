const BASE_URL = `https://disney_api.nomadcoders.workers.dev`;

export const fetchCharacters = () => {
  return fetch(`${BASE_URL}/characters`).then((response) => response.json());
};

export const fetchCharacterDetail = (characterId: string | undefined) => {
  return fetch(`${BASE_URL}/characters/${characterId}`).then((response) =>
    response.json(),
  );
};
