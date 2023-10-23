import axios from 'axios';
import { AUTHORIZATION, API_BASE_URL } from '@/constants/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${AUTHORIZATION}`,
  },
});

export const getTopRatedMovies = async () => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/movie/top_rated?language=en-US&page=1`,
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPopularMovies = async () => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/movie/popular?language=en-US&page=1`,
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/movie/upcoming?language=en-US&page=1`,
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/movie/now_playing?language=en-US&page=1`,
    );

    return res.data;
  } catch (err) {
    return err;
  }
};

export const getMovieDetail = async (movieId: string | undefined) => {
  try {
    const res = await axiosInstance.get(
      `${API_BASE_URL}/movie/${movieId}?language=en-US`,
    );
    return res.data;
  } catch (err) {
    return err;
  }
};
