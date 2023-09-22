import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import * as S from './styles';

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Coin = () => {
  const [loading, setLoading] = useState(true);
  const coinId = useParams();
  const { state } = useLocation();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  useEffect(() => {
    let isIgnore = false;

    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId.coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId.coinId}`)
      ).json();

      if (isIgnore) {
        setInfo(infoData);
        setPriceInfo(priceData);
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
        <S.Title>
          {state?.name ? state.name : loading ? 'Loading...' : info?.name}
        </S.Title>
      </S.Header>
      {loading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <>
          <S.Overview>
            <S.OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? 'Yes' : 'No'}</span>
            </S.OverviewItem>
          </S.Overview>
          <S.Description>{info?.description}</S.Description>
          <S.Overview>
            <S.OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </S.OverviewItem>
          </S.Overview>

          <S.Tabs>
            <S.Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </S.Tab>
            <S.Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </S.Tab>
          </S.Tabs>

          <Outlet />
        </>
      )}
    </S.Container>
  );
};

export default Coin;
