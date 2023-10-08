import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import * as S from './styles';
import Banner from '@/components/Banner';
import Slider from '@/components/Slider';
import Detail from '@/components/Detail';
import Loader from '@/screens/Loader';

const Popular = () => {
  const location = useLocation();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['popular'],
    queryFn: getPopularMovies,
  });

  const showDetail = location.pathname.includes('/movies/');

  return (
    <S.Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner moviesList={data?.results} />
          <Slider moviesList={data?.results} />
          {showDetail && <Detail />}
        </>
      )}
    </S.Wrapper>
  );
};

export default Popular;
