import React from "react";
import { Card } from "react-bootstrap";

const Final = ({ values }) => {

    //destructuring the object from values
  const { firstName, lastName, dob, email, weight, height, diet } = values;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {firstName}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
          <p>
            <strong>DOB :</strong> {dob}{" "}
          </p>
          <p>
            <strong>Weight :</strong> {weight}{" "}
          </p>
          <p>
            <strong>Height :</strong> {height}{" "}
          </p>
          <p>
            <strong>Diet :</strong> {diet}{" "}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Final;