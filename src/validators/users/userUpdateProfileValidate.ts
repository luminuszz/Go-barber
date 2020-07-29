/* eslint-disable @typescript-eslint/camelcase */
import * as Yup from 'yup';

export const userUpdateProfileValidate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  old_password: Yup.string(),
  password: Yup.string().when('old_password', {
    is: val => !!val.length,
    then: Yup.string().required('campo obrigatorio'),
    otherwise: Yup.string(),
  }),
  password_confirmation: Yup.string()
    .when('old_password', {
      is: val => !!val.length,
      then: Yup.string().required('campo obrigatorio'),
      otherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
});

export type RequestUpdateProfileValidate = Yup.InferType<
  typeof userUpdateProfileValidate
>;

export const yuInstance = Yup.ValidationError;
