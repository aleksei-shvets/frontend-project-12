import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form, Button, Card,
} from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../hooks/useAuth.js';
import pageRoutes from './route.jsx';
import apiRoutes from '../fetchApi/route.js';

const chatImg = require('../assets/images/chat.gif');

const Signup = () => {
  const authHook = useAuth();
  const navigate = useNavigate();
  const [regError, setregErrorEl] = useState(null);
  const inputNameRef = useRef();
  useEffect(() => {
    inputNameRef.current.focus();
  }, []);

  useEffect(() => {
    if (regError && inputNameRef.current) {
      inputNameRef.current.select();
      setregErrorEl('Пользователь уже существует');
      console.log(regError);
    } else {
      setregErrorEl(null);
    }
  }, [regError]);

  const schema = yup.object({
    username: yup
      .string('Enter your email')
      .min(3, 'Минимум 3')
      .max(20, 'Максимум 20')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтверждение пароля обязательно для заполнения'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const newUser = { username: values.username, password: values.password };
        const response = await axios.post(apiRoutes.signupPath(), newUser);
        localStorage.setItem('userToken', JSON.stringify(response.data.token));
        localStorage.setItem('username', JSON.stringify(response.data.username));
        authHook.logIn();
        authHook.setUser(); // TODO - скорее всего лишняя вызов, можно все делать в контексте
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
        <div className="invalid-feedback">
          Пользователь уже существует
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
                  <h1 className="text-center mb-2">Регистрация</h1>
                  <fieldset>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="username" />
                      <Form.Control
                        placeholder="Ваш ник"
                        required
                        autoComplete="username"
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={!formik.isValid}
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
                        placeholder="Пароль"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={!formik.isValid}
                      />
                      <Form.Control.Feedback className="text-center" type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="confirmPassword" />
                      <Form.Control
                        required
                        placeholder="Подтверждение пароля"
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        isInvalid={!formik.isValid}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4" variant="outline-secondary">Зарегистрироваться</Button>
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
