import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  padding-bottom: 130px;
`;

export const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

export const Slider = styled.div`
  position: relative;
  top: -112px;
  color: red;
  font-size: 55px;
  margin: 0 50px;
`;

export const rowVariants = {
  hidden: {
    x: window.innerWidth - 50,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth + 50,
  },
};

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

export const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center, center;
  height: 200px;
`;
