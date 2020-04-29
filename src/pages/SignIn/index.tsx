import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/AuthContext';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { signInUserValidate, yuInstance } from '../../validators/userValidate';
import { Container, Content, Background } from './styles';

interface LoginData {
  email: string;
  password: string;
}
export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn, user } = useAuth();

  const handleSubmit: SubmitHandler<LoginData> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});
        await signInUserValidate.validate(data, { abortEarly: false });
        const { email, password } = data;
        singIn({ email, password });
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }
        // toasts
      }
    },
    [singIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit"> Entrar</Button>
          <a href="/">Esqueci minha senha</a>
        </Form>
        <a href="/">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};
