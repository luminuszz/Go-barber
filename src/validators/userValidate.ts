import * as Yup from 'yup';

export const signupUserValidate = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
  password: Yup.string().min(6, 'No minímo 6 digitos'),
});
