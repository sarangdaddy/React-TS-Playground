import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isIgnore = false;

    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();

      if (isIgnore) {
        setCoins(json.slice(0, 100));
        setLoading(false);
      }
    })();

    return () => {
      isIgnore = true;
    };
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Coins</S.Title>
      </S.Header>
      {loading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <S.CoinsList>
          {coins.map((coin) => (
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
