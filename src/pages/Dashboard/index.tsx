import React from 'react';

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={singOut} type="button">
        Deslogar
      </button>
    </>
  );
};

export default Dashboard;
