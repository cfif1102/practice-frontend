import { COLORS, STYLES } from '@constants';
import styled, { css } from 'styled-components';

interface ChartProps {
  width?: string;
  paddingBottom?: string;
}

export const ChartDiv = styled.div<ChartProps>`
  ${({ width = '100%', paddingBottom = '50px' }) => css`
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 12px 4px rgba(0, 0, 0, 0.2);
    height: 400px;
    width: ${width};
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: ${paddingBottom};
    padding-top: 30px;
  `}
`;

export const ChartHeader = styled.div`
  color: ${COLORS.primary};
  font-family: ${STYLES.defaultFont};
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;
