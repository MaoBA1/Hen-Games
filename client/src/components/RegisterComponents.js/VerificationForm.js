import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";
import Card from "../UI/Card/Card";
import FormSection from "../UI/Form/FormSection";
import "./VerificationForm.css";

function VerificationForm({
  logo,
  onFulfiledPasscode,
  onRequestVerificationCode,
}) {
  const [passcode, setPasscode] = useState("");

  const changePasscodeHandler = (event) => {
    setPasscode(event.target.value);
    if (event.target.value.length === 4) {
      onFulfiledPasscode(event.target.value);
      setPasscode("");
    }
  };

  return (
    <Card className="form-container">
      <FormSection>
        <Image src={logo} style={{ width: 200 }} />
      </FormSection>
      <Form className="inner-form">
        <Form.Label className="form-label">
          Please Enter Your verification code
        </Form.Label>
        <Form.Control
          className="form-control"
          type="text"
          value={passcode}
          onChange={changePasscodeHandler}
        />
        <FormSection>
          <Form.Label
            onClick={onRequestVerificationCode}
            className="back__label"
          >
            resend verification code
          </Form.Label>
        </FormSection>
      </Form>
    </Card>
  );
}

export default VerificationForm;
