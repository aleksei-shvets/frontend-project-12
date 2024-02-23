import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import pageRoutes from './route.jsx';
import apiRoutes from '../fetchApi/route.js';
import getShema from '../validation/validation.js';

const chatImg = require('../assets/images/chat.gif');

const Signup = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  const navigate = useNavigate();
  const [regError, setregErrorEl] = useState(null);
  const inputNameRef = useRef();
  const { signupSchema } = getShema(t);
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (regError && inputNameRef.current) {
      inputNameRef.current.select();
      setregErrorEl(t('fetchErrors.incorrectSignup'));
    } else {
      setregErrorEl(null);
    }
  }, [regError]);

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
        const response = await axios.post(apiRoutes.signupPath(), newUser);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        authHook.logIn();
        navigate(pageRoutes.home);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          setregErrorEl('Пользователь уже существует');
        }
        if (err.isAxiosError && err.response.status !== 409) {
          console.log(err);
        }
      }
    },
  });

  const regErrorEl = (errMessage) => {
    if (errMessage) {
      return (
        <div className="sm text-danger">
          {t('errorMessages.incorrectSignup')}
        </div>
      );
    }
    return null;
  };

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
                <Form onSubmit={formik.handleSubmit} noValidate className="col-12 col-md-6 mt-3 ">
                  <h1 className="text-center mb-2">{t('formHeaders.registration')}</h1>
                  <fieldset>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="username" />
                      <Form.Control
                        placeholder={t('placeholders.username')}
                        required
                        autoComplete="username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={formik.errors.username}
                        ref={inputNameRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                      {regErrorEl(regError)}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password" />
                      <Form.Control
                        required
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
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="confirmPassword" />
                      <Form.Control
                        required
                        placeholder={t('placeholders.confirmPassword')}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isInvalid={formik.errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.registrationBtn')}</Button>
                  </fieldset>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
