import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useMatch, PathMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import { makeImagePath } from '@/Utils';
import { ROUTE_PATH } from '@/router/routePath';
import Banner from '@/components/Banner';
import Slider from '@/components/Slider';

const Home = () => {
  const navigate = useNavigate();
  const selectedMovieId = useParams();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
  });

  const selectedMovieInfo =
    selectedMovieId &&
    data?.results.find(
      (movie) => movie.id.toString() === selectedMovieId.movieId,
    );

  const moviePathMatch: PathMatch<string> | null = useMatch(
    ROUTE_PATH.MOVIE_INFO,
  );

  const onOverlayClick = () => {
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <>
      <S.Wrapper>
        {isLoading ? (
          <S.Loader>Loading...</S.Loader>
        ) : (
          <>
            <Banner moviesList={data?.results} />
            <Slider moviesList={data?.results} />
            <AnimatePresence>
              {moviePathMatch ? (
                <>
                  <S.Overlay
                    onClick={onOverlayClick}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                  <S.Modal layoutId={selectedMovieId.movieId}>
                    {selectedMovieInfo && (
                      <>
                        <S.ModalCover
                          $bgPhoto={makeImagePath(
                            selectedMovieInfo.backdrop_path,
                            'w500',
                          )}
                        />
                        <S.ModalTitle>{selectedMovieInfo.title}</S.ModalTitle>
                        <S.ModalDetail>
                          {selectedMovieInfo.overview}
                        </S.ModalDetail>
                      </>
                    )}
                  </S.Modal>
                </>
              ) : null}
            </AnimatePresence>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Home;
