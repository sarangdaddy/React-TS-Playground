import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import * as S from './styles';
import Banner from '@/components/Banner';
import Slider from '@/components/Slider';
import Detail from '@/components/Detail';
import Loader from '@/screens/Loader';

const Home = () => {
  const location = useLocation();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
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

export default Home;
