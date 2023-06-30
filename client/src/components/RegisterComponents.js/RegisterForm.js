import { Button, Form, Image } from "react-bootstrap";
import Card from "../UI/Card/Card";
import "./RegisterForm.css";
import FormSection from "../UI/Form/FormSection";
import { useState } from "react";

function RegisterForm({ logo, onBackToLogin, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const backClickHandler = () => onBackToLogin();
  const signupClickHandler = (event) => {
    event.preventDefault();
    onSignUp({
        email,
        password,
        firstName,
        lastName,
        mobile
    });
  }
  const changeFirstNameHandler = (event) => setFirstName(event.target.value);
  const changeLastNameHandler = (event) => setLastName(event.target.value);
  const changeEmailHandler = (event) => setEmail(event.target.value);
  const changePasswordHandler = (event) => setPassword(event.target.value);
  const changeMobileHandler = (event) => setMobile(event.target.value);

  return (
    <Card className="form-container">
      <Form onSubmit={signupClickHandler}>
        <FormSection>
          <Image src={logo} style={{ width: 200 }} />
        </FormSection>
        <Form.Group className="form-group">
          <FormSection>
            <Form.Label className="form-label__register">
              First Name:
            </Form.Label>
            <Form.Control
              value={firstName}
              onChange={changeFirstNameHandler}
              style={{ width: "250px" }}
              type="text"
            />
            <Form.Label className="form-label__register">Last Name:</Form.Label>
            <Form.Control
              value={lastName}
              onChange={changeLastNameHandler}
              style={{ width: "250px" }}
              type="text"
            />
          </FormSection>
          <FormSection>
            <Form.Label className="form-label__register">Email:</Form.Label>
            <Form.Control
              value={email}
              onChange={changeEmailHandler}
              style={{ width: "270px" }}
              type="text"
            />
            <Form.Label className="form-label__register">Password:</Form.Label>
            <Form.Control
              value={password}
              onChange={changePasswordHandler}
              style={{ width: "250px" }}
              type="password"
            />
            <Form.Label className="form-label__register">Mobile:</Form.Label>
            <Form.Control
              value={mobile}
              onChange={changeMobileHandler}
              style={{ width: "250px" }}
              type="text"
            />
          </FormSection>
        </Form.Group>
        <Form.Group>
          <FormSection>
            <Button
              type="submit"
              className="register-button"
            >
              Sign-Up
            </Button>
            <Form.Label onClick={backClickHandler} className="back__label">
              Back To Login
            </Form.Label>
          </FormSection>
        </Form.Group>
      </Form>
    </Card>
  );
}

export default RegisterForm;
