# Why Recoil?

- Recoil은 React 애플리케이션의 상태 관리를 위한 라이브러리다.
- 호환성과 단숨함을 위해서는 라이브러리보다는 React 자체에 내장된 상태 관리 기능을 사용함이 좋다.
- 하지만, React의 자체 상태 관리 기능에는 다음과 같은 한계가 존재한다.
  - 컴포넌트의 상태는 공통된 상위요소까지 끌어올려야만 공유된다. 이 과정에서 공유되는 모든 컴포넌트가 리렌더링 된다.
  - 전역 상태 관리를 지원하는 Context API는 여러 개의 독립적인 상태 값을 동시에 효율적으로 관리하기 어렵다.
  - 이 두 가지 특성이 트리의 최상단부터 트리의 말단까지의 코드 분할을 어렵게 한다.

## Context API의 한계

- Context는 하나의 'value' 속성만 가질 수 있다.
- 즉, 사용자 정보과 테마 설정을 동시에 Context를 통해 관리하고자 한다면 이 두 상태를 하나의 객체로 묶어서 전달해야 한다.

```jsx
const MyContext = React.createContext();

<MyContext.Provider value={{ userInfo, themeSettings }}>
  ...
</MyContext.Provider>;
```

- 이는 userInfo만의 상태를 변경하더라도 Context의 변화를 감지하고 themeSettings를 가지는 컴포넌트로 리렌더링된다.
- 때문에 이 두 상태를 분리하고 각각의 상태에 대해 다른 컴포넌트가 구독하고자 한다면 각 상태에 대해 별도의 Context를 생성해야 한다.
- 이는 코드의 복잡성이 증가하고 관리가 어려워 진다.

## Atoms

- Atoms는 Recoil의 핵심 개념으로 컴포넌트의 상태를 따로 분리하여 관리한다.
- Atoms라는 별도의 파일에서 상태를 관리하고 여러 컴포넌트에서 사용되는 경우 상태를 공유한다.
- 즉, atoms를 간단하게 이애한다면 전역에 존재하는 context와 유사하다.
- 다만, 컴포넌트는 특정 atom을 구독하는 매커니즘으로 해당 atom을 구독한 컴포넌트들만 리렌더링된다.

> Recoil의 핵심 장점 중 하나는 효율적인 구독 메커니즘이 있어서 해당 atom을 직접 구독하는 컴포넌트만 해당 atom의 변화에 반응하여 리렌더링된다.

## Recoil로 다크모드 적용하기

- Recoil의 atom을 사용하여 다크모드 기능을 구현해 보자.

### 1. recoil 설치

```sh
npm install recoil
```

### 2. recoil 적용

- 앱 전역에 recoil을 적용한다.

```tsx
// index
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);
```

### 3. Atoms 생성

```tsx
import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});
```

- `key` : Atoms는 디버깅, 지속성 및 모든 atoms의 map을 볼 수 있는 `고유한 키`가 필요하다.
- `default` : 컴포넌트의 상태처럼 기본값을 가진다.

### 4. Atoms 상태값 사용

```tsx
// App
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
```

- `useRecoilValue()` 훅을 통해서 어느 컴포넌트에서든 사용이 가능하다.
- 다크 모드의 경우 모든 App에 전달되어야 하므로 App에서 사용한다.

### 5. Atoms 상태값 변경

```tsx
// coins
import { isDarkAtom } from '@/atoms';
import { useSetRecoilState } from 'recoil';

const Coins = () => {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

return (
    <S.Container>
      <S.Header>
        <S.Title>Coins</S.Title>
        <S.DarkModeIcon onClick={toggleDarkAtom} icon="moon" size="2x" />
```

- `useSetRecoilState()` 훅을 통해 Atom의 상태를 변경하는 함수를 만들 수 있다.
- `const [state, setState] = useState()`의 setState와 유사하다.
- 다만, **다른 컴포넌트에서도 사용할 수 있다는 차이가 있다.**

### 6. 구현 결과

![](https://velog.velcdn.com/images/sarang_daddy/post/d8303efe-860f-4928-bb50-72e215fc85f7/image.gif)

## Recoil의 훅

### 1. useRecoilState

- useState와 유사하게 동작하는 훅. 주어진 atom의 상태와 해당 상태를 설정하는 함수를 반환한다.

```jsx
const [value, setValue] = useRecoilState(myAtom);
```

### 2. useRecoilValue

- 주어진 atom 또는 selector의 `현재 값`을 반환하는 훅. 상태만을 읽을 때 사용한다.

```jsx
const value = useRecoilValue(myAtom);
```

### 3. useSetRecoilState

- 주어진 atom의 상태를 설정하는 함수만을 반환하는 훅.
- 상태를 변경할 때만 필요하고, 현재 값을 알 필요가 없는 경우에 사용한다.

```jsx
const setValue = useSetRecoilState(myAtom);
```

### 4. useResetRecoilState

- 주어진 atom의 상태를 초기 상태로 재설정하는 함수를 반환하는 훅.

```jsx
const resetValue = useResetRecoilState(myAtom);
```

### 5. useRecoilCallback

- Recoil 상태에 액세스하거나 변경하는 콜백을 생성하는 훅.
- 이 콜백은 비동기 작업에 유용하며, Recoil 상태를 바깥 스코프에서 사용할 수 있게 해준다.

```jsx
const someCallback = useRecoilCallback(({ snapshot, set }) => async () => {
  const currentValue = snapshot.getLoadable(myAtom).contents;
  // Do something with currentValue or set new value
  set(myAtom, newValue);
});
```
