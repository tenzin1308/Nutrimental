import axios from "axios";
import React, { useState, useEffect } from "react";
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
    isdietitian,
  } = values;

  const [error, setError] = useState(true);
  const [userDate, setDate] = useState("");
  const [useGender, setGender] = useState("");
  const [dietitian, setDietitian] = useState("no");
  const [userWeight, setWeight] = useState("");
  const [userHeight, setHeight] = useState("");
  const [userDiet, setDiet] = useState("Select Diet");
  const [weightCheck, setWeightCheckCheck] = useState(false);
  const [heightCheck, setHeightCheckCheck] = useState(false);
 
  useEffect(() => {
    if (userDate && useGender && dietitian && userWeight && userHeight) {
      if (!weightCheck && !heightCheck) {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [
    userDate,
    useGender,
    dietitian,
    userWeight,
    userHeight,
    weightCheck,
    heightCheck,
  ]);

  useEffect(() => {
    if (userWeight > 1000) {
      setWeightCheckCheck(true);
    } else {
      setWeightCheckCheck(false);
    }

    if (userHeight > 250) {
      setHeightCheckCheck(true);
    } else {
      setHeightCheckCheck(false);
    }
  }, [userWeight, userHeight]);

  var today = new Date();
  today.setDate(today.getDate() - 1);
  const maxDate = today.toISOString().slice(0, 10);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    UserPool.signUp(email, password, [], null, async (err, data) => {
      if (err) {
        toast.error(err.message);
      } else {
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
            isdietitian: isdietitian,
          })
          .then((res) => {
            axios.post("/api/food-history/post/", {
              user_email: email,
              history: [],
            });

            toast.success("Sign up successful!");
          })
          .catch((err) => {
            toast.error(err.message);
          });

        // redirecting to successfulsignup page after signup and waiting 2.5 seconds
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
                max={maxDate}
                type="date"
                placeholder="dob"
                onChange={(e) => {
                  setDate(e.target.value)
                  handleFormData("dob", e)
                }}
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
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleFormData("gender", e)
                  }}
                />
                <Form.Check
                  className="mr-3"
                  value="female"
                  name="gender"
                  type="radio"
                  label="Female"
                  onChange={(e) => {
                    setGender(e.target.value)
                    handleFormData("gender", e)
                 }}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Are you a dietitian?</Form.Label>
              <Form.Group className="flex">
                <Form.Check
                  className="mr-3"
                  value="yes"
                  name="isdietitian"
                  type="radio"
                  label="Yes"
                  onChange={(e) => {
                    setDietitian(e.target.value)
                    handleFormData("isdietitian", e)
                   }}
                />
                <Form.Check
                  className="mr-3"
                  value="no"
                  name="isdietitian"
                  type="radio"
                  label="No"
                  defaultChecked
                  onChange={(e) => {
                    setDietitian(e.target.value)
                    handleFormData("isdietitian", e)
                    }}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Weight in (lbs) </Form.Label>
              <Form.Control
                style={{ border: `1px solid ${weightCheck ? 'red' : '#ced4da'}` }}
                required
                type="number"
                placeholder="Weight"
               onChange={(e) => {
                setWeight(e.target.value)
                handleFormData("weight", e)
               }}
              />
              {weightCheck && <div style={{ fontSize: '1rem', color: 'red' }}>Exceeds the limit</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Height in (cm) </Form.Label>
              <Form.Control
                style={{ border: `1px solid ${heightCheck ? 'red' : '#ced4da'}` }}
                required
                type="number"
                placeholder="Height"
                onChange={(e) => {
                  setHeight(e.target.value)
                  handleFormData("height", e)
                }}
              />
              {heightCheck && <div style={{ fontSize: '1rem', color: 'red' }}>Exceeds the limit</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Diet (Optional)</Form.Label>
              <Form.Select
                id="diet"
                name="diet"
                placeholder="diet"
                onChange={(e) => {
                  setDiet(e.target.value)
                  handleFormData("diet", e)
                }}
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
