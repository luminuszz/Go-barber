import * as Yup from 'yup';

export const signUpUserValidate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: Yup.string().min(6, 'No minímo 6 digitos'),
});

export const signInUserValidate = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: Yup.string().required('Senha obrigatório'),
});

export type RequestSignDTO = Yup.InferType<typeof signInUserValidate>;

export const yuInstance = Yup.ValidationError;
