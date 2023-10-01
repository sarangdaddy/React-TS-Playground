import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  padding: 30px 0;
  background: linear-gradient(135deg, #e09, #d0e);
`;

export const Title = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: 800;
`;

export const TimeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 600;
  gap: 8px;

  span {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const boxVariants = {
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  width: 100px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e700b9;
  box-shadow:
    0 2px 3px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.06);
`;

export const BtnContainer = styled.div`
  color: white;
`;

export const btnVariants = {
  initial: {},
  hover: {
    scale: 1.1,
    transition: { duration: 0.4 },
  },
  tap: {
    scale: 0.9,
    transition: { duration: 0.4 },
  },
};

export const BtnSvg = styled(motion.svg)`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

export const InfoBox = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  gap: 48px;
  display: flex;

  :first-child,
  :last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
