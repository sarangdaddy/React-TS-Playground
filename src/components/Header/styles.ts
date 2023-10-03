import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
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
  transition: 0.3s ease-in-out;

  &.active {
    opacity: 0.7;
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const Search = styled.span`
  color: white;

  svg {
    height: 25px;
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
