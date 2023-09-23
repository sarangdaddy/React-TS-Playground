import { fetchCharacters } from '@/api/fetcher';
import Loader from '@/components/Loader';
import { useQuery } from '@tanstack/react-query';

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
    <>
      <h1>Home</h1>
      <Loader />
    </>
  );
};

export default Home;
