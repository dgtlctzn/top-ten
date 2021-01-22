import React from "react";
import { useSelector } from "react-redux";
import RootState from "../../reducers/interface";
import "./Alert.css";

const Alert = () => {

  const {message, status, color} = useSelector((state: RootState) => state.alertReducer)
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
