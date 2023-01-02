import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import topUpAction from "src/redux/actions/topUp";
import styles from "styles/ModalTopUp.module.css";
import Loading from "components/LoadingBtn";

function ModalTopUp({ setOpen, open, token }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState({});
  const [loading, setLoading] = useState(false);
  const topUp = useSelector((state) => state.topUp);
  const linkRef = useRef(null);

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const topUpSuccess = (directedLink) => {
    // console.log(">>>>>>>", directedLink);
    setOpen(!open);
    toast.success("Redirecting you to payment page");
  };
  const topUpFailed = (errorMsg) => {
    setOpen(!open);
    toast.error(`${errorMsg}`);
  };
  const topupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await dispatch(
        topUpAction.topUpThunk(body, token, topUpSuccess, topUpFailed)
      );
      // console.log("link midtrans",result);
      window.open(result.redirectUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {open && (
        <div onSubmit={topupHandler} className={styles.modal}>
          <form className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <p className={styles["modal-title"]}>Top Up Amount</p>
            </div>
            <input
              type="text"
              name="amount"
              className={styles["input-amount"]}
              onChange={changeHandler}
            />
            <div className={styles["modal-footer"]}>
              <button onClick={() => setOpen(!open)} className={styles.cancel}>
                Cancel
              </button>
              {loading ? (
                <Loading />
              ) : (
                <button className={styles.confirm} type="submit">
                  Confirm
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ModalTopUp;
