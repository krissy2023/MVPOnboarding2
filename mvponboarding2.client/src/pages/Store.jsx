import { Button, Loader } from "semantic-ui-react";
import { useState, useEffect } from "react";
import API_SERVICE from "../services/apis/ApiService";
import API_ENDPOINTS from "../services/apiEndpoints";
import RecordsTable from "../components/RecordsTable.jsx";
import CreateUpdateRecordModal from "../components/CreateUpdateRecordModal.jsx";
import DeleteRecordModal from "../components/DeleteRecordModal.jsx";
import RecordsPagination from "../components/RecordsPagination.jsx";
import ErrorPage from "./ErrorPage.jsx";
import axios from "axios";

function Store() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalDataCount, setTotalDataCount] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState("");
  const [record, setRecord] = useState();
  const [id, setId] = useState();
  const [pagesize, setPageSize] = useState(10);
  const [pagenumber, setPageNumber] = useState(1);
  const [isInputError, setIsInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState("");
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const recordType = "Store";
  const headers = ["Name", "Address", "Actions", "Actions"];
  const columns = ["name", "address"];
  const inputFields = ["Name", "Address"];
  const pageSize = pagesize;
  const pageNumber = pagenumber;
  const totalPages = totalDataCount / pageSize;
  const url = API_ENDPOINTS.STORE;
  const urlWithPagination = url + `/${pageNumber}/${pageSize}`;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(urlWithPagination);
      setResponse(result.data.pagedList);
      setTotalDataCount(result.data.totalItemCount);
    } catch (err) {
      if (err) {
        setError("Link to the page not found");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNumber, pageSize]);

  //connected to button inside the recordstable component

  const handleOpenCreateModal = (e) => {
    setIsModalOpen(true);
    setModalActionType(e.target.name);
  };

  //connected to button inside the records table component

  const handleOpenUpdateModal = (e) => {
    setIsModalOpen(true);
    setModalActionType(e.target.name);
    setId(e.target.value);
    const data = response.find((d) => d.id == e.target.value);
    setRecord(data);
  };

  //connected to button inside the records table component
  const handleOpenDeleteModal = (e) => {
    setId(e.target.value);
    setIsDeleteModalOpen(true);
  };

  //button inside the CreateUpdateRecordModal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRecord("");
    setIsInputError(false);
  };

  //button inside the deleteRecordModal

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecord("");
    setIsDeleteError(false);
  };

  //create or update record from the form inside the CreateUpdateRecordModal

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    let inputErrorList = [];
    if (!data.name.trim()) {
      inputErrorList.push("name required");
    }
    if (!data.address.trim()) {
      inputErrorList.push("address required");
    }
    if (inputErrorList.length > 0) {
      setIsInputError(true);
      setInputErrorContent(inputErrorList);
      return;
    }
    switch (modalActionType) {
      case "Create":
        try {
          await API_SERVICE.postRecord(url, data);
        } catch (err) {
          if (err) {
            setError(err.message);
          }
        }
        break;
      case "Edit":
        try {
          await API_SERVICE.updateRecord(url, id, { id: id, ...data });
        } catch (err) {
          if (err) {
            setError(err.message);
          }
        }
        break;
    }
    setRecord("");
    fetchData();
    setIsModalOpen(false);
    setIsInputError(false);
  };

  //delete record handler inside the delete modal
  const handleDeleteRecord = async () => {
    try {
      await API_SERVICE.deleteRecord(url, id);
    } catch (err) {
      if (err) {
        setIsDeleteError(true);
        setDeleteErrorMessage(err.message);
      }
      return;
    }
    fetchData();
    setIsDeleteModalOpen(false);
  };

  const handlePageSizeSelection = (e, data) => {
    setPageSize(data.value);
  };

  const handlePageNumber = (e, { activePage }) => {
    setPageNumber(activePage);
  };

  return (
    <div>
      {!error && (
        <Button
          className="create-btn"
          color="blue"
          onClick={handleOpenCreateModal}
          name="Create"
        >
          {" "}
          New {recordType}
        </Button>
      )}
      {error && <ErrorPage errMessage={error} />}
      {!response && !error && (
        <p className="no-records">No records to show. </p>
      )}
      {isLoading && (
        <Loader active inline="centered">
          Loading
        </Loader>
      )}
      {!isLoading && !error && response && (
        <div>
          <RecordsTable
            data={response}
            headers={headers}
            columns={columns}
            handleOpenUpdateModal={handleOpenUpdateModal}
            handleOpenDeleteModal={handleOpenDeleteModal}
          />
        </div>
      )}

      <CreateUpdateRecordModal
        inputFields={inputFields}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        record={record}
        modalActionType={modalActionType}
        recordType={recordType}
        isInputError={isInputError}
        inputErrorContent={inputErrorContent}
      />

      <DeleteRecordModal
        handleCloseDeleteModal={handleCloseDeleteModal}
        handleDeleteRecord={handleDeleteRecord}
        isDeleteModalOpen={isDeleteModalOpen}
        recordType={recordType}
        isDeleteError={isDeleteError}
        deleteErrorMessage={deleteErrorMessage}
      />

      {response && (
        <RecordsPagination
          handlePageSizeSelection={handlePageSizeSelection}
          handlePageNumber={handlePageNumber}
          activePage={pageNumber}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
export default Store;
