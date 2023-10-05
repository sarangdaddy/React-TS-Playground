import { useQuery } from '@tanstack/react-query';
import * as S from './styles';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import { makeImagePath } from '@/Utils';

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
            <S.Banner
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
            >
              <S.Title>{data?.results[0].title}</S.Title>
              <S.Overview>{data?.results[0].overview}</S.Overview>
            </S.Banner>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Home;
