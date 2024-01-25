import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap'
import axios from 'axios';
//import * as yup from "yup";
import { useFormik } from 'formik';
import useAuth from '../hooks/index.js';
import pageRoutes from './route.jsx'
import apiRoutes from '../api/route.js'

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
  const authHook = useAuth();
  const navigate = useNavigate();
  const [isNotAuth, setIsNotAuth] = useState(false);
  const inputRef = useRef()
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
        const response = await axios.post(apiRoutes.loginPath(), values);
        console.log(response);
        localStorage.setItem('userToken', JSON.stringify(response.data));
        authHook.logIn();
        navigate(pageRoutes.home);
      } catch (err) {
        formik.setSubmitting(false);
        console.log(err.isAxiosError && err.response.status === 401)
        if (err.isAxiosError && err.response.status === 401) {
          setIsNotAuth(true);
          return;
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
                  <h1 className="text-center mb-2">Войти</h1>
                  <fieldset>
                    <Form.Group className='mb-4'>
                      <Form.Label htmlFor="username"></Form.Label>
                      <Form.Control
                        placeholder='Ваш ник'
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
                    <Form.Group className='mb-4'>
                      <Form.Label htmlFor="password"></Form.Label>
                      <Form.Control
                        required
                        autoComplete="current-password"
                        placeholder='Пароль'
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={isNotAuth}
                      />
                      <Form.Control.Feedback className="text-center" type="invalid">the username or password is incorrect</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mt-4" variant="outline-secondary">Воити</Button>
                  </fieldset>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
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