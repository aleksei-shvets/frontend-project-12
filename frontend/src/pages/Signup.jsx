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
import FormBox from '../containers/FormBox.jsx';

const chatImg = require('../assets/images/chat.gif');

const Signup = () => {
  const { t } = useTranslation();
  const authHook = useAuth();
  const navigate = useNavigate();
  const [regError, setRegError] = useState(null);
  const inputNameRef = useRef();
  const { signupSchema } = getShema(t);
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (regError && inputNameRef.current) {
      inputNameRef.current.select();
      setRegError(t('fetchErrors.incorrectSignup'));
    } else {
      setRegError(null);
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
        const { data } = await axios.post(fetchRoutes.signupPath(), newUser);
        authHook.logIn(data);
        navigate(ROUTES.home);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          setRegError(t('fetchErrors.incorrectSignup'));
        }
        if (err.isAxiosError && err.response.status !== 409) {
          setRegError(t('fetchErrors.connectionError'));
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
    <FormBox>
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
                labelText={t('placeholders.username')}
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
                touchedMarker={formik.touched.password}
                labelText={t('placeholders.password')}
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
                labelText={t('placeholders.confirmPassword')}
                touchedMarker={formik.touched.confirmPassword}
              />
              <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.registrationBtn')}</Button>
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </FormBox>
  );
};

export default Signup;
