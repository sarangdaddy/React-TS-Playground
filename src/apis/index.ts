import { AUTHORIZATION, BASE_URL } from '@/constants/api';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTHORIZATION}`,
  },
};

export const getTopRatedMovies = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
      options,
    );
    const res_1 = await res.json();
    return res_1;
  } catch (err) {
    return err;
  }
};
