import React from "react";
import { useSelector } from "react-redux";
import "./Alert.css";

const Alert = () => {

    const {message, status, color} = useSelector(state => state.alertReducer)
  return (
    <div className="alertMessage text-center">
      {status ? (
        <div className={color} role="alert">
          {message}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Alert;
