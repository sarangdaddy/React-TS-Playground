import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import * as S from './styles';
import { makeImagePath } from '@/Utils';
import { getMovieDetail } from '@/apis';
import Loader from '@/screens/Loader';

const Detail = () => {
  const navigate = useNavigate();
  const selectedMovieId = useParams();

  const { isLoading, data } = useQuery({
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
            <Loader />
          ) : data ? (
            <>
              <S.ModalCover
                $bgPhoto={makeImagePath(data.backdrop_path, 'w500')}
              />
              <S.ModalTitle>{data.title}</S.ModalTitle>
              <S.ModalDetail>{data.overview}</S.ModalDetail>
            </>
          ) : null}
        </S.Modal>
      </>
    </AnimatePresence>
  );
};

export default Detail;
