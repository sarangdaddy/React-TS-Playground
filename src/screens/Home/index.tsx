import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import { getTopRatedMovies } from '@/apis/index';
import { IGetMoviesResult } from '@/types';
import { makeImagePath } from '@/Utils';

const SLIDER_OFFSET = 6;

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>({
    queryKey: ['topRated'],
    queryFn: getTopRatedMovies,
  });
  const [sliderPage, setSliderPage] = useState(0);
  const [leaving, setLeaving] = useState(false);

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

  return (
    <>
      <S.Wrapper>
        {isLoading ? (
          <S.Loader>Loading...</S.Loader>
        ) : (
          <>
            <S.Banner
              onClick={increaseIndex}
              $bgPhoto={makeImagePath(data?.results[1].backdrop_path || '')}
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
                        $bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                        key={movie.id}
                      />
                    ))}
                </S.Row>
              </AnimatePresence>
            </S.Slider>
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default Home;
