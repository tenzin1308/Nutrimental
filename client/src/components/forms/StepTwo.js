import axios from "axios";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import UserPool from "../../UserPool";
// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ handleFormData, prevStep, values }) => {
  const {
    firstName,
    lastName,
    password,
    email,
    dob,
    weight,
    height,
    diet,
    gender,
  } = values;

  // function to run timer to wait before executing next line
  const delay = ms => new Promise(res => setTimeout(res, ms));

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    UserPool.signUp(email, password, [], null, async (err, data) => {
      if (err) {
        toast.error(err.message);
      } else {
        console.log(data);
        // after signup on cognito we are creating user in MongoDB
        await axios
          .post("/api/user/post", {
            user_email: email,
            first_name: firstName,
            last_name: lastName,
            dob: dob,
            weight: weight,
            height: height,
            diet: diet,
            gender: gender,
          })
          .then((res) => {
            console.log(res);
            toast.success("Sign up successful!")
          })
          .catch((err) => {
            toast.error(err.message);
          });
        // redirecting to successfulsignup page after signup and waiting 2.5 seconds
        await delay(2500);
        window.location.href = "/successfulsignup";
      }
    });
  };

  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                required
                name="dob"
                defaultValue={values.dob}
                max="2022-01-0"
                type="date"
                placeholder="dob"
                onChange={handleFormData("dob")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Group className="flex">
                <Form.Check
                  className="mr-3"
                  value="male"
                  name="gender"
                  type="radio"
                  label="Male"
                  onChange={handleFormData("gender")}
                />
                <Form.Check
                  className="mr-3"
                  value="female"
                  name="gender"
                  type="radio"
                  label="Female"
                  onChange={handleFormData("gender")}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight in (lbs) </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Weight"
                onChange={handleFormData("weight")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Height"
                onChange={handleFormData("height")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Diet (Optional)</Form.Label>
              <Form.Select
                id="diet"
                name="diet"
                placeholder="diet"
                onChange={handleFormData("diet")}
              >
                <option defaultValue="Select Diet">Select Diet</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Form.Select>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="light" onClick={prevStep}>
                Previous
              </Button>

              <Button variant="light" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepTwo;
