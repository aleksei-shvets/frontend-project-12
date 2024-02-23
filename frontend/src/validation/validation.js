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
    username: yup.lazy((value) => {
      if (value && value.length > 0) {
        return yup.string().required(t('validationErrors.requiredFields'))
          .min(3, t('validationErrors.incorrectLength'))
          .max(20, t('validationErrors.incorrectLength'));
      }
      return yup.string()
        .min(3, t('validationErrors.incorrectLength'))
        .max(20, t('validationErrors.incorrectLength'));
    }),
    password: yup.lazy((value) => {
      if (value && value.length > 0) {
        return yup.string().required(t('validationErrors.requiredFields'))
          .min(6, t('validationErrors.minPasswordLength'));
      }
      return yup.string()
        .min(6, t('validationErrors.minPasswordLength'));
    }),
    confirmPassword: yup.lazy((value) => {
      if (value && value.length > 0) {
        return yup.string().required(t('validationErrors.requiredFields'))
          .oneOf([yup.ref('password'), null], t('validationErrors.notConfirmPassword'));
      }
      return yup.string()
        .oneOf([yup.ref('password'), null], t('validationErrors.notConfirmPassword'));
    }),
  });

  return { channelNameSchema, signupSchema };
};
