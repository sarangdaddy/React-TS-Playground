# React Query

- React Query는 웹 애플리케이션에서 서버 `데이터를 효율적으로 가져오고`, `캐싱`하며 동기화하는 데 도움을 주는 라이브러리다.
- 이 라이브러리의 도움으로 개발자는 서버와의 `데이터 동기화`, `데이터 리프레시`, `오류 처리` 등의 복잡한 작업을 훨씬 간결하게 처리할 수 있다.

## React Query의 장점

- 자동 데이터 리프레시 : 사용자에게 항상 최신의 데이터를 제공한다.
- 백그라운드 데이터 동기화 : 애플리케이션이 백그라운드에서도 데이터를 동기화한다.
- 오류 처리 : API 호출에서 오류가 발생하면 error 및 isError 상태를 통해 쉽게 처리할 수 있다.
- 캐싱 : 데이터를 자동으로 캐시하여 반복적인 요청을 피하고 성능을 향상시킨다.

## 기존 fetch 방식

- 전통적인 데이터 가져오기 방법은 useState와 useEffect를 사용하여 데이터 상태를 관리하고 API 호출을 수행한다.

```tsx
// 기존 코드 예시
const Coins = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isIgnore = false;

    (async () => {
      const response = await fetch('https://api.coinpaprika.com/v1/coins');
      const json = await response.json();

      if (!isIgnore) {
        setCoins(json.slice(0, 100));
        setLoading(false);
      }
    })();

    return () => {
      isIgnore = true;
    };
  }, []);

  // 렌더링 로직
};
```

## React Query 사용

### 1. 설치

```bash
npm i @tanstack/react-query
```

### 2. QueryClient, QueryClientProvider 생성

- React Query를 사용하려면 먼저 QueryClient를 생성하고 이를 QueryClientProvider에 전달해야 한다.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
```

### 3. useQuery 훅으로 fetcher 함수 전달

- 데이터를 가져오기 위해 useQuery 훅을 사용하고, 데이터 가져오기 함수를 제공한다.

```tsx
const Coins = () => {
  const { isLoading, data } = useQuery(['allCoins'], fetchCoins);

	/* 아래 코드는 모두 삭제된다. */
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let isIgnore = false;

  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();

  //     if (isIgnore) {
  //       setCoins(json.slice(0, 100));
  //       setLoading(false);
  //     }
  //   })();

  //   return () => {
  //     isIgnore = true;
  //   };
  // }, []);
```

- API 요청 함수는 따로 파일을 분리해서 관리한다.

```tsx
// api fetcher 파일
const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchCoinInfo = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json(),
  );
};

export const fetchCoinTickers = (coinId: string | undefined) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json(),
  );
};
```

### 4. useQuery 훅 설명

```tsx
const { isLoading, data } = useQuery(['allCoins'], fetchCoins);
```

- isLoading : 기존에 state로 따로 관리해주던 로딩 불리언 값을 react query에서 반환해준다.
- data : fetch후 받아온 데이터를 반환해준다.
- [’allCoins’] : Query Key - query를 고유하게 식별해주는 key로 필수 항목이다.
- React Query는 쿼리 키를 기반으로 쿼리 캐싱을 관리한다.

### 5. 렌더링 로직에 적용

```tsx
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '@/api/fetcher';
import * as S from './styles';

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
  const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Coins</S.Title>
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
```

> useState와 useEffect로 상태를 관리하고 데이터를 호출하던 로직을 react query를 통해 한번에 해결할 수 있다.  
> 💡 React Query는 `데이터를 자동으로 캐싱`하므로 동일한 요청을 여러 번 수행할 필요가 없다.

## 여러 useQuery 사용하기

- 때로는 하나의 컴포넌트에서 여러 데이터 소스를 동시에 요청해야 할 수 있다.
- React Query의 useQuery는 이러한 상황을 간단히 처리할 수 있게 해준다.

### Query key 구성

- 각 쿼리는 고유한 키를 가져야 한다.
- 이 키를 사용하여 내부적으로 캐싱된 데이터를 관리한다.
- 복잡한 쿼리의 경우, 쿼리 키를 배열로 구성하여 고유성을 보장할 수 있다.
- 예를 들어, 특정 코인의 정보와 티커를 동시에 가져오는 경우 다음과 같이 작성할 수 있다.

```tsx
const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
  ['info', coinId],
  () => fetchCoinInfo(coinId.coinId),
);

const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
  ['tickers', coinId],
  () => fetchCoinTickers(coinId.coinId),
);
```

- 위의 코드에서 coinId를 쿼리 키의 일부로 사용하여 각 코인에 대한 정보와 티커 쿼리를 고유하게 식별한다.

### 여러 쿼리의 상태 관리

- 두 개 이상의 useQuery를 사용할 때, 각 쿼리의 로딩 상태나 에러 상태를 개별적으로 처리할 수 있다.
- 예를 들어, 위의 예시에서는 infoLoading과 tickersLoading을 통해 각 쿼리의 로딩 상태를 파악할 수 있다.
- 필요한 경우, 이러한 상태들을 조합하여 컴포넌트의 전체 로딩 상태를 결정할 수도 있다.

```tsx
const loading = infoLoading || tickersLoading;
```

- 이렇게하면 Coin 컴포넌트의 렌더링 로직에서 loading 변수를 사용하여 전체 로딩 상태를 처리할 수 있다.

<br/>

# React Query Devtools

- 앞서 React Query는 데이터를 자동으로 캐시하므로 동일한 요청을 여러 번 수행할 필요가 없다고 했다.
- React Query Devtools는 `캐싱된 쿼리`와 `관련된 정보`를 시각적으로 확인할 수 있게 도와주는 도구다.

## React Query Devtools 설치

```bash
npm i @tanstack/react-query-devtools
```

## React Query Devtools 적용

```tsx
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from '@/styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
```

- 애플리케이션에서 캐싱된 데이터를 보여주는 도구가 추가된다.

<img src="https://velog.velcdn.com/images/sarang_daddy/post/b10eac6a-e355-40b5-bdda-063eeb63ae4e/image.png" width="80%">

> Devtools는 개발 모드에서만 번들에 포함되므로, 프로덕션 빌드 중에 제외하는 것에 대해 걱정할 필요가 없다.
