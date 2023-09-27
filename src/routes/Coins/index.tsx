import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '@/api/fetcher';
import * as S from './styles';
import { isDarkAtom } from '@/atoms';
import { useSetRecoilState } from 'recoil';

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Coins</S.Title>
        <S.DarkModeIcon onClick={toggleDarkAtom} icon="moon" size="2x" />
      </S.Header>
      {isLoading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <S.CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <S.Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <S.Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <span>{coin.name}</span>
                <span>&rarr;</span>
              </Link>
            </S.Coin>
          ))}
        </S.CoinsList>
      )}
    </S.Container>
  );
};

export default Coins;
