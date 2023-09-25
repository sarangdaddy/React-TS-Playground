import styled from 'styled-components';

export const Container = styled.div`
  width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;

export const BackBtn = styled.span`
  cursor: pointer;
`;

export const FilmsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

  span {
    padding: 8px;
    background-color: ${(props) => props.theme.lightBgColor};
    color: ${(props) => props.theme.lightTextColor};
    border-radius: 16px;
  }
`;
