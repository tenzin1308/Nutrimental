import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [lengthError, setLengthError] = useState(false);
  const [alphaNumericError, setAlphaNumericError] = useState(false);
  const [notMatchingError, setNotMatchingError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // RegExp for password validation
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    // checking if value of first name and last name is empty show error else take to step 2
    if (!validator.equals(values.password, values.confirmPassword)) {
      setNotMatchingError(true);
    } else if (values.password.length < 8 ){
      setLengthError(true);
    } else if (pattern.test(values.password) === false) {
      setAlphaNumericError(true);
     } else {
       nextStep();
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
                style={{ border: notMatchingError || lengthError || alphaNumericError  ? "2px solid red" : "" }}
                name="password"
                defaultValue={values.password}
                type="password"
                placeholder="Password"
                onChange={handleFormData("password")}
              />
              {notMatchingError ? (
                <Form.Text style={{ color: "red" }}>
                  Password is not matching
                </Form.Text>
              ) : (
                ""
              )}
              {lengthError ? (
                <Form.Text style={{ color: "red" }}>
                  Password length should be 8 or greater
                </Form.Text>
              ) : (
                ""
              )}
              {alphaNumericError ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain Alpha-Numeric characters
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                style={{ border: notMatchingError || lengthError || alphaNumericError ? "2px solid red" : "" }}
                name="confirmPassword"
                defaultValue={values.confirmPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={handleFormData("confirmPassword")}
              />
              {notMatchingError ? (
                <Form.Text style={{ color: "red" }}>
                  Password is not matching
                </Form.Text>
              ) : (
                ""
              )}
              {lengthError ? (
                <Form.Text style={{ color: "red" }}>
                  Password length should be 8 or greater
                </Form.Text>
              ) : (
                ""
              )}
              {alphaNumericError ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain Alpha-Numeric characters
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