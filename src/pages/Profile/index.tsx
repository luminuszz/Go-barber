/* eslint-disable @typescript-eslint/camelcase */
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useCallback, useState, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/apiClient';
import getValidationsErrors from '../../utils/getValidationsErrors';
import {
  RequestUpdateProfileValidate,
  userUpdateProfileValidate,
  yuInstance,
} from '../../validators/users/userUpdateProfileValidate';
import { Container, Content, AvatarInput } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isload, setIsLoad] = useState(false);
  const { user, updateUser } = useAuth();

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<RequestUpdateProfileValidate> = useCallback(
    async data => {
      try {
        setIsLoad(true);
        formRef.current?.setErrors({});
        await userUpdateProfileValidate.validate(data, { abortEarly: false });

        const {
          email,
          name,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado',
          description: 'Suas informações foram salvas com sucesso',
        });
        history.push('/dashboard');
      } catch (err) {
        if (err instanceof yuInstance) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização',
          description: 'Ocorreu um erro ao fazer a mudança',
        });
      } finally {
        setIsLoad(false);
      }
    },
    [addToast],
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Avatar atualizado !',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatarInput">
              <FiCamera />
              <input
                type="file"
                id="avatarInput"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            name="old_password"
            type="password"
            placeholder="Senha atual"
          />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="nova senha"
          />

          <Input
            icon={FiLock}
            name="password_confirmation"
            type="password"
            placeholder="Confirmar nova Senha"
          />
          <Button type="submit">
            <Spinner visibility={Number(!!isload)} text="Confirmar mudanças" />
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
