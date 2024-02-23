import * as yup from 'yup';

export default (t, channelNames = []) => {
  const channelNameSchema = yup.object({
    nameInput: yup
      .string()
      .required(t('validationErrors.requiredFields'))
      .min(3, t('validationErrors.incorrectLength'))
      .max(20, t('validationErrors.incorrectLength'))
      .notOneOf(channelNames, t('validationErrors.incorrectRenameChannel')),
  });

  const signupSchema = yup.object({
    username: yup
      .string()
      .min(3, t('validationErrors.incorrectLength'))
      .max(20, t('validationErrors.incorrectLength'))
      .required(t('validationErrors.requiredFields')),
    password: yup
      .string()
      .min(6, t('validationErrors.minPasswordLength'))
      .required(t('validationErrors.requiredFields')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validationErrors.notConfirmPassword'))
      .required(t('validationErrors.requiredFields')),
  });

  const loginSchema = yup.object({
    username: yup
      .string()
      .min(3, t('validationErrors.incorrectLength'))
      .max(20, t('validationErrors.incorrectLength'))
      .required(t('validationErrors.requiredFields')),
    password: yup
      .string()
      .min(6, t('validationErrors.minPasswordLength'))
      .required(t('validationErrors.requiredFields')),
  });

  return { channelNameSchema, signupSchema, loginSchema };
};
