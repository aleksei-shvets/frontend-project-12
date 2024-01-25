import React from "react";
import { Form, Button, Card, FloatingLabel } from 'react-bootstrap'

const notFoundImg = require('../../src/images/notfound.gif');

const NotFound = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="p-5 row">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Card.Img width={200} src={notFoundImg} />
                </div>
                <div className="col-12 col-md-6 mt-0 mb-0"> 
                  <h4 className="text-muted text-center mb-4">Страница не найдена</h4>
                  <p className="text-muted text-center mb-4">
                    Но вы можете перейти &nbsp;
                    <a href="/">на главную страницу</a>
                  </p>
                </div>
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

export default NotFound;
