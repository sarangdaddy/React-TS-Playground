import { RefObject, useEffect } from 'react';

interface IuseClickOutside {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

const useClickOutside = ({ ref, callback }: IuseClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
