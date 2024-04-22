import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import ROUTES from './route.js';
import fetchRoutes from '../fetchApi/route.js';
import FormBox from '../containers/FormBox.jsx';

const chatImg = require('../assets/images/chat.gif');

const Login = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  const navigate = useNavigate();
  const [isNotAuth, setIsNotAuth] = useState(false);
  const inputRef = useRef();

  const loginErrorEl = (errMessage) => {
    if (errMessage) {
      return (
        <div className="sm text-danger">
          {t('fetchErrors.incorrectLogin')}
        </div>
      );
    }
    return null;
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsNotAuth(false);
      try {
        formik.setSubmitting(true);
        const { data } = await axios.post(fetchRoutes.loginPath(), values);
        authHook.logIn(data);
        navigate(ROUTES.home);
        formik.setSubmitting(false);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setIsNotAuth(true);
        }
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
            <h1 className="text-center mb-2">{t('formHeaders.login')}</h1>
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
                isInvalid={formik.touched.username && formik.errors.username}
                value={formik.values.username}
              />
              <Form.Label htmlFor="username">{t('placeholders.nickname')}</Form.Label>
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
                isInvalid={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                placeholder={t('placeholders.password')}
              />
              <Form.Label htmlFor="password">{t('placeholders.password')}</Form.Label>
            </Form.Floating>
            {loginErrorEl(isNotAuth)}
            <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.loginBtn')}</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            <span>{t('questions.registrationQuestion')}</span>
            <a href="/signup">{t('buttons.regLink')}</a>
          </div>
        </Card.Footer>
      </Card>
    </FormBox>
  );
};

export default Login;
