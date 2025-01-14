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
import { useState, useEffect } from "react";
import API_ENDPOINTS from "../services/apiEndpoints";
import axios from "axios";

function SaleCreateUpdateRecordModal({
  modalActionType,
  isModalOpen,
  recordType,
  handleFormSubmit,
  handleCloseModal,
  isInputError,
  inputErrorContent,
  record,
}) {
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [error, setError] = useState(false);

  const newList = inputErrorContent != null && Object.values(inputErrorContent);
  const customerUrl = API_ENDPOINTS.CUSTOMER;
  const storeUrl = API_ENDPOINTS.STORE;
  const productUrl = API_ENDPOINTS.PRODUCT;

  useEffect(() => {
    getAllCustomers();
    getAllStores();
    getAllProducts();
  }, []);

  const getAllCustomers = async () => {
    try {
      const result = await axios.get(customerUrl);
      setCustomerList(result.data);
    } catch (err) {
      if (err) setError(true);
    }
  };

  const getAllProducts = async () => {
    try {
      const result = await axios.get(productUrl);
      setProductList(result.data);
    } catch (err) {
      if (err) setError(true);
    }
  };

  const getAllStores = async () => {
    try {
      const result = await axios.get(storeUrl);
      setStoreList(result.data);
    } catch (err) {
      if (err) setError(true);
    }
  };

  const dateSold =
    modalActionType == "Create" ? (
      <Input name="dateSold" type="date"></Input>
    ) : (
      <Input readonly name="dateSold" value={record?.formattedDate}></Input>
    );

  const customerSelect = (
    <select name="customerId">
      <option value={record?.customerId ? record.customerId : " "} selected>
        {record?.customerName ? record.customerName : " "}
      </option>
      {customerList
        .filter((c) => c.id != record?.customerId)
        .map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          );
        })}
    </select>
  );

  const productSelect = (
    <select name="productId">
      <option value={record?.productId ? record.productId : " "} selected>
        {record?.productName ? record.productName : " "}
      </option>
      {productList
        .filter((p) => p.id != record?.productId)
        .map((p) => {
          return (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          );
        })}
    </select>
  );

  const storeSelect = (
    <select name="storeId">
      <option value={record?.storeId ? record.storeId : " "} selected>
        {record?.storeName ? record.storeName : " "}
      </option>
      {storeList
        .filter((s) => s.id != record?.storeId)
        .map((s) => {
          return (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          );
        })}
    </select>
  );

  return (
    <Modal open={isModalOpen}>
      <ModalHeader>{`${modalActionType} ${recordType}`}</ModalHeader>
      <ModalContent>
        <ModalDescription>
          {error ? (
            <Message negative>Failed to load form options...</Message>
          ) : (
            <Form id="modalform" onSubmit={handleFormSubmit}>
              <FormField>
                <label>Date Sold</label>
                {dateSold}
                <label>Customer</label>
                {customerSelect}
                <label>Product</label>
                {productSelect}
                <label>Store</label>
                {storeSelect}
              </FormField>
              <Message negative hidden={!isInputError} list={newList} />
            </Form>
          )}
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
export default SaleCreateUpdateRecordModal;

SaleCreateUpdateRecordModal.propTypes = {
  recordType: PropTypes.string,
  handleFormSubmit: PropTypes.func,
  formFields: PropTypes.array,
  isModalOpen: PropTypes.bool,
  modalActionType: PropTypes.string,
  record: PropTypes.object,
  handleCloseModal: PropTypes.func,
  isInputError: PropTypes.bool,
  inputErrorContent: PropTypes.string,
};
