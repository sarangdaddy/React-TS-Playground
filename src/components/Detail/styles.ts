import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Modal = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  top: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

export const ModalCover = styled.div<{ $bgPhoto: string }>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  /* height: 400px; */
  z-index: 0;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.$bgPhoto});
`;

export const ModalInfoBox = styled.div`
  position: absolute;
  z-index: 1;
  top: 55%;
  display: flex;
  flex-direction: column;
  padding: 0 12px;
  gap: 8px;
`;

export const ModalTitle = styled.span`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  font-weight: 600;
`;

export const ModalAddInfos = styled.div`
  display: flex;
  gap: 8px;

  :last-child {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const ModalGenres = styled.span`
  color: ${(props) => props.theme.gray.middle};
  font-size: 16px;
  font-weight: 400;
`;

export const ModalDetail = styled.p`
  color: ${(props) => props.theme.white.darker};
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const ModalCloseBtn = styled.div`
  position: absolute;
  display: flex;
  justify-items: center;
  align-items: center;
  top: 10px;
  right: 20px;
  padding: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.black.lighter};
  cursor: pointer;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.black.darker};
  }

  svg {
    color: ${(props) => props.theme.white.darker};
  }
`;
