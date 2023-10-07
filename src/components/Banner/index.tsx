import { IMovie } from '@/types';
import * as S from './styles';
import { makeImagePath } from '@/Utils';

interface BannerProps {
  moviesList?: IMovie[];
}

const Banner = ({ moviesList = [] }: BannerProps) => {
  return (
    <S.Banner $bgPhoto={makeImagePath(moviesList[0].backdrop_path || '')}>
      <S.Title>{moviesList[0].title}</S.Title>
      <S.Overview>{moviesList[0].overview}</S.Overview>
    </S.Banner>
  );
};

export default Banner;
