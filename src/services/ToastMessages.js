import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RemoveError } from "../redux/reducers/ErrorReducer";

const ToastMessages = () => {
  const reduxState = useSelector((state) => state.ErrorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    reduxState.error.map((item) => {
      setTimeout(() => {
        dispatch(RemoveError());
      }, 100);
      return toast.error(item?.message);
    });
  }, [reduxState]);

  console.log("error reducers", reduxState.error);

  return <ToastContainer />;
};

export default ToastMessages;
