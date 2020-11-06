import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import "../src/scss/styles.scss";

import wrapper from "../store/configureStore";

const ToDoApp = ({ Component }) => {
  return <Component />;
};

ToDoApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(ToDoApp);
