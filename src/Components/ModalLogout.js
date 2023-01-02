import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "styles/ModalLogout.module.css";
import authAction from "../redux/actions/auth";

import Loading from "components/LoadingBtn";

const Modal = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const logoutSuccess = () => {
    toast.success("Logout success!");
    router.push("/auth/login");
  };

  const logoutHandler = () => {
    dispatch(authAction.logoutThunk(logoutSuccess));
  };
  return (
    <>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <p className={styles["modal-title"]}>Logout</p>
            </div>
            <div className={styles["modal-body"]}>
              Are you sure want to logout?
            </div>
            <div className={styles["modal-footer"]}>
              <button className={styles.button} onClick={logoutHandler}>
                {isLoading ? <Loading /> : <p>Yes</p>}
              </button>
              <button
                className={styles.button}
                onClick={() => props.setOpen(!props)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
