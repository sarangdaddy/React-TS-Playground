# Recoil과 React Hook Form을 이용한 ToDoList 만들기

- Recoil의 Atoms와 Selectors 그리고 React Hook Form을 학습하며 ToDoList를 만들어 보자.

## Selectors란?

- 앞서 학습한 `Atoms`와 함께 Recoil에는 `Selectors`라는 개념이 존재한다.
- `Selectors`는 Atoms 상태 값을 동기 또는 비동기 방식을 통해 `변환`한다.

> Recoil의 selectors는 파생 상태(derived state) 또는 상태 변환을 계산하고 관리하기 위한 도구다.  
> selectors는 기본적으로 하나 이상의 atom 또는 다른 selectors의 상태를 기반으로 새로운 상태 값을 계산하는 `순수 함수`다.

## Selectors의 특징

- Selector는 atoms나 다른 selectors를 입력으로 받아들이는 순수 함수(pure function)다.
- 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다.
- 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트들도 다시 렌더링 된다.
- 컴포넌트의 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로 서로 대체할 수 있다.

### 1. 파생 상태 (get)

- 여러 `atom`의 값을 결합하여 새로운 상태 값을 계산할 수 있다.

```jsx
const lengthState = selector({
  key: 'lengthState',
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});
```

### 2. 비동기 쿼리 (get)

- `selectors`는 비동기 작업을 수행하고 결과를 상태로 반환할 수 있다.

```jsx
const userDataSelector = selector({
  key: 'userData',
  get: async ({ get }) => {
    const response = await fetch('/api/user');
    return response.json();
  },
});
```

### 3. 다른 상태 변경 (set)

- selectors는 set 함수를 사용하여 연관된 atom 또는 다른 selectors의 상태를 변경할 수 있다.

```jsx
const resetAllData = selector({
  key: 'resetAllData',
  set: ({ reset }) => {
    reset(dataAtom1);
    reset(dataAtom2);
  },
});
```

### 4. 캐싱

- selectors는 계산된 결과를 자동으로 캐시한다.
- 같은 입력에 대한 결과가 이미 캐시되어 있으면, selectors는 캐시된 값을 재사용한다.

### 5. 의존성 관리

- selectors는 자동으로, 의존하는 atom 또는 selectors의 변화를 감지한다.
- 따라서 의존하는 상태가 변경되면 해당 selectors도 자동으로 업데이트된다.

## ToDoList 만들기

### 1. Recoil 상태 설정 (Atoms, Selectors)

- 전역 상태로 관리할 toDoList 배열을 atoms로 정의한다.
- toDoList에 존재하는 toDo들의 상태를 기반으로 filter하기 위한 Selectors를 정의한다.

```tsx
import { atom, selector } from 'recoil';

export enum FilterKeys {
  'TOGO' = 'TOGO',
  'BEEN' = 'BEEN',
  'LIKE' = 'LIKE',
  'DEL' = 'DEL',
}

export interface IToDo {
  id: number;
  text: string;
  filterKey: FilterKeys;
}

export const toDoListFilterState = atom<FilterKeys>({
  key: 'toDoListFilterState',
  default: FilterKeys.TOGO,
});

export const toDoListState = atom<IToDo[]>({
  key: 'toDoListState',
  default: JSON.parse(localStorage.getItem('toDoList') || '[]'),
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoListState);

    return [
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.TOGO),
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.BEEN),
      toDos.filter((toDo) => toDo.filterKey === FilterKeys.LIKE),
    ];
  },
});
```

<img src="https://velog.velcdn.com/images/sarang_daddy/post/ec2e3248-e06c-43c8-b4d4-b55061195560/image.png" width="50%">

- ToDo가 되는 개체의 타입을 정의한다.
- Filter로 사용될 key값을 enum을 사용해 안정성을 높여준다.

<img src="https://velog.velcdn.com/images/sarang_daddy/post/f9ba1912-d95d-4e16-bb56-ecd5acd536b1/image.png" width="50%">

- 사용자가 입력하는 ToDo들을 가지는 리스트 상태다.
- 로컬스토리지에 저장된 값이 있다면 불러오고 없다면 빈 배열로 초기화 한다.

<img src="https://velog.velcdn.com/images/sarang_daddy/post/70e11749-aff5-4741-ad4b-0f70f98d7b37/image.png" width="50%">

- toDo의 filterKey 속성에 들어갈 값
- 최초 toDo 생성시 TOGO 키값으로 초기화 한다.

<img src="https://velog.velcdn.com/images/sarang_daddy/post/ac85de0a-288a-4e87-b788-871da71a2ff8/image.png" width="50%">

- `toDoListState` atom의 전체 할 일 목록을 가져와서, 각 filterKey에 따라 필터링하여 새로운 배열을 반환한다.
- 이렇게 **원본 상태를 기반으로 새로운 값을 계산하는** 기능이 selector의 핵심적인 특징이다.

### 2. Form 컴포넌트 구현

- React Hook Form의 useForm 훅을 사용하여 폼을 구현한다.
- 폼 요소(예: input)에 register 함수를 연결하여 폼과 관련된 상태와 함수를 관리한다.
- 필요한 경우 유효성 검사 또는 에러 핸들링을 구현한다.

