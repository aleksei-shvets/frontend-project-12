import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card, FloatingLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import ROUTES from './route.js';
import fetchRoutes from '../fetchApi/route.js';
import getShema from '../validation/validation.js';
// import InputComponent from '../components/InputComponent.jsx';
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
        console.log(data);
        authHook.logIn(data);
        navigate(ROUTES.home);
      } catch (err) {
        if (err.response.status === 409) {
          setRegError(t('fetchErrors.incorrectSignup'));
        }
      } finally {
        formik.setSubmitting(false);
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
            <Form.Floating>
              <Form.Label className="visually-hidden" htmlFor="username">{t('placeholders.username')}</Form.Label>
              <FloatingLabel label={t('placeholders.username')} htmlFor="username">
                <Form.Control
                  className="mb-4"
                  type="text"
                  id="username"
                  name="username"
                  placeholder={t('placeholders.username')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.username}
                  value={formik.values.username}
                  touchedMarker={formik.touched.username && formik.errors.username}
                  ref={inputNameRef}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Floating>
            {regErrorEl(regError)}
            <Form.Floating>
              <Form.Label className="visually-hidden" htmlFor="username">{t('placeholders.password')}</Form.Label>
              <FloatingLabel label={t('placeholders.password')} htmlFor="password">
                <Form.Control
                  className="mb-4"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.password}
                  value={formik.values.password}
                  touchedMarker={formik.touched.password && formik.errors.password}
                  placeholder={t('placeholders.password')}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Floating>
            <Form.Floating>
              <Form.Label className="visually-hidden" htmlFor="username">{t('placeholders.confirmPassword')}</Form.Label>
              <FloatingLabel label={t('placeholders.confirmPassword')} htmlFor="confirmPassword">
                <Form.Control
                  className="mb-4"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.errors.confirmPassword}
                  value={formik.values.confirmPassword}
                  placeholder={t('placeholders.confirmPassword')}
                  touchedMarker={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Floating>
            <Button type="submit" className="w-100 mt-4" variant="outline-secondary">{t('buttons.registrationBtn')}</Button>
          </Form>
        </Card.Body>
      </Card>
    </FormBox>
  );
};

export default Signup;
