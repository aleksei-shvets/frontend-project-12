import React from "react";
//import * as yup from "yup";
import { Formik, Form, Field } from 'formik';

/* const shema = yup.object({
  name: yup.string().required(),
  password: yup.string().min(6).max(15),
}); */


const Login = () => {
  return (
    <>
      <div className="App-form">
        <Formik>
          <Form>
            <Field type="name" name="name"></Field>
            <Field type="password" name="password"></Field>
          </Form>
        </Formik>
      </div>
    </>
  )
};

export default Login;