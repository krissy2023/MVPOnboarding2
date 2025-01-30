import {
  TableRow,
  TableHeaderCell,
  Table,
  Button,
  TableHeader,
  TableBody,
  TableCell,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import "./recordsTable.css";

function RecordsTable({
  data,
  headers,
  columns,
  handleOpenUpdateModal,
  handleOpenDeleteModal,
}) {
  //headers for the table
  const tableHeaders = headers.map((header, index) => (
    <TableHeaderCell key={index}>{header}</TableHeaderCell>
  ));

  //row for each record in the table

  const recordRow = data.map((record) => {
    return (
      <TableRow key={record.id}>
        {columns.map((column) => {
          return <TableCell key={column}> {record[`${column}`]}</TableCell>;
        })}

        <TableCell>
          <Button
            color="yellow"
            name="Edit"
            value={record.id}
            onClick={handleOpenUpdateModal}
          >
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <Button
            color="red"
            name="Delete"
            value={record.id}
            onClick={handleOpenDeleteModal}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <div className="records-table">
      <Table celled>
        <TableHeader>
          <TableRow>{tableHeaders}</TableRow>
        </TableHeader>
        <TableBody>{recordRow}</TableBody>
      </Table>
    </div>
  );
}

export default RecordsTable;

RecordsTable.propTypes = {
  RecordRow: PropTypes.func,
  headers: PropTypes.array,
  data: PropTypes.array,
  columns: PropTypes.array,
  handleOpenUpdateModal: PropTypes.func,
  handleOpenDeleteModal: PropTypes.func,
  recordType: PropTypes.string,
};
