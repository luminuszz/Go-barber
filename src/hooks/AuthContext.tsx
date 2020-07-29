import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/apiClient';

interface User {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SingInRequestDTO {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  singIn(credentials: SingInRequestDTO): Promise<void>;
  singOut(): void;
  updateUser(updateData: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const singIn = useCallback(async ({ email, password }: SingInRequestDTO) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);
  const singOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');
    setData({} as AuthState);
  }, []);
  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, singIn, singOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { useAuth, AuthProvider };
