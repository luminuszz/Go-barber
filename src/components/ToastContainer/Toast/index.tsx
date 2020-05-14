import React, { useEffect } from 'react';
import { FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/ToastContext';
import { Coitainer } from './styles';

interface ToastsProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiXCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastsProps> = ({ message, style }) => {
  const { removeToast } = useToast();
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Coitainer
      type={message.type}
      hasdescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <button onClick={() => removeToast(message.id)} type="button">
          <FiXCircle size={18} />
        </button>
      </div>
    </Coitainer>
  );
};

export default Toast;
