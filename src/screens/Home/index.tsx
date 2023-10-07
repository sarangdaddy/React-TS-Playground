import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import { makeImagePath } from '@/Utils';
import { useNavigate, useParams, useMatch, PathMatch } from 'react-router-dom';
import { SLIDER_OFFSET } from '@/constants/home';
import { ROUTE_PATH } from '@/router/routePath';

const Home = () => {
  const navigate = useNavigate();
  const selectedMovieId = useParams();
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
  });
  const [sliderPage, setSliderPage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const selectedMovieInfo =
    selectedMovieId &&
    data?.results.find(
      (movie) => movie.id.toString() === selectedMovieId.movieId,
    );

  const moviePathMatch: PathMatch<string> | null = useMatch(
    ROUTE_PATH.MOVIE_INFO,
  );

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const maxSliderPage = Math.floor(totalMovies / SLIDER_OFFSET) - 1;
      setSliderPage((prev) => (prev === maxSliderPage ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`${ROUTE_PATH.HOME}movies/${movieId}`);
  };

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
            <S.Banner
              onClick={increaseIndex}
              $bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')}
            >
              <S.Title>{data?.results[0].title}</S.Title>
              <S.Overview>{data?.results[0].overview}</S.Overview>
            </S.Banner>
            <S.Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <S.Row
                  variants={S.rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'tween', duration: 1 }}
                  key={sliderPage}
                >
                  {data?.results
                    .slice(1)
                    .slice(
                      SLIDER_OFFSET * sliderPage,
                      SLIDER_OFFSET * sliderPage + SLIDER_OFFSET,
                    )
                    .map((movie) => (
                      <S.Box
                        layoutId={movie.id + ''}
                        className="box"
                        variants={S.boxVariants}
                        whileHover={'hover'}
                        initial={'normal'}
                        transition={{ type: 'tween' }}
                        key={movie.id}
                        onClick={() => onBoxClicked(movie.id)}
                      >
                        <S.Image
                          className="img"
                          src={makeImagePath(movie.backdrop_path, 'w500')}
                          alt={movie.title}
                        />
                        <S.Info variants={S.infoVariants}>
                          <h4>{movie.title}</h4>
                        </S.Info>
                      </S.Box>
                    ))}
                </S.Row>
              </AnimatePresence>
            </S.Slider>
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
