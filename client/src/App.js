import React, { useState } from "react";
import { Grid, Segment } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

import Stepper from "./components/Stepper";
import StepsContainer from "./components/StepsContainer";

import { stepsOptions } from "./shared/data";
import HeaderUI from "./layout/Header";
import Footer from "./layout/Footer";

// usefull to clear data later
const initialState = {
  surface: "",
  price: "",
  status: "",
  nbRooms: 1,
  type: ""
};

function App() {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState, nbRooms: "" });

  const handleErrors = (name, value) => {
    // nbRooms is by default 1
    if (!value.length && name !== "nbRooms") {
      setErrors({ ...errors, [name]: "Ce champ est obligatoire!" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // validate form when submit
  const validate = () => {
    let isValid = true;
    switch (step) {
      case 0:
        if (!formValues["price"].length) {
          setErrors({ ...errors, price: "Ce champ est obligatoire!" });
          isValid = false;
        }
        break;
      case 1:
        if (!formValues["surface"].length) {
          setErrors({ ...errors, surface: "Ce champ est obligatoire!" });
          isValid = false;
        }
        break;
      case 2:
        if (!formValues["nbRooms"]) {
          setErrors({ ...errors, nbRooms: "Ce champ est obligatoire!" });
          isValid = false;
        }
        break;
      case 3:
        if (!formValues["type"]) {
          setErrors({ ...errors, type: "Ce champ est obligatoire!" });
          isValid = false;
        }
        break;
      case 4:
        if (!formValues["status"]) {
          setErrors({ ...errors, status: "Ce champ est obligatoire!" });
          isValid = false;
        }
        break;
      // default case made to remove error once passed step 4
      default:
        isValid = true;
        break;
    }
    return isValid;
  };

  const handleChange = (e, { value, name }) => {
    // handle errors
    handleErrors(name, value);
    // for surface & price replace any character with ""
    if (name === "surface" || name === "price") {
      setFormValues({
        ...formValues,
        [name]: value.replace(/[^\d.-]/g, "")
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const previousStep = () => {
    setStep(step - 1);
  };

  const handleClearData = () => {
    setFormValues(initialState);
    setStep(0);
  };

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Row>
        <HeaderUI />
      </Grid.Row>
      <Grid.Row>
        <Grid.Column largeScreen={4} widescreen={4} mobile={12}>
          <Stepper step={step} stepsOptions={stepsOptions} />
        </Grid.Column>
        <Grid.Column
          largeScreen={4}
          widescreen={4}
          mobile={12}
          verticalAlign="middle"
        >
          <Segment>
            <StepsContainer
              step={step}
              validate={validate}
              errors={errors}
              formValues={formValues}
              handleClearData={handleClearData}
              handleChange={handleChange}
              nextStep={nextStep}
              previousStep={previousStep}
              nbSteps={stepsOptions.length}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Footer />
      </Grid.Row>
    </Grid>
  );
}

export default App;
