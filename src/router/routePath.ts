export const ROUTE_PATH = {
  ROOT: `${process.env.PUBLIC_URL}/`,
  HOME: `${process.env.PUBLIC_URL}/`,
  POPULAR: `${process.env.PUBLIC_URL}/popular`,
  COMING_SOON: `${process.env.PUBLIC_URL}/coming-soon`,
  NOW_PLAYING: `${process.env.PUBLIC_URL}/now-playing`,
  SEARCH: `${process.env.PUBLIC_URL}/search`,
  MOVIE_INFO: `movies/:movieId`,
} as const;
