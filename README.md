# React-Router-Dom v6

## 1. createBrowserRouter

- v6.4부터 사용되는 라우터 생성 함수.
- DOM History API를 사용하여 URL을 업데이트하고 기록 스택을 관리한다.
- `createBrowserRouter()`를 호출하여 router를 만들어준다.

```tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([]);
```

## 2. Route

- `경로`를 라우터에 객체로 전달한다.
- `children` 속성으로 중첩된 라우트를 설정할 수 있다.
- `errorElement` 속성으로 렌더링 오류 발생시 보여주는 컴포넌트를 지정할 수 있다.
  - root에 설정된 errorElement는 잘못된 경로의 경우 렌더링 된다.
  - 하위 컴포넌트에서 설정된 errorElement는 컴포넌트 에러 발생시 렌더링 된다.

```tsx
import { createBrowserRouter } from 'react-router-dom';

import { About } from '@/screens/About';
import { Home } from '@/screens/Home';
import { Layout } from '@/screens/Layout';
import { NotFound } from '@/screens/NotFound';
import { ErrorComponent } from '@/components/ErrorComponent';
import { Author } from '@/screens/Author';
import { Book } from '@/screens/Author/Book';
import { Chapters } from '@/screens/Author/Book/Chapters';
import { Characters } from '@/screens/Author/Book/Characters';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'author/:authorName',
        element: <Author />,
        children: [
          {
            path: ':bookTitle',
            element: <Book />,
            children: [
              {
                path: 'chapters',
                element: <Chapters />,
              },
              {
                path: 'Characters',
                element: <Characters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
```

## useNavigate

- Route의 원하는 경로로 이동시켜준다.
- 기존의 Link는 사용자의 클릭이 필요하지만 useNavigate는 사용자 클릭 없이도 사용이 가능하다.

```tsx
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const goHomeClick = () => {
    navigate('');
  };

  const goAboutClick = () => {
    navigate('/about');
  };

  return (
    <ul>
      <li>
        <button onClick={goHomeClick}>Home</button>
      </li>
      <li>
        <button onClick={goAboutClick}>About</button>
      </li>
    </ul>
  );
};
```

## useParams

- 화면에서 url 정보를 가져올수 있다.
- 해당 url로 원하는 정보를 fetch하거나 화면에 렌더링할 수 있다.

```tsx
import { Link, Outlet, useParams } from 'react-router-dom';
import { authors } from '@/db';
import { useState } from 'react';

interface BookType {
  key: number;
  title: string;
  contents: { type: string; items: string[] }[];
}

export const Author = () => {
  const { authorName } = useParams();
  const author = authors.find((author) => author.name === authorName);
  const books = author?.books;

  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  return (
    <>
      <h1>{authorName}</h1>
      <hr />
      <ul>
        {books?.map((book) => (
          <li key={book.key}>
            <Link to={book.title} onClick={() => setSelectedBook(book)}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet context={{ book: selectedBook }} />
    </>
  );
};
```

## Outlet

- 현재 스크린의 자식들을 렌더링한다.
- 즉, root 컴포넌트인 Layout의 하위 route들은 Layout의 Outlet에 해당한다.

```tsx
// Layout.tsx
import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet /> // Layout 페이지의 Outlet
    </>
  );
};
```

```tsx
// Router.tsx
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      // Layout의 outlet에 해당하는 하위 라우터들
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'author/:authorName',
        element: <Author />,
        children: [
          {
            path: ':bookTitle',
            element: <Book />,
            children: [
              {
                path: 'chapters',
                element: <Chapters />,
              },
              {
                path: 'Characters',
                element: <Characters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
```

### 절대경로 vs 상대경로

경로(path)의 정의에 있어서, path 값 앞에 슬래시(/)가 있는지 없는지에 따라 두 가지 다른 동작을 한다.

1. 상대 경로 (path: 'chapters')

- 이 경로는 상위 경로에 상대적이다. 예를 들어, 상위 경로가 author/:authorName이면, 이 상대 경로는 author/:authorName/chapters가 된다.
- 다시 말해, 이 경로는 상위 경로에 연결되어 합쳐진다.
- 이 예제에서는 author/:authorName/:bookTitle/chapters로 해석된다.

2. 절대 경로 (path: '/chapters')

- 이 경로는 루트 경로부터 시작한다. 즉, 상위 경로와 관계없이 항상 작성된 경로를 가리킨다.
- 만약 path: '/chapters'를 사용했다면, 이 경로는 항상 도메인의 루트에서 /chapters를 가리키게 된다.

> 즉, path: 'chapters'를 사용하는 것은 상위 경로에 의존적인 반면, path: '/chapters'는 항상 동일한 위치를 가리키게 된다.

```
내부의 children 속성으로 정의된 경로 (예: path: ':bookTitle', path: 'chapters', path: 'characters')는 상위 경로에 의존적이다.
이 경로들을 절대 경로로 변경하면, 그 경로들은 더 이상 상위 경로와 연관되지 않게 된다.
예를 들어, path: ':bookTitle'을 path: '/:bookTitle'로 변경하면 이 경로는 도메인 루트에서 /:bookTitle을 가리키게 된다.
이는 중첩된 자식의 경로를 절대 경로로 가리키게 되기에 상위 루트를 건너뛰어 에러가 발생한다.
```

<img src='https://velog.velcdn.com/images/sarang_daddy/post/e90d963a-4922-45bf-9bb9-2cc5f5d7f154/image.png' width="70%">

> 중첩된 자식의 경로를 절대경로로 표현하려면 모든 루트를 적어주어야 한다.  
> `/author/:authorName/:bookTitle`

## useOutletContext

- outlet이 제공해주는 Context
- 자식 Outlet(컴포넌드들)에게 데이터를 전달할 수 있다.

```tsx
// Outlet의 부모 컴포넌트
import { Link, Outlet, useParams } from 'react-router-dom';
import { authors } from '@/db';
import { useState } from 'react';

interface BookType {
  key: number;
  title: string;
  contents: { type: string; items: string[] }[];
}

export const Author = () => {
  const { authorName } = useParams();
  const author = authors.find((author) => author.name === authorName);
  const books = author?.books;

  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  return (
    <>
      <h1>{authorName}</h1>
      <hr />
      <ul>
        {books?.map((book) => (
          <li key={book.key}>
            <Link to={book.title} onClick={() => setSelectedBook(book)}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
      // 자식 Outlet에게 데이터를 context로 전달할 수 있다.
      <Outlet context={{ book: selectedBook }} />
    </>
  );
};
```

- 자식 경로(컴포넌트)에서는 useParams등으로 url의 값을 사용하지 않고 부모로 부터 데이터를 전달 받아 사용할 수 있다.

```tsx
import { useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface BookType {
  key: number;
  title: string;
  contents: { type: string; items: string[] }[];
}

interface BookContext {
  book: BookType;
}

interface ContentsType {
  type: string;
  items: string[];
}

export const Book = () => {
  // 부모 경로로 부터 전달받은 Context 데이어틑 사용할 수 있다.
  const book = useOutletContext<BookContext>();
  const contents = book?.book?.contents;
  const [selectedType, setSelectedType] = useState<ContentsType | null>(null);

  return (
    <>
      <h2>{book?.book?.title}</h2>
      <hr />
      <ul>
        {contents?.map((content, index) => (
          <li key={index}>
            <Link to={content.type} onClick={() => setSelectedType(content)}>
              {content.type}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet context={{ type: selectedType }} />
    </>
  );
};
```