```tsx
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { toDoSelector, toDoListState } from '@/atoms';
import ToDo from './ToDo';
import CreateToDo from './CreateToDo';

export default function ToDoList() {
  // 전역 상태로 관리되는 toDoListState 상태값을 불러온다.
  const toDoList = useRecoilValue(toDoListState);
  // toDoSelector로 필터링된 배열값들을 불러온다.
  const [toGo, been, like] = useRecoilValue(toDoSelector);

  // toDoList의 최신 상태를 로컬스토리지에 저장한다.
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <CreateToDo />
      <ul>{toGo?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <h2>내가 가본 나라들</h2>
      <ul>{been?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
      <h2>내가 좋아하는 나라들</h2>
      <ul>{like?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}</ul>
    </main>
  );
}
```

<img src="https://velog.velcdn.com/images/sarang_daddy/post/542c8f44-4d00-4b1c-ac06-c3d3f57c593a/image.png" width="50%">

- toDoSelector로 필터링된 값들을 UI 요소로 사용하고 있다.
- 실제 상태의 원본값은 필터링 되어 분리되어 있지 않다.
- 원본 상태의 훼손과 변경없이 selector를 활용한 매우 유용한 기능이다.

### 3. 컴포넌트에서 Recoil 상태의 사용

- 폼의 제출 함수(onSubmit) 내에서 Recoil 상태를 업데이트하거나, 폼의 초기 값으로 Recoil 상태를 사용한다.
- 필요한 경우 selectors를 사용하여 폼 데이터를 변환하거나 비동기 작업을 수행한다.

```tsx
// CreateToDo 컴포넌트
const CreateToDo = () => {
  // toDoList에 새로운 toDo를 추가하기 위해 useSetRecoilState 함수 호출
  const setToDoList = useSetRecoilState(toDoListState);
  // 새로운 toDo의 필터키 값을 주기위해 초기화 filterKey값 호출
  const filterKey = useRecoilValue(toDoListFilterState);

  const { register, handleSubmit, setValue, formState } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDoList((prevToDos) => [
      ...prevToDos,
      { text: toDo, id: Date.now(), filterKey },
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'Please write a To Do',
        })}
        placeholder="나라 이름"
      />
      <button>가자!</button>
      <span>{formState.errors.toDo?.message}</span>
    </form>
  );
};

export default CreateToDo;
```

<img src="https://velog.velcdn.com/images/sarang_daddy/post/5b293c0b-e3b9-4c06-b403-b0ed5c63a8ec/image.png" width="50%">

- RHF로 제출된 toDo를 기존 toDoList에 추가하는 함수 로직
- 최초 filterKey 값은 전역 상태에서 지정한 TODO가 된다.
- 전역 상태로 관리하기에 전역 상태에서만 변경해주면 구독 중인 모든 컴포넌트에 동일하기 적용된다.
- 즉, 다른 컴포넌트에서 filterKey를 활용한 기능 추가에 더욱 유용하다.

```tsx
// ToDo 컴포넌트
const ToDo = ({ text, filterKey, id }: IToDo) => {
  // toDoList의 toDo 상태를 변경하기 위해 useSetRecoilState 함수 호출
  const setToDoList = useSetRecoilState(toDoListState);

  const onClick = (setFilterKey: IToDo['filterKey']) => {
    setToDoList((prevToDos) => {
      if (setFilterKey === FilterKeys.DEL) {
        return prevToDos.filter((toDo) => toDo.id !== id);
      }

      return prevToDos.map((toDo) =>
        toDo.id === id ? { ...toDo, filterKey: setFilterKey } : toDo,
      );
    });
  };

  return (
    <li>
      <span>{text}</span>
      {filterKey == FilterKeys.TOGO && (
        <>
          <button onClick={() => onClick(FilterKeys.BEEN)}>BEEN</button>
          <button onClick={() => onClick(FilterKeys.DEL)}>DEL</button>
        </>
      )}
      {filterKey == FilterKeys.BEEN && (
        <>
          <button onClick={() => onClick(FilterKeys.TOGO)}>TOGO</button>
          <button onClick={() => onClick(FilterKeys.LIKE)}>LIKE</button>
        </>
      )}
      {filterKey == FilterKeys.LIKE && (
        <button onClick={() => onClick(FilterKeys.BEEN)}>UNLIKE</button>
      )}
    </li>
  );
};

export default ToDo;
```

<img src="https://velog.velcdn.com/images/sarang_daddy/post/a6557d5d-9f8d-4a4b-a7df-5230d53d7af6/image.png" width="50%">

- ToDo 컴포넌트는 앞서 toDoList에서 필터링된 상태값들을 props로 받아오고 있다.
- 원본 상태를 변경하지 않고 selector로 새로운 상태값을 파생하여 만든 컴포넌트가 된다.

> 원본 상태를 필터링하여 렌더링한 UI, 원본 상태를 파생하여 생성한 컴포넌트 모두 원본 상태와 의존되어 있다.

<img src="https://velog.velcdn.com/images/sarang_daddy/post/0643c229-c87b-4693-a3c5-7ed68af8c7fd/image.png" width="50%">

- 파생된 값으로 만들어진 컴포넌트 ToDo에서도 전역 상태의 toDoList를 변경할 수 있다.
- toDoList 상태를 변경 하면 의존성에 의해서 toDoList를 구독한 컴포넌트들은 모두 리렌더링 된다.

## ToDoList 결과물

![](https://velog.velcdn.com/images/sarang_daddy/post/27114a9c-8708-45f5-998f-4e83fffa84fc/image.gif)
