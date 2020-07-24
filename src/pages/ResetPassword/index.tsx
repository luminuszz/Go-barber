/* eslint-disable @typescript-eslint/camelcase */
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useToast } from '../../hooks/ToastContext';
import useQuery from '../../hooks/useQuery';
import api from '../../services/apiClient';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  RequestResetPasswordDTO,
  resetPasswordUserValidate,
  yuInstance,
} from '../../validators/users/userResetPassword';
import { Container, Content, Background, AnimationContainer } from './styles';

type IRequestDTO = RequestResetPasswordDTO & {
  token: string;
};

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const [isload, setIsLoad] = useState(false);
  const query = useQuery();

  const HandleSubmit: SubmitHandler<RequestResetPasswordDTO> = useCallback(
    async data => {
      try {
        setIsLoad(true);
        formRef.current?.setErrors({});

        await resetPasswordUserValidate.validate(data, { abortEarly: false });

        const token = query.get('token');

        const { password, password_confirmation } = data;

        await api.post<IRequestDTO>('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Cadastro de nova senha feita com sucesso',
          description: 'Por favor logue na aplicação',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro na requisição',
            description: 'Verifique suas credências e tente novamente',
          });
        }

        addToast({
          type: 'error',
          title: 'Erro na requisição',
          description: 'Erro ao mudar a senha',
        });
      } finally {
        setIsLoad(false);
      }
    },
    [addToast, history, query],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Resetar Senha</h1>
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmar Senha"
            />
            <Button type="submit">
              <Spinner visibility={Number(!!isload)} text="Resetar" />
            </Button>
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

export default ResetPassword;
