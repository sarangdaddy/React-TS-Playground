import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Slider = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  position: relative;
  top: -80px;
`;

export const rowVariants = {
  hidden: (direction: boolean) => ({
    x: direction ? window.innerWidth : -window.innerWidth,
  }),
  visible: { x: 0 },
  exit: (direction: boolean) => ({
    x: direction ? -window.innerWidth : window.innerWidth,
  }),
};

export const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  margin: 0 50px;
`;

export const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: 'tween',
    },
  },
};

export const Box = styled(motion.div)<{ $leaving: boolean }>`
  height: 200px;
  cursor: pointer;
  pointer-events: ${(props) => (props.$leaving ? 'none' : 'auto')};

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.1,
      type: 'tween',
    },
  },
};

export const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;

  h4 {
    text-align: center;
    font-size: 13px;
    font-weight: 400;
  }
`;

export const SliderControl = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 12px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  opacity: 0.7;
  transform: scale(1);
  cursor: pointer;
  transition:
    opacity 0.1s ease-in-out,
    transform 0.1s ease-in-out;

  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;
