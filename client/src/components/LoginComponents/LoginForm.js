import React, { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import FormSection from "../UI/Form/FormSection";
import Card from "../UI/Card/Card";
import "./LoginForm.css";

function LoginForm({ logo, onSignUpClicked }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupClickHandler = () => onSignUpClicked();
  return (
    <Card className="form-container">
      <Form>
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
            <Form.Control type="email"/>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"/>
          </FormSection>
        </Form.Group>
        <Form.Group>
          <FormSection>
            <Button className="login-button">Login</Button>
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
