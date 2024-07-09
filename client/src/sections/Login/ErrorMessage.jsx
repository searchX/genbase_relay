import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = ({message}) => (
    <p className="has-text-weight-bold has-text-danger">{message}</p>
);
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
};

export default ErrorMessage;