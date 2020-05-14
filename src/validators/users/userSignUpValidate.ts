import * as Yup from 'yup';

export const signUpUserValidate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: Yup.string().min(6, 'No minímo 6 digitos'),
});

export type RequestSignUpDTO = Yup.InferType<typeof signUpUserValidate>;

export const yuInstance = Yup.ValidationError;
