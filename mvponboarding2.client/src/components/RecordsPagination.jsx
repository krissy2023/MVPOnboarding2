import "./recordsPagination.css";
import { Pagination, Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";
function RecordsPagination({
  handlePageSizeSelection,
  handlePageNumber,
  totalPages,
}) {
  const dropdownOptions = [
    { key: 10, text: 10, value: 10 },
    { key: 20, text: 20, value: 20 },
    { key: 30, text: 30, value: 30 },
  ];
  return (
    <div className="pagination">
      <div>
        <Dropdown
          options={dropdownOptions}
          compact
          defaultValue={10}
          onChange={handlePageSizeSelection}
          selection
        />
      </div>
      <div>
        <Pagination
          defaultActivePage={1}
          totalPages={totalPages}
          onPageChange={handlePageNumber}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          prevItem={null}
          nextItem={null}
        />
      </div>
    </div>
  );
}

export default RecordsPagination;

RecordsPagination.propTypes = {
  handlePageSizeSelection: PropTypes.func,
  handlePageNumber: PropTypes.func,
  activePage: PropTypes.number,
  totalPages: PropTypes.number,
};
