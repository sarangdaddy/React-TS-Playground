import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { makeImagePath } from '@/Utils';
import * as S from './styles';
import { IMovie } from '@/types';
import { SLIDER_OFFSET } from '@/constants/home';

interface SliderProps {
  moviesList?: IMovie[];
}

enum ControlKeys {
  LEFT = -1,
  RIGHT = 1,
}

const Slider = ({ moviesList = [] }: SliderProps) => {
  const navigate = useNavigate();
  const [sliderPage, setSliderPage] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  const handleSliderPage = (controlKey: ControlKeys) => {
    if (moviesList && !leaving) {
      setLeaving(true);
      setDirection(controlKey === ControlKeys.RIGHT ? 'right' : 'left');
      const totalMovies = moviesList.length - 1;
      const maxSliderPage = Math.floor(totalMovies / SLIDER_OFFSET) - 1;

      setSliderPage((prev) => {
        const newPage = prev + controlKey;
        if (newPage < 0) return maxSliderPage;
        if (newPage > maxSliderPage) return 0;
        return newPage;
      });
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`movies/${movieId}`);
  };

  return (
    <S.Slider>
      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={toggleLeaving}
      >
        <S.SliderControl>
          <S.StyledIcon
            onClick={() => handleSliderPage(ControlKeys.LEFT)}
            icon="chevron-left"
            size="3x"
          />
          <S.StyledIcon
            onClick={() => handleSliderPage(ControlKeys.RIGHT)}
            icon="chevron-right"
            size="3x"
          />
        </S.SliderControl>
        <S.Row
          custom={direction}
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
                onClick={() => (!leaving ? onBoxClicked(movie.id) : null)}
                $leaving={leaving}
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
