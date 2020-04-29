import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}
const Tooltip: React.FC<TooltipProps> = ({ className, title, children }) => {
  const teste = 0;
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
