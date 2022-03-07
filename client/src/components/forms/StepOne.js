import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destructuring them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [notMatchingError, setNotMatchingError] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [passwordLower, setPasswordLower] = useState(false);
  const [passwordUpper, setPasswordUpper] = useState(false);
  const [passwordNumber, setPasswordNumber] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [password2Length, setPassword2Length] = useState(false);
  const [password2Lower, setPassword2Lower] = useState(false);
  const [password2Upper, setPassword2Upper] = useState(false);
  const [password2Number, setPassword2Number] = useState(false);
  const [password2Special, setPassword2Special] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // // RegExp for password validation
    // var pattern = new RegExp(
    //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    // );

    // checking if value of first name and last name is empty show error else take to step 2
    if (!validator.equals(values.password, values.confirmPassword)) {
      setNotMatchingError(true);
    } else if (!validator.isStrongPassword(values.password)) {
      setIsStrongPassword(true);
    } else {
      nextStep();
    }
  };

  const checkPassword1 = (value) => {
    if (value.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
    if (value.match(/[a-z]/g)?.length > 0) {
      setPasswordLower(true);
    } else {
      setPasswordLower(false);
    }
    if (value.match(/[A-Z]/g)?.length > 0) {
      setPasswordUpper(true);
    } else {
      setPasswordUpper(false);
    }
    if (value.match(/\d/g)?.length > 0) {
      setPasswordNumber(true);
    } else {
      setPasswordNumber(false);
    }
    if (value.match(/[-=_+!@#$%^&*()\s]/g)?.length > 0) {
      setPasswordSpecial(true);
    } else {
      setPasswordSpecial(false);
    }
  };
  const checkPassword2 = (value) => {
    if (value.length >= 8) {
      setPassword2Length(true);
    } else {
      setPassword2Length(false);
    }
    if (value.match(/[a-z]/g)?.length > 0) {
      setPassword2Lower(true);
    } else {
      setPassword2Lower(false);
    }
    if (value.match(/[A-Z]/g)?.length > 0) {
      setPassword2Upper(true);
    } else {
      setPassword2Upper(false);
    }
    if (value.match(/\d/g)?.length > 0) {
      setPassword2Number(true);
    } else {
      setPassword2Number(false);
    }
    if (value.match(/[-=_+!@#$%^&*()\s]/g)?.length > 0) {
      setPassword2Special(true);
    } else {
      setPassword2Special(false);
    }
  };

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                // style={{ border: emptyError ? "2px solid red" : "" }}
                name="firstName"
                defaultValue={values.firstName}
                type="text"
                placeholder="First Name"
                onChange={handleFormData("firstName")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name="lastName"
                defaultValue={values.lastName}
                type="text"
                placeholder="Last Name"
                onChange={handleFormData("lastName")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                defaultValue={values.email}
                type="email"
                placeholder="Email"
                onChange={handleFormData("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                style={{
                  border:
                    notMatchingError || isStrongPassword ? "2px solid red" : "",
                }}
                name="password"
                defaultValue={values.password}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  handleFormData("password");
                  checkPassword1(e.target.value);
                }}
              />
              {notMatchingError ? (
                <Form.Text style={{ color: "red" }}>
                  Password is not matching
                </Form.Text>
              ) : (
                ""
              )}
              {isStrongPassword ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain <br />
                  <ul>
                    <li
                      className={`${
                        !passwordLength ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={`${
                        !passwordLower ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one lowercase letter (a-z)
                    </li>
                    <li
                      className={`${
                        !passwordUpper ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one uppercase letter (A-Z)
                    </li>
                    <li
                      className={`${
                        !passwordNumber ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one number (0-9)
                    </li>
                    <li
                      className={`${
                        !passwordSpecial ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one special character (e.g. !@#$%^&*)
                    </li>
                  </ul>
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                style={{
                  border:
                    notMatchingError || isStrongPassword ? "2px solid red" : "",
                }}
                name="confirmPassword"
                defaultValue={values.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  handleFormData("confirmPassword");
                  checkPassword2(e.target.value);
                }}
              />
              {notMatchingError ? (
                <Form.Text style={{ color: "red" }}>
                  Password is not matching
                </Form.Text>
              ) : (
                ""
              )}
              {isStrongPassword ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain <br />
                  <ul>
                    <li
                      className={`${
                        !password2Length ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={`${
                        !password2Lower ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one lowercase letter (a-z)
                    </li>
                    <li
                      className={`${
                        !password2Upper ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one uppercase letter (A-Z)
                    </li>
                    <li
                      className={`${
                        !password2Number ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one number (0-9)
                    </li>
                    <li
                      className={`${
                        !password2Special ? "text-red-600" : "text-black"
                      }`}
                    >
                      At least one special character (e.g. !@#$%^&*)
                    </li>
                  </ul>
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Button variant="light" type="submit">
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
