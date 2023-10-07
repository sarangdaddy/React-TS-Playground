import { useQuery } from '@tanstack/react-query';
import * as S from './styles';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';

import Banner from '@/components/Banner';
import Slider from '@/components/Slider';
import Detail from '@/components/Detail';

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
  });

  return (
    <>
      <S.Wrapper>
        {isLoading ? (
          <S.Loader>Loading...</S.Loader>
        ) : (
          <>
            <Banner moviesList={data?.results} />
            <Slider moviesList={data?.results} />
            <Detail moviesList={data?.results} />
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Home;
