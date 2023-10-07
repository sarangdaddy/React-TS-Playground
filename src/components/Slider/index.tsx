import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { makeImagePath } from '@/Utils';
import * as S from './styles';
import { IMovie } from '@/types';
import { ROUTE_PATH } from '@/router/routePath';
import { SLIDER_OFFSET } from '@/constants/home';

interface SliderProps {
  moviesList?: IMovie[];
}

const Slider = ({ moviesList = [] }: SliderProps) => {
  const navigate = useNavigate();
  const [sliderPage, setSliderPage] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (moviesList) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = moviesList.length - 1;
      const maxSliderPage = Math.floor(totalMovies / SLIDER_OFFSET) - 1;
      setSliderPage((prev) => (prev === maxSliderPage ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`${ROUTE_PATH.HOME}movies/${movieId}`);
  };

  return (
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
          {moviesList
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
  );
};

export default Slider;
