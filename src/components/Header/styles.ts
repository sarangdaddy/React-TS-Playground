import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const navVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

export const Navigation = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 20px 60px;
  color: white;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled(NavLink)`
  margin-right: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  opacity: 0.8;
  transition: 0.3s ease-in-out;

  &.active {
    opacity: 1;
    font-weight: 600;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.5;
  }
`;

export const Search = styled.span`
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    height: 25px;
  }
`;

export const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};

  &:focus {
    outline: none;
  }
`;

export const logoVariants = {
  normal: {
    scale: 1,
  },
  active: {
    scale: 1.2,
  },
};
