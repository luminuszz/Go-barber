import * as Yup from 'yup';

export const resetPasswordUserValidate = Yup.object().shape({
  password: Yup.string().min(6, 'No minímo 6 digitos'),
  // eslint-disable-next-line @typescript-eslint/camelcase
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'As senhas não conferem',
  ),
});

export type RequestResetPasswordDTO = Yup.InferType<
  typeof resetPasswordUserValidate
>;

export const yuInstance = Yup.ValidationError;
