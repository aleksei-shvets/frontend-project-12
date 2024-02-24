import { useEffect, useRef, useState } from 'react';
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
import getShema from '../validation/validation.js';
import InputComponent from '../components/InputComponent.jsx';

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
          {errMessage}
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
                    <InputComponent
                      blurHandler={() => formik.setFieldTouched('username', true)}
                      inputClasses={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
                      fieldName="username"
                      type="text"
                      changeHandler={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched('username', true);
                      }}
                      fieldValue={formik.values.username}
                      isInvalidMessage={formik.errors.username}
                      placeholderText={t('placeholders.nickname')}
                      touchedMarker={formik.touched.username}
                      ref={inputNameRef}
                    />
                    {regErrorEl(regError)}
                    <InputComponent
                      blurHandler={() => formik.setFieldTouched('password', true)}
                      inputClasses={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                      fieldName="password"
                      type="password"
                      changeHandler={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched('password', true);
                      }}
                      fieldValue={formik.values.password}
                      isInvalidMessage={formik.errors.password}
                      placeholderText={t('placeholders.password')}
                      touchedMarker={formik.touched.password}
                    />
                    <InputComponent
                      blurHandler={() => formik.setFieldTouched('confirmPassword', true)}
                      inputClasses={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}
                      fieldName="confirmPassword"
                      type="password"
                      changeHandler={(e) => {
                        formik.handleChange(e);
                        formik.setFieldTouched('confirmPassword', true);
                      }}
                      fieldValue={formik.values.confirmPassword}
                      isInvalidMessage={formik.errors.confirmPassword}
                      placeholderText={t('placeholders.confirmPassword')}
                      touchedMarker={formik.touched.confirmPassword}
                    />
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
