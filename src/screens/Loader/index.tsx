import * as S from './styles';

interface LoaderProps {
  viewHeight?: string;
}

const Loader = ({ viewHeight = '100vh' }: LoaderProps) => {
  return (
    <S.Container $heightOption={viewHeight}>
      <S.Donut
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: 360,
          transition: { duration: 0.5, repeat: Infinity },
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#E50F12"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#636e72"
          strokeWidth="10"
          strokeDasharray="70 207"
          strokeDashoffset="0"
        />
      </S.Donut>
    </S.Container>
  );
};

export default Loader;
