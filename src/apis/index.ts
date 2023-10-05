const API_KEY = 'f6b16b57ffc789afe0c7942fc8ef2072';
const BASE_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmIxNmI1N2ZmYzc4OWFmZTBjNzk0MmZjOGVmMjA3MiIsInN1YiI6IjY1MWU2YTFiNWIxMjQwMDBhZDY4MjllYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WH7VKPkX9aQi-8BvHxkTXV_9kIw5iYZnMucIxiDyBcg',
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
