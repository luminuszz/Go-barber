import { shade } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFielled: boolean;
}
export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;

  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 5px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: ${shade(0.3, '#ff9000')};
      border-color: ${shade(0.3, '#ff9000')};
    `}
  ${props =>
    props.isFielled &&
    css`
      color: ${shade(0.3, '#ff9000')};
    `}



  input {
    background: transparent;

    flex: 1;
    border: 0;
    color: #f4ede8;

    &&::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
