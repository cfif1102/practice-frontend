import { COLORS, STYLES } from '@constants';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const FormWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface FormProps {
  height?: string;
  width?: string;
}

export const FormStyled = styled.form<FormProps>`
  ${({ height = '350px', width = '500px' }) => css`
    display: flex;
    flex-direction: column;
    width: ${width};
    background-color: white;
    border-radius: 15px;
    padding: 0px 70px;
    height: ${height};
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px 4px rgba(0, 0, 0, 0.2);
  `}
`;

export const FormHeader = styled.div`
  font-family: ${STYLES.defaultFont};
  color: ${COLORS.primary};
  font-size: 30px;
  font-weight: bold;
`;

export const SignInBtn = styled.button`
  background-color: ${COLORS.secondary};
  border: 1px solid ${COLORS.secondary};
  color: white;
  font-family: ${STYLES.defaultFont};
  border-radius: 5px;
  width: 100%;
  height: 40px;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${lighten(0.065, COLORS.secondary)};
  }
`;

export const InputsDiv = styled.div`
  margin: 30px 0;
  width: 100%;
`;

export const OffsetWrapper = styled.div`
  margin-top: 20px;
`;

export const RegisterLink = styled(Link)`
  font-family: ${STYLES.defaultFont};
  text-decoration: none;
  color: ${COLORS.primary};
  margin-top: 6px;
  transition: color 0.5s ease;

  &:hover {
    color: ${lighten(0.3, COLORS.primary)};
  }
`;
