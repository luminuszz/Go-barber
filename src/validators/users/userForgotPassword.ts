import * as Yup from 'yup';

export const forgotPasswordUserValidate = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório').email('Email inválido'),
});

export type RequestForgotPasswordDTO = Yup.InferType<
  typeof forgotPasswordUserValidate
>;

export const yuInstance = Yup.ValidationError;
