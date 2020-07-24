import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/apiClient';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  yuInstance,
  forgotPasswordUserValidate,
  RequestForgotPasswordDTO,
} from '../../validators/users/userForgotPassword';
import { Container, Content, Background, AnimationContainer } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [isload, setIsLoad] = useState(false);

  const handleSubmit: SubmitHandler<RequestForgotPasswordDTO> = useCallback(
    async data => {
      try {
        formRef.current?.setErrors({});

        await forgotPasswordUserValidate.validate(data, { abortEarly: false });

        await api.post('/password/forgot', data);

        addToast({
          type: 'success',
          title: 'Recuperação de senha enviada',
          description: 'Por favor verifique o seu email',
        });
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer a recuperação de senha',
        });
      }
    },

    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperação de senha</h1>
            <Input icon={FiMail} name="email" placeholder="E-mail" />

            <Button type="submit">
              <Spinner visibility={isload} text="Recuperar" />
            </Button>
          </Form>
          <Link to="/">
            <FiLogIn />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
