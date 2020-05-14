import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/apiClient';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  signUpUserValidate,
  RequestSignUpDTO,
  yuInstance,
} from '../../validators/users/userSignUpValidate';
import { Container, Content, Background, AnimationContainer } from './styles';

export const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const HandleSubmit: SubmitHandler<RequestSignUpDTO> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});
        await signUpUserValidate.validate(data, { abortEarly: false });

        await api.post<RequestSignUpDTO>('users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description: 'Por favor logue na aplicação',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na requisição',
          description: 'Verifique suas credências e tente novamente',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
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
          <Link to="/">
            <FiArrowLeft />
            Voltar para o logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
