import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Card,
  InputGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import ROUTES from './route.js';
import fetchRoutes from '../fetchApi/route.js';
import getShema from '../validation/validation.js';

const chatImg = require('../assets/images/chat.gif');

const Signup = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  const navigate = useNavigate();
  const [regError, setRegErrorEl] = useState(null);
  const inputNameRef = useRef();
  const { signupSchema } = getShema(t);
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (regError && inputNameRef.current) {
      inputNameRef.current.select();
      setRegErrorEl(t('fetchErrors.incorrectSignup'));
    } else {
      setRegErrorEl(null);
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
        const response = await axios.post(fetchRoutes.signupPath(), newUser);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        authHook.logIn();
        navigate(ROUTES.home);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          setRegErrorEl(t('fetchErrors.incorrectSignup'));
        }
        if (err.isAxiosError && err.response.status !== 409) {
          setRegErrorEl(t('fetchErrors.connectionError'));
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
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 ">
                  <h1 className="text-center mb-2">{t('formHeaders.registration')}</h1>
                  <fieldset>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="username" />
                      <InputGroup hasValidation>
                        <Form.Control
                          className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
                          placeholder={t('placeholders.username')}
                          autoComplete="username"
                          id="username"
                          name="username"
                          type="text"
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched('username', true);
                          }}
                          value={formik.values.username}
                          isInvalid={formik.touched.username && formik.errors.username}
                          ref={inputNameRef}
                        />
                        {formik.touched.username && formik.errors.username && (
                          <Form.Control.Feedback tooltip type="invalid">
                            {formik.errors.username}
                          </Form.Control.Feedback>
                        )}
                        {regErrorEl(regError)}
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="password" />
                      <InputGroup hasValidation>
                        <Form.Control
                          className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                          placeholder={t('placeholders.password')}
                          id="password"
                          name="password"
                          type="password"
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched('password', true);
                          }}
                          value={formik.values.password}
                          isInvalid={formik.touched.password && formik.errors.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                          <Form.Control.Feedback tooltip type="invalid">
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="confirmPassword" />
                      <InputGroup hasValidation>
                        <Form.Control
                          className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}
                          placeholder={t('placeholders.confirmPassword')}
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched('confirmPassword', true);
                          }}
                          value={formik.values.confirmPassword}
                          isInvalid={formik.touched.confirmPassword
                            && formik.errors.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                          <Form.Control.Feedback tooltip type="invalid">
                            {formik.errors.confirmPassword}
                          </Form.Control.Feedback>
                        )}
                      </InputGroup>
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
