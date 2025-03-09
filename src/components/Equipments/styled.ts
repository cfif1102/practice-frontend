import { COLORS, STYLES } from '@constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const TableLoadingDiv = styled.div`
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
`;

export const THead = styled.thead`
  background-color: ${COLORS.secondary};

  & th {
    color: white;
    font-family: ${STYLES.defaultFont};
    padding: 10px 20px;
    text-align: center;

    &:hover {
      cursor: pointer;
      color: ${darken(0.3, 'white')};
    }
  }
`;

export const TBody = styled.thead`
  background-color: ${COLORS.lighter};

  & td {
    color: white;
    font-family: ${STYLES.defaultFont};
    padding: 10px 20px;
    text-align: center;
  }

  & tr {
    &:hover {
      cursor: pointer;
      background-color: ${darken(0.2, COLORS.lighter)};
    }

    &:not(:last-child) {
      border-bottom: 1px solid white;
    }
  }
`;

export const PaginationDiv = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${COLORS.secondary};
  padding: 10px 30px;
  border-radius: 5px;
  margin-bottom: 15px;
  justify-content: space-between;
  align-items: center;
`;

export const PageNumber = styled.div`
  color: white;
  font-weight: bold;
  font-family: ${STYLES.defaultFont};
  margin: 0px 15px;
`;

export const LoadBtn = styled.button`
  background-color: ${COLORS.primary};
  width: 70px;
  height: 35px;
  color: white;
  font-family: ${STYLES.defaultFont};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${lighten(0.13, COLORS.primary)};
  }
`;

export const ItemHeader = styled.div`
  color: white;
  font-family: ${STYLES.defaultFont};
  font-size: 20px;
  font-weight: bold;
`;

export const NavDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconBtn = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: white;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &:hover {
    cursor: pointer;
    color: ${darken(0.3, 'white')};
  }
`;
