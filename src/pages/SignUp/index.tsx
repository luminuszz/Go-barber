import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationsErrors from '../../utils/getValidationsErrors';
import { signupUserValidate } from '../../validators/userValidate';
import { Container, Content, Background } from './styles';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const HandleSubmit: SubmitHandler<UserRequest> = useCallback(async data => {
    try {
      await signupUserValidate.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationsErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={HandleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
          <a href="/">Esqueci minha senha</a>
        </Form>
        <a href="/">
          <FiArrowLeft />
          Voltar para o logon
        </a>
      </Content>
    </Container>
  );
};
