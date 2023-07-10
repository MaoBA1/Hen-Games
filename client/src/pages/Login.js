import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import LoginForm from "../components/LoginComponents/LoginForm";
import RegisterForm from "../components/RegisterComponents.js/RegisterForm";
import VerificationForm from "../components/RegisterComponents.js/VerificationForm";

const baseUrl = ServerUrl.baseUrl;

const Login = (props) => {
  const navigation = useNavigate();
  const [stateView, setStateView] = useState("login");

  const signupClickHandler = () => setStateView("register");
  const backToLoginClickHandler = () => setStateView("login");

  const loginClickHandler = async ({ email, password }) => {
    if (email !== "" && password !== "") {
      const user = {
        email: email,
        password: password,
      };

      axios
        .post(baseUrl + "/account/login", { user })
        .then((results) => {
          localStorage.setItem("token", results.data.message);
          navigation("/dashboard");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("All input are required!!!");
    }
  };

  const SignupHandler = async ({
    firstName,
    lastName,
    email,
    password,
    mobile,
  }) => {
    if (firstName !== "" && lastName !== "" && password !== "") {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobile: mobile,
      };

      axios
        .post(baseUrl + "/account/createAccount", { user })
        .then((results) => {
          setStateView("verification");
          toast.success(results.data.message);
          localStorage.setItem("temporaryEmail", JSON.stringify(email));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("All input are required!!!");
    }
  };

  const verificationHandler = (passcode) => {
    const tempEmail = JSON.parse(localStorage.getItem("temporaryEmail"));
    console.log(tempEmail);
    axios
      .put(baseUrl + "/account/verifyNewAccount", {
        email: tempEmail,
        passcode,
      })
      .then((results) => {
        if (results.data.status) {
          toast.success(results.data.message);
          localStorage.removeItem("temporaryEmail");
          return setStateView("login");
        }
        toast.error(results.data.message);
      });
  };

  const requestNewVerificationCodeHandler = () => {
    const tempEmail = JSON.parse(localStorage.getItem("temporaryEmail"));
    axios
      .put(baseUrl + "/account/getNewVerificationCode", { email: tempEmail })
      .then((results) => {
        toast.success(results.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      {stateView === "login" && (
        <LoginForm
          onSignUpClicked={signupClickHandler}
          onLogin={loginClickHandler}
          logo={Logo}
        />
      )}
      {stateView === "register" && (
        <RegisterForm
          onSignUp={SignupHandler}
          onBackToLogin={backToLoginClickHandler}
          logo={Logo}
        />
      )}
      {stateView === "verification" && (
        <VerificationForm
          logo={Logo}
          onFulfiledPasscode={verificationHandler}
          onRequestVerificationCode={requestNewVerificationCodeHandler}
        />
      )}
    </>
  );
};

export default Login;
