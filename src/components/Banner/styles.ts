import styled from 'styled-components';

export const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 56px;
  margin-bottom: 16px;
`;

export const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;
