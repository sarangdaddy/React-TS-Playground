import { fetchCharacterDetail } from '@/api/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './styles';
import Loader from '@/components/Loader';

interface ICharacterDetail {
  id: number;
  imageUrl: string;
  name: string;
  sourceUrl: string;
  films: string[];
}

const Detail = () => {
  const characterId = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery<ICharacterDetail>(
    ['info', characterId],
    () => fetchCharacterDetail(characterId.id),
  );

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <S.Container>
          <S.BackBtn onClick={handleBackPage}>&larr;</S.BackBtn>
          <img src={data?.imageUrl} />
          <span>{data?.name}&apos; Films</span>
          <S.FilmsBox>
            {data?.films.map((film, index) => <span key={index}>{film}</span>)}
          </S.FilmsBox>
        </S.Container>
      )}
    </>
  );
};

export default Detail;
