import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import PropTypes from "prop-types";

function DeleteRecordModal({
  isDeleteModalOpen,
  recordType,
  handleCloseDeleteModal,
  handleDeleteRecord,
  isDeleteError,
  deleteErrorMessage,
}) {
  return (
    <Modal open={isDeleteModalOpen}>
      <ModalHeader>{`Delete ${recordType}`}</ModalHeader>
      <ModalContent>
        <ModalDescription>
          {isDeleteError ? (
            <Message negative>
              <MessageHeader>Error Occured!</MessageHeader>
              <p>{deleteErrorMessage}</p>
            </Message>
          ) : (
            <p> Are you sure? </p>
          )}
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={handleCloseDeleteModal}>
          Cancel
        </Button>
        <Button
          name="Delete"
          content="Delete"
          labelPosition="right"
          icon="close"
          color="red"
          onClick={handleDeleteRecord}
        />
      </ModalActions>
    </Modal>
  );
}

export default DeleteRecordModal;

DeleteRecordModal.propTypes = {
  recordType: PropTypes.string,
  isDeleteModalOpen: PropTypes.bool,
  handleCloseDeleteModal: PropTypes.func,
  handleDeleteRecord: PropTypes.func,
  isDeleteError: PropTypes.bool,
  deleteErrorMessage: PropTypes.string,
};
