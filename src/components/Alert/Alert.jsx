import React from "react";
import { useSelector } from "react-redux";
import "./Alert.css";

const Alert = () => {

    const success = useSelector(state => state.alertReducer)
  return (
    <div className="alertMessage">
      {success ? (
        <div className="alert alert-success" role="alert">
          Added to top ten!
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alert;
