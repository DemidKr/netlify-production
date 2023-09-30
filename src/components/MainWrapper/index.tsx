import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import { Header } from '../Header';

interface IProps {
  children: ReactNode;
}

export const MainWrapper = ({ children }: IProps) => {
  return (
    <Box width="100%" height="100vh">
      <Header />

      <Box width="100%" height="max-content">
        <Box zIndex="1" position="sticky">
          {children}
        </Box>
      </Box>

      <Box
        position="absolute"
        width="100%"
        height="calc(100% - 72px)"
        top="64px"
        left="0"
        zIndex="0"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="100%"
          height="100%"
        >
          <rect
            y="10"
            x="20"
            opacity="0.20"
            width="100%"
            height="100%"
            fill="url(#pattern0)"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="0.035"
              height="0.05"
            >
              <use
                xlinkHref="#image0_2101_7496"
                transform="scale(0.000694444 0.00195312)"
              />
            </pattern>
            <image
              id="image0_2101_7496"
              width="20"
              height="20"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAADpJREFUOE9jlDBL+c/AwMDw/ORsEEUxYKS6gf///we7kFqAcdRAioNyNAwpDkKG0TAcDUMyQmDwJxsAKo5PxSZtxAsAAAAASUVORK5CYII="
            />
          </defs>
        </svg>
      </Box>
    </Box>
  );
};
