import React, { useState } from "react";
import { Input, Form, Button, Select } from "semantic-ui-react";
import PropTypes from "prop-types";

import { handleEstimation } from "../actions/Estimation";
import Confirmation from "./Confirmation";
import Result from "./Result";

// select values
const typeOptions = [
  { key: 0, value: "appartement", text: "Appartement" },
  { key: 1, value: "maison", text: "Maison" }
];

const statusOptions = [
  {
    key: 0,
    value: "NDT",
    text: "Nécessite des travaux"
  },
  {
    key: 1,
    value: "BE",
    text: "Bon état"
  },
  {
    key: 2,
    value: "RAN",
    text: "Refait à neuf"
  }
];

const handleRenderContent = (
  step,
  formValues,
  handleChange,
  estimation,
  errors
) => {
  switch (step) {
    case 0:
      return (
        <Form.Field error={!!errors["price"]}>
          <label>Prix m²</label>
          <Input
            name="price"
            onChange={handleChange}
            value={formValues.price}
          />
          {errors["price"] && <span className="error">{errors["price"]}</span>}
        </Form.Field>
      );
    case 1:
      return (
        <Form.Field error={!!errors["surface"]}>
          <label>Surface</label>
          <Input
            name="surface"
            onChange={handleChange}
            value={formValues.surface}
            placeholder="Ex: 200"
            label={{ basic: true, content: "m²" }}
            labelPosition="right"
          />
          {errors["surface"] && (
            <span className="error">{errors["surface"]}</span>
          )}
        </Form.Field>
      );
    case 2:
      return (
        <Form.Field error={!!errors["nbRooms"]}>
          <label>Nombre de pièces</label>
          <Input
            name="nbRooms"
            onChange={handleChange}
            value={formValues.nbRooms}
            type="number"
            min={1}
          />
          {errors["nbRooms"] && (
            <span className="error">{errors["nbRooms"]}</span>
          )}
        </Form.Field>
      );
    case 3:
      return (
        <Form.Field error={!!errors["type"]}>
          <label>Le type du bien</label>
          <Select
            name="type"
            onChange={handleChange}
            value={formValues.type}
            options={typeOptions}
          />
          {errors["type"] && <span className="error">{errors["type"]}</span>}
        </Form.Field>
      );
    case 4:
      return (
        <Form.Field error={!!errors["status"]}>
          <label>L’état général du bien</label>
          <Select
            name="status"
            onChange={handleChange}
            value={formValues.status}
            options={statusOptions}
          />
          {errors["status"] && (
            <span className="error">{errors["status"]}</span>
          )}
        </Form.Field>
      );
    case 5:
      return <Confirmation formValues={formValues} />;
    case 6:
      return <Result estimation={estimation} />;
    default:
      return null;
  }
};

const StepsContainer = ({
  step,
  nbSteps,
  nextStep,
  previousStep,
  formValues,
  handleChange,
  handleClearData,
  errors,
  validate
}) => {
  const [estimation, setEstimation] = useState(null);

  // submit the form
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    if (step <= nbSteps - 2) {
      if (step === nbSteps - 2) {
        const estimation = await handleEstimation({
          ...formValues,
          nbRooms: +formValues.nbRooms,
          surface: +formValues.surface,
          price: +formValues.price
        });
        setEstimation(estimation.data);
      }
      nextStep();
    }
    // clear data and redo the process
    if (step === nbSteps - 1) {
      handleClearData();
    }
  };

  const handleButtonText = () => {
    if (step === nbSteps - 1) return "Refaire";
    if (step === nbSteps - 2) return "Estimer";
    return "Suivant";
  };
  return (
    <>
      <Form>
        {handleRenderContent(
          step,
          formValues,
          handleChange,
          estimation,
          errors
        )}
      </Form>
      <Button.Group style={{ marginTop: 20 }}>
        {step > 0 && step < 5 && (
          <Button onClick={previousStep}>Précédent</Button>
        )}
        <Button.Or text="" />
        <Button positive onClick={handleSubmit}>
          {handleButtonText()}
        </Button>
      </Button.Group>
    </>
  );
};

StepsContainer.propTypes = {
  step: PropTypes.number,
  formValues: PropTypes.object,
  handleChange: PropTypes.func,
  nbSteps: PropTypes.number,
  nextStep: PropTypes.func,
  previousStep: PropTypes.func,
  handleClearData: PropTypes.func,
  errors: PropTypes.object,
  validate: PropTypes.func
};

export default StepsContainer;
