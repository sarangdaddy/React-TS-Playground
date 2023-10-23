import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import * as S from './styles';
import { makeImagePath } from '@/Utils';
import { getMovieDetail } from '@/apis';
import Loader from '@/screens/Loader';
import { IMovieDetail } from '@/types';

const Detail = () => {
  const navigate = useNavigate();
  const selectedMovieId = useParams();

  const { isLoading, data } = useQuery<IMovieDetail>({
    queryKey: ['movieId', selectedMovieId.movieId],
    queryFn: () => getMovieDetail(selectedMovieId.movieId),
  });

  const onOverlayClick = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <>
        <S.Overlay
          onClick={onOverlayClick}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <S.Modal layoutId={selectedMovieId.movieId}>
          {isLoading ? (
            <Loader viewHeight="80vh" />
          ) : data ? (
            <>
              <S.ModalCover
                $bgPhoto={makeImagePath(data.backdrop_path, 'w500')}
              />
              <S.ModalCloseBtn onClick={onOverlayClick}>
                <svg
                  width={30}
                  height={30}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </S.ModalCloseBtn>
              <S.ModalInfoBox>
                <S.ModalTitle>{data.title}</S.ModalTitle>
                <S.ModalAddInfos>
                  {data.genres.map((genre) => (
                    <S.ModalGenres key={genre.id}>{genre.name}</S.ModalGenres>
                  ))}
                  <div>({data.runtime} min)</div>
                </S.ModalAddInfos>
                <S.ModalDetail>{data.overview}</S.ModalDetail>
              </S.ModalInfoBox>
            </>
          ) : null}
        </S.Modal>
      </>
    </AnimatePresence>
  );
};

export default Detail;
