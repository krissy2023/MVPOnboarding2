import { Link } from "react-router-dom";
import { Message, MessageHeader } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./ErrorPage.css";

function ErrorPage({ errMessage }) {
  return (
    <div className="error-page">
      <Message negative>
        <MessageHeader>{errMessage}</MessageHeader>
      </Message>
      <Link to="/">Back to home page...</Link>
    </div>
  );
}

export default ErrorPage;

ErrorPage.propTypes = {
  errMessage: PropTypes.string,
};
