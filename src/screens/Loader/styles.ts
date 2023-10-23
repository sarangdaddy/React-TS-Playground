import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div<{ $heightOption: string }>`
  height: ${(prop) => prop.$heightOption};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Donut = styled(motion.svg)`
  width: 4rem;
  height: 4rem;
`;
