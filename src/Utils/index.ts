const BASE_IMAGE_PATH = 'https://image.tmdb.org/t/p/';

export const makeImagePath = (id: string, format?: string) => {
  return `${BASE_IMAGE_PATH}${format ? format : 'original'}/${id}`;
};
