import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  justify-items: center;
`;

export const ItemLink = styled(Link)`
  width: 300px;
  padding: 20px;
  display: flex;
  border-radius: 20px;
  flex-direction: column;
  align-items: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  cursor: pointer;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  &:hover {
    background-color: ${(props) => props.theme.lightBgColor};
    color: ${(props) => props.theme.lightTextColor};
  }
`;
