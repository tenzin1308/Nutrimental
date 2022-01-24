import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import UserPool from "../../UserPool";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ handleFormData, prevStep, values }) => {

  const { firstName, lastName, password, email } = values;

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
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