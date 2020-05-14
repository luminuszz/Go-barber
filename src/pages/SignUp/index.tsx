import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  signUpUserValidate,
  RequestSignUpDTO,
  yuInstance,
} from '../../validators/users/userSignUpValidate';
import { Container, Content, Background } from './styles';

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const HandleSubmit: SubmitHandler<RequestSignUpDTO> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});
        await signUpUserValidate.validate(data, { abortEarly: false });
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }
        // toasts
      }
    },
    [],
  );
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
