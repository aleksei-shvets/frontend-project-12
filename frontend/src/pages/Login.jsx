import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
// import * as yup from "yup";
import { useFormik } from 'formik';
// import { useDispatch } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import pageRoutes from './route.jsx';
import apiRoutes from '../fetchApi/route.js';
// import { setUser } from '../store/slices/userSlice.js';

/* const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
}); */
const chatImg = require('../assets/images/chat.gif');

const Login = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNotAuth, setIsNotAuth] = useState(false);
  const inputRef = useRef();
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
        const response = await axios.post(apiRoutes.loginPath(), values);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        authHook.logIn();
        navigate(pageRoutes.home);
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
                        placeholder={t('placeholders.nickname')}
                        required
                        autoComplete="username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={isNotAuth}
                        ref={inputRef}
                      />
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
                        isInvalid={isNotAuth}
                      />
                      <Form.Control.Feedback className="text-center" type="invalid">{t('fetchErrors.incorrectLogin')}</Form.Control.Feedback>
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
