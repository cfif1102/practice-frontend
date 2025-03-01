import { COLORS, STYLES } from '@constants';
import styled, { css } from 'styled-components';

export const StatsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

interface StatGroupProps {
  margin?: string;
}

export const StatsGroup = styled.div<StatGroupProps>`
  ${({ margin = '10px' }) => css`
    display: flex;
    flex-direction: row;
    margin-top: ${margin};
    width: 100%;
  `}
`;

export const StatOffset = styled.div`
  margin-left: 10px;
  width: 100%;
`;

export const StatGroupHeader = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  color: ${COLORS.primary};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: ${STYLES.defaultFont};

  &:not(:first-child) {
    margin-top: 10px;
  }
`;
