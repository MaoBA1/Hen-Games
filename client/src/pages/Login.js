import React, { useState } from "react";
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ServerUrl from "../ServerUrl";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import FormSection from "../components/UI/Form/FormSection";
import Logo from "../assets/logo.png";
import LoginForm from "../components/LoginComponents/LoginForm";
import RegisterForm from "../components/RegisterComponents.js/RegisterForm";

const baseUrl = ServerUrl.baseUrl;

const Login = (props) => {
  const navigation = useNavigate();
  const [stateView, setStateView] = useState("login");

  const signupClickHandler = () => setStateView("register");
  const backToLoginClickHandler = () => setStateView("login");

  // const login = async () => {
  //   if (email !== "" && password !== "") {
  //     const user = {
  //       email: email,
  //       password: password,
  //     };

  //     axios
  //       .post(baseUrl + "/account/login", { user })
  //       .then((results) => {
  //         localStorage.setItem("token", results.data.message);
  //         navigation("/dashboard");
  //       })
  //       .catch((error) => {
  //         toast.error(error.response.data.message);
  //       });
  //   } else {
  //     toast.error("All input are required!!!");
  //   }
  // };

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
          setStateView("login")
          toast.success(results.data.message.email);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("All input are required!!!");
    }
  };

  return (
    <>
      <ToastContainer />
      {stateView === "login" && (
        <LoginForm onSignUpClicked={signupClickHandler} logo={Logo} />
      )}
      {stateView === "register" && (
        <RegisterForm
          onSignUp={SignupHandler}
          onBackToLogin={backToLoginClickHandler}
          logo={Logo}
        />
      )}
    </>
  );
};

export default Login;

