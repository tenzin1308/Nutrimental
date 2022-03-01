import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destructuring them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [isStrongPassword, setIsStrongPassword] = useState(false);
  const [notMatchingError, setNotMatchingError] = useState(false);

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
    } else if (!validator.isStrongPassword(values.password)){
      setIsStrongPassword(true);
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
                style={{ border: notMatchingError || isStrongPassword  ? "2px solid red" : "" }}
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
              {isStrongPassword ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain <br />
                  <ul>
                    <li>
                      At least one lowercase letter (a-z)
                    </li> 
                    <li>
                      At least one uppercase letter (A-Z)
                    </li>
                    <li>
                      At least one number (0-9)
                    </li>
                    <li>
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
                style={{ border: notMatchingError || isStrongPassword ? "2px solid red" : "" }}
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
              {isStrongPassword ? (
                <Form.Text style={{ color: "red" }}>
                  Password should contain <br />
                  <ul>
                    <li>
                      At least one lowercase letter (a-z)
                    </li> 
                    <li>
                      At least one uppercase letter (A-Z)
                    </li>
                    <li>
                      At least one number (0-9)
                    </li>
                    <li>
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