import * as yup from 'yup';

export default (t, channelNames = []) => {
  const commonStringSchema = yup.string()
    .min(3, t('validationErrors.incorrectLength'))
    .max(20, t('validationErrors.incorrectLength'));

  // const requiredStringSchema = commonStringSchema.required(t('validationErrors.requiredFields'));
  const requiredStringSchema = commonStringSchema.required(t('validationErrors.incorrectLength'));

  const channelNameSchema = yup.object({
    nameInput: requiredStringSchema
      .notOneOf(channelNames, t('validationErrors.incorrectRenameChannel')),
  });

  const signupSchema = yup.object({
    username: yup.lazy((value) => {
      if (value && value.length > 0) {
        return requiredStringSchema;
      }
      return commonStringSchema;
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
        return requiredStringSchema
          .oneOf([yup.ref('password'), null], t('validationErrors.notConfirmPassword'));
      }
      return commonStringSchema
        .oneOf([yup.ref('password'), null], t('validationErrors.notConfirmPassword'));
    }),
  });

  return { channelNameSchema, signupSchema };
};
