import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  return <h1>{keyword}</h1>;
};

export default Search;
