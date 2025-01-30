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

function ProductCreateUpdateRecordModal({
  modalActionType,
  record,
  recordType,
  handleFormSubmit,
  handleCloseModal,
  isInputError,
  inputErrorContent,
  isModalOpen,
}) {
  const newErrorList =
    inputErrorContent != null && Object.values(inputErrorContent);

  const formfield = (
    <Form id="modalform" onSubmit={handleFormSubmit}>
      <FormField>
        <label>Name</label>
        <Input name="name" defaultValue={record?.name} error={isInputError} />
      </FormField>
      <FormField>
        <label>Price</label>
        <Input
          name="price"
          defaultValue={record?.formattedPrice}
          error={isInputError}
        />
      </FormField>
      <Message negative hidden={!isInputError} list={newErrorList} />
    </Form>
  );

  return (
    <Modal open={isModalOpen}>
      <ModalHeader>{`${modalActionType} ${recordType}`}</ModalHeader>
      <ModalContent>
        <ModalDescription>{formfield}</ModalDescription>
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

export default ProductCreateUpdateRecordModal;

ProductCreateUpdateRecordModal.propTypes = {
  recordType: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  isModalOpen: PropTypes.bool,
  modalActionType: PropTypes.string,
  record: PropTypes.object,
  handleCloseModal: PropTypes.func,
  isInputError: PropTypes.bool,
  inputErrorContent: PropTypes.array,
};
