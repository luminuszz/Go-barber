import React from 'react';

import { Container } from './styles';

export interface Props {
  width?: number;
  heigth?: number;
  color?: string;
  duration?: number;
  visibility?: number;
  text?: string;
}

const Spinner: React.FC<Props> = ({
  color,
  duration,
  heigth,
  width,
  visibility,
  text,
}) => {
  return visibility ? (
    <Container
      color={color}
      duration={duration}
      heigth={heigth}
      width={width}
      visibility={Number(!!visibility)}
    />
  ) : (
    <span>{text}</span>
  );
};

export default Spinner;
