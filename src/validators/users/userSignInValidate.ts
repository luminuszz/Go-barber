import * as Yup from 'yup';

export const signInUserValidate = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: Yup.string().required('Senha obrigatório'),
});

export type RequestSignDTO = Yup.InferType<typeof signInUserValidate>;

export const yuInstance = Yup.ValidationError;
