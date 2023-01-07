import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Button from "../buttons/button";
import ButtonGroup from "../buttons/button-group";

const Prompt = ({
  isOpen,
  toggle,
  singleButtonProps,
  singleButtonText,
  groupedButtonProps,
  children,
  hasGroupedButtons = false,
  promptHeader = "",
}) => {
  return (
    <Modal centered isOpen={isOpen} toggle={toggle}>
      {promptHeader && <ModalHeader>{promptHeader}</ModalHeader>}
      <ModalBody className="p-5">{children}</ModalBody>
      <ModalFooter>
        {hasGroupedButtons ? (
          <ButtonGroup options={groupedButtonProps} />
        ) : (
          <Button {...singleButtonProps}>{singleButtonText}</Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default Prompt;
