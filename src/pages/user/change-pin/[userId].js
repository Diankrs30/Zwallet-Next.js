import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import userAction from "src/redux/actions/user";
import dynamic from "next/dynamic";
const ReactCodeInput = dynamic(import("react-code-input"));
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "styles/ChangePin.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";

function ChangePin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.userData);
  const errorMsg = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [emptypin, setEmptypin] = useState(true);
  const [showConfirmInput, setShowConfirmInput] = useState(false);

  const checkEmptyPin = (pin1, pin2) => {
    if (!pin1 || pin1.length !== 6 || !pin2 || pin2.length !== 6)
      return setEmptypin(true);
    pin1 && pin2 && setEmptypin(false);
  };

  const handlePin1 = (e) => setPin1(`${e}`);
  const handlePin2 = (e) => setPin2(`${e}`);
  console.log(pin1, pin2);

  const showConfirmHandler = (pin1) => {
    if (pin1.length !== 6) return setShowConfirmInput(false);
    return setShowConfirmInput(true);
  };

  const editPinHandler = (e) => {
    e.preventDefault();

    if (pin1 !== pin2) {
      setShowConfirmInput(false);
      return toast.error("Your pin isn't matched");
    }
    const body = { pin: pin1 };

    const createPinSuccess = () => {
      toast.success(`Your pin updated successfully!`);
      router.push(`/user/${auth.id}`);
    };

    const createPinError = () => {
      toast.error(`Update failed! ${errorMsg}`);
    };

    dispatch(
      userAction.updatePinThunk(
        auth.id,
        body,
        auth.token,
        createPinSuccess,
        createPinError
      )
    );
  };

  useEffect(() => {
    checkEmptyPin(pin1, pin2);
  }, [pin1, pin2]);

  useEffect(() => {
    showConfirmHandler(pin1);
  }, [pin1]);

  useEffect(() => {
    isLoading && setEmptypin(true);
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <Layout></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-content"]}>
              <div className={styles.title}>
                <p>Change PIN</p>
              </div>
              <div className={styles.information}>
                {!showConfirmInput ? (
                  <p className={styles.text1}>
                    Enter your current 6 digits Fazzpay PIN below to continue to
                    the next steps.
                  </p>
                ) : (
                  <p className={styles.text1}>
                    Type your new 6 digits security PIN to use in Fazzpay.
                  </p>
                )}
              </div>
              {/* <form className={styles.submitPin}>
                <div className={styles["wrapper-pin"]}>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                </div>
                <Button text="Continue" variant="change-password"></Button>
              </form> */}
              <form onSubmit={editPinHandler} className={styles.submitPin}>
                <p
                  className={styles[showConfirmInput ? "confirm-text" : "hide"]}
                >
                  Confirm your pin
                </p>
                <div
                  className={styles[showConfirmInput ? "hide" : "code-wrapper"]}
                >
                  <ReactCodeInput
                    type="password"
                    fields={6}
                    onChange={handlePin1}
                  />
                </div>
                <div
                  className={styles[showConfirmInput ? "code-wrapper" : "hide"]}
                >
                  <ReactCodeInput
                    type="password"
                    fields={6}
                    onChange={handlePin2}
                  />
                </div>
                {!showConfirmInput ? (
                  <button
                    className={styles.btn}
                    type="submit"
                    disabled={emptypin}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    className={styles.btn}
                    type="submit"
                    disabled={emptypin}
                  >
                    Change PIN
                  </button>
                )}
              </form>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default ChangePin;
