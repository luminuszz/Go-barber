import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  signInUserValidate,
  yuInstance,
  RequestSignDTO,
} from '../../validators/users/userSignInValidate';
import { Container, Content, Background, AnimationContainer } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();
  const { addToast } = useToast();
  const [isload, setIsLoad] = useState(false);

  const handleSubmit: SubmitHandler<RequestSignDTO> = useCallback(
    async data => {
      try {
        setIsLoad(true);
        formRef.current?.setErrors({});
        await signInUserValidate.validate(data, { abortEarly: false });
        const { email, password } = data;
        await singIn({ email, password });

        addToast({
          type: 'success',
          title: 'Usuário logado com sucesso',
        });
        setIsLoad(false);
      } catch (err) {
        setIsLoad(false);
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credências',
        });
      }
    },
    [singIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
            <Button type="submit">
              <Spinner visibility={Number(!!isload)} text="Entrar" />
            </Button>
            <Link to="/forgotpassword">Esqueci minha senha</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
