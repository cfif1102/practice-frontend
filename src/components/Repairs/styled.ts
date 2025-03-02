import { STYLES } from '@constants';
import { darken } from 'polished';
import styled from 'styled-components';

export const LinkAct = styled.a`
  color: white;
  font-family: ${STYLES.defaultFont};
  text-decoration: none;
  transition: all 0.5s ease;

  &:hover {
    color: ${darken(0.3, 'white')};
  }
`;
