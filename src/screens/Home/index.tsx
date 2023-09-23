import { useQuery } from '@tanstack/react-query';
import { fetchCharacters } from '@/api/fetcher';

import * as S from './styles';
import Loader from '@/components/Loader';

interface ICharacter {
  id: number;
  imageUrl: string;
  name: string;
}

const Home = () => {
  const { isLoading, data } = useQuery<ICharacter[]>(
    ['allCharacters'],
    fetchCharacters,
  );

  return (
    <div>
      <S.Title>Disney Characters</S.Title>
      {isLoading ? (
        <Loader />
      ) : (
        <S.Container>
          {data?.slice(0, 50).map((character) => (
            <S.ItemLink to={`/character/${character.id}`} key={character.id}>
              <img src={character.imageUrl} />
              <span className="name">{character.name}</span>
            </S.ItemLink>
          ))}
        </S.Container>
      )}
    </div>
  );
};

export default Home;
