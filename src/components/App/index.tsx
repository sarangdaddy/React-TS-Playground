import * as S from './styled';

function App() {
  return (
    <S.Wrapper>
      <S.Title>Pomodoro</S.Title>
      <S.TimeBox>
        <S.Box>24</S.Box>
        <span>:</span>
        <S.Box>51</S.Box>
      </S.TimeBox>
      <S.PlayButton>
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
          />
        </svg>
      </S.PlayButton>
      <S.InfoBox>
        <div>
          <span>0/4</span>
          <span>ROUND</span>
        </div>
        <div>
          <span>0/12</span>
          <span>GOAL</span>
        </div>
      </S.InfoBox>
    </S.Wrapper>
  );
}

export default App;
