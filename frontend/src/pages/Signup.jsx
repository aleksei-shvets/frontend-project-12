/* eslint-disable consistent-return */
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import { ROUTES } from '../routes.js';
import getShema from '../validation/validation.js';
import FormBox from '../containers/FormBox.jsx';
import { channelSelectors } from '../store/slices/selectors.js';
import { signupThunk } from '../store/slices/channelsSlice.js';

const chatImg = require('../assets/images/chat.gif');

const Signup = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authHook = useAuth();
  const navigate = useNavigate();
  const { signupSchema } = getShema(t);

  const fetchErrors = useSelector(channelSelectors.getChannelErrors);

  const signupErrorEl = (err) => {
    if (err && err === 'incorrectSignup') {
      return (
        <div className="sm text-danger">
          {t('fetchErrors.incorrectSignup')}
        </div>
      );
    }
    if (err && err === 'networkErr') {
      return (
        <div className="sm text-danger">
          {t('fetchErrors.connectionError')}
        </div>
      );
    }
    return null;
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const newUser = { username: values.username, password: values.password };
        const data = await dispatch(signupThunk(newUser));
        authHook.logIn(data.payload);
        navigate(ROUTES.home);
      } catch (err) {
        return err;
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <FormBox>
      <Card className="shadow-sm">
        <Card.Body className="p-5 row">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <Card.Img width={200} src={chatImg} />
          </div>
          <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 ">
            <h1 className="text-center mb-2">{t('formHeaders.registration')}</h1>
            <fieldset>
              <Form.Floating>
                <Form.Control
                  className="mb-4"
                  autoComplete="username"
                  type="text"
                  id="username"
                  name="username"
                  placeholder={t('placeholders.username')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.username}
                  value={formik.values.username}
                />
                <Form.Label htmlFor="username">{t('placeholders.username')}</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  className="mb-4"
                  autoComplete="password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.password}
                  value={formik.values.password}
                  placeholder={t('placeholders.password')}
                />
                <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating>
                <Form.Control
                  className="mb-4"
                  autoComplete="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.confirmPassword}
                  value={formik.values.confirmPassword}
                  placeholder="{t('placeholders.confirmPassword')}"
                />
                <Form.Label htmlFor="confirmPassword">{t('placeholders.confirmPassword')}</Form.Label>
                <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
              </Form.Floating>
              {fetchErrors ? signupErrorEl(fetchErrors) : null}
              <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.registrationBtn')}</Button>
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </FormBox>
  );
};

export default Signup;
