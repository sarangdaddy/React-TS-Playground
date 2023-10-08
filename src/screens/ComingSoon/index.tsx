import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUpcomingMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import * as S from './styles';
import Banner from '@/components/Banner';
import Slider from '@/components/Slider';
import Detail from '@/components/Detail';
import Loader from '@/screens/Loader';

const ComingSoon = () => {
  const location = useLocation();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies,
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

export default ComingSoon;
