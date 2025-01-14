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
  headerList,
  columnList,
  handleOpenUpdateModal,
  handleOpenDeleteModal,
}) {
  //headers for the table
  const headers = headerList.map((header, index) => (
    <TableHeaderCell key={index}>{header}</TableHeaderCell>
  ));

  //row for each record in the table

  const recordRow = data.map((record) => {
    return (
      <TableRow key={record.id}>
        {columnList.map((column) => {
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
          <TableRow>{headers}</TableRow>
        </TableHeader>
        <TableBody>{recordRow}</TableBody>
      </Table>
    </div>
  );
}

export default RecordsTable;

RecordsTable.propTypes = {
  RecordRow: PropTypes.func,
  headerList: PropTypes.array,
  data: PropTypes.array,
  columnList: PropTypes.array,
  handleOpenUpdateModal: PropTypes.func,
  handleOpenDeleteModal: PropTypes.func,
  recordType: PropTypes.string,
};
