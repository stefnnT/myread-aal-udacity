import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <Fragment>
      <div style={mainbox} className="error-message">
        <div>Page not found!</div>
        <Link to="/">Home</Link>
      </div>
    </Fragment>
  );
};

const mainbox = {
  textAlign: "center",
  fontSize: "2rem",
  margin: "2rem auto",
  height: "100vh",
  width: "90%",
  position: "relative"
};

export default NotFound404;
