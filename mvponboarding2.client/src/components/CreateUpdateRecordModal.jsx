import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Form,
  FormField,
  Input,
  Message,
} from "semantic-ui-react";
import PropTypes from "prop-types";

function CreateUpdateRecordModal({
  modalActionType,
  record,
  formFields,
  recordType,
  handleFormSubmit,
  handleCloseModal,
  isInputError,
  inputErrorContent,
  isModalOpen,
}) {
  const newErrorList =
    inputErrorContent != null && Object.values(inputErrorContent);

  const formField = formFields.map((r) => {
    return (
      <FormField key={r}>
        <label>{r}</label>
        <Input
          name={r.toLowerCase()}
          defaultValue={record?.[r.toLowerCase()]}
          error={isInputError}
        />
      </FormField>
    );
  });

  return (
    <Modal open={isModalOpen}>
      <ModalHeader>{`${modalActionType} ${recordType}`}</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form id="modalform" onSubmit={handleFormSubmit}>
            {formField}
            <Message negative hidden={!isInputError} list={newErrorList} />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          name={modalActionType}
          content={modalActionType}
          labelPosition="right"
          icon="checkmark"
          color="green"
          type="submit"
          form="modalform"
        />
      </ModalActions>
    </Modal>
  );
}

export default CreateUpdateRecordModal;

CreateUpdateRecordModal.propTypes = {
  recordType: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  formFields: PropTypes.array,
  isModalOpen: PropTypes.bool,
  modalActionType: PropTypes.string,
  record: PropTypes.object,
  handleCloseModal: PropTypes.func,
  isInputError: PropTypes.bool,
  inputErrorContent: PropTypes.array,
};
