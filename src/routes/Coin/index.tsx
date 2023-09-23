import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinInfo, fetchCoinTickers } from '@/api/fetcher';
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
  const coinId = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId.coinId),
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId.coinId),
  );

  const loading = infoLoading || tickersLoading;

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </S.Title>
      </S.Header>
      {loading ? (
        <S.Loader>Loading...</S.Loader>
      ) : (
        <>
          <S.Overview>
            <S.OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? 'Yes' : 'No'}</span>
            </S.OverviewItem>
          </S.Overview>
          <S.Description>{infoData?.description}</S.Description>
          <S.Overview>
            <S.OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </S.OverviewItem>
            <S.OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </S.OverviewItem>
          </S.Overview>

          <S.Tabs>
            <S.Tab $isActive={chartMatch !== null ? true : false}>
              <Link to={`chart`}>Chart</Link>
            </S.Tab>
            <S.Tab $isActive={priceMatch !== null ? true : false}>
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
