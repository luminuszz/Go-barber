import styled, { keyframes } from 'styled-components';

// eslint-disable-next-line import/no-unresolved
import { Props } from '.';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<Props>`
  border: 2px solid rgba(0, 0, 0, 0);
  border-left-color: ${props => props.color || '#ffff'};
  border-radius: 50%;

  height: ${props => props.heigth || 30}px;
  width: ${props => props.width || 30}px;

  margin: auto;

  animation: ${rotate} ${props => props.duration || 1}s linear infinite;

  display: ${props => (props.visibility ? 'block' : 'none')};
`;
/*

*/
