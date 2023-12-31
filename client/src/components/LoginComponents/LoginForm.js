import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import FormSection from "../UI/Form/FormSection";
import Card from "../UI/Card/Card";
import "./LoginForm.css";

function LoginForm({ logo, onSignUpClicked, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupClickHandler = () => onSignUpClicked();
  const loginClickHandler = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };
  const changeEmailHandler = event => setEmail(event.target.value);
  const changePasswordHandler = event => setPassword(event.target.value);

  return (
    <Card className="form-container">
      <Form onSubmit={loginClickHandler}>
        <FormSection>
          <Image src={logo} style={{ width: 200 }} />
        </FormSection>
        <FormSection>
          <h2>Welcom</h2>
          <p>Type Your Email and Password Login</p>
        </FormSection>
        <Form.Group className="form-group">
          <FormSection>
            <Form.Label>Email addres</Form.Label>
            <Form.Control
              value={email}
              onChange={changeEmailHandler}
              type="email"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={changePasswordHandler}
            />
          </FormSection>
        </Form.Group>
        <Form.Group>
          <FormSection>
            <Button type="submit" className="login-button">
              Login
            </Button>
            <Form.Label onClick={signupClickHandler} className="sign-up__label">
              Sign-Up
            </Form.Label>
            <Form.Label className="forget-password__label">
              Forget Password ?
            </Form.Label>
          </FormSection>
        </Form.Group>
      </Form>
    </Card>
  );
}

export default LoginForm;
