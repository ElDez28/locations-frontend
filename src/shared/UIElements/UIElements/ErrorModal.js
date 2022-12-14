import React from "react";

import Modal from "./Modal";
import Button from "../../components/Button/Button";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      isOpen={props.error}
      footer={
        <Button type="button" onClick={props.onClear}>
          Okay
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
