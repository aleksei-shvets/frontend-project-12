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
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsNotAuth(false);
      try {
        formik.setSubmitting(true);
        const response = await axios.post(fetchRoutes.loginPath(), values);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        authHook.logIn();
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
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="p-5 row">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Card.Img width={200} src={chatImg} />
                </div>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 ">
                  <h1 className="text-center mb-2">{t('formHeaders.login')}</h1>
                  <fieldset>
                    <Form.Group className="mb-4">
                      <Form.Label htmlFor="username" />
                      <Form.Control
                        required
                        placeholder={t('placeholders.nickname')}
                        autoComplete="username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={formik.errors.username}
                        ref={inputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label htmlFor="password" />
                      <Form.Control
                        required
                        autoComplete="current-password"
                        placeholder={t('placeholders.password')}
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                      {loginErrorEl(isNotAuth)}
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.loginBtn')}</Button>
                  </fieldset>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('questions.registrationQuestion')}</span>
                  <a href="/signup">{t('buttons.regLink')}</a>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
