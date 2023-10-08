import { useRef } from 'react';
import { useNavigate, useParams, useMatch, PathMatch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import * as S from './styles';
import { IMovie } from '@/types';
import { makeImagePath } from '@/Utils';

interface DetailProps {
  moviesList?: IMovie[];
  pathName: string;
}

const Detail = ({ moviesList = [], pathName }: DetailProps) => {
  const navigate = useNavigate();
  const selectedMovieId = useParams();
  const initialPathNameRef = useRef(pathName);

  const selectedMovieInfo =
    selectedMovieId &&
    moviesList.find((movie) => movie.id.toString() === selectedMovieId.movieId);

  const moviePathMatch: PathMatch<string> | null = useMatch(
    `${initialPathNameRef.current}/movies/${selectedMovieId.movieId}`,
  );

  const onOverlayClick = () => {
    navigate(-1);
  };
  return (
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
                <S.ModalDetail>{selectedMovieInfo.overview}</S.ModalDetail>
              </>
            )}
          </S.Modal>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Detail;
