import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNowPlayingMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import * as S from './styles';
import Banner from '@/components/Banner';
import Slider from '@/components/Slider';
import Detail from '@/components/Detail';
import Loader from '@/screens/Loader';

const NowPlaying = () => {
  const location = useLocation();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['nowPlaying'],
    queryFn: getNowPlayingMovies,
  });

  return (
    <S.Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner moviesList={data?.results} />
          <Slider moviesList={data?.results} />
          <Detail pathName={location.pathname} moviesList={data?.results} />
        </>
      )}
    </S.Wrapper>
  );
};

export default NowPlaying;
