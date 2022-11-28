import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import userAction from "../../redux/actions/user";

import styles from "styles/CreatePin.module.css";
import Layout from "src/Components/Layout";
import SidebarAuth from "src/Components/SidebarAuth";
import { toast } from "react-toastify";

function CreatePin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [emptyForm, setEmptyForm] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData);

  const handlePin = (e) => setPin(`${e.target.value}`);

  const checkEmptyForm = (pin) => {
    if (!pin || pin.length !== 6) return setEmptyForm(true);
    pin && pin.length === 6 && setEmptyForm(false);
  };

  const createPinSuccess = () => {
    toast.success(
      "Create pin success!",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      }
    )
    router.push("/dashboard")
  }

  const createPinDenied = () => {
    toast.error("Create pin failed!", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,}
    )
  }

  // console.log(pin);
  const handleSubmitPin = (e) => {
    e.preventDefault();
    // console.log("ceekk");
    const body = { pin: pin };
    dispatch(
      userAction.updatePinThunk(userData.id, body, userData.token, createPinSuccess, createPinDenied)
    );
  };

  useEffect(() => {
    checkEmptyForm(pin);
  }, [pin]);

  return (
    <div className={styles.container}>
      <Layout title="Pin"></Layout>
      <main className={`${styles["main-content"]} ${styles.flex}`}>
        <aside className={styles.aside}>
          <SidebarAuth></SidebarAuth>
        </aside>
        <section className={styles.content}>
          <p className={styles.text}>
            Secure Your Account, Your Wallet,
            <br /> and Your Data With 6 Digits PIN
            <br />
            That You Created Yourself.
          </p>
          <p className={styles.text2}>
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don&#39;t tell anyone about your
            FazzPay account password and the PIN.
          </p>
          <form onSubmit={handleSubmitPin}>
            <div className={styles.submitPin}>
              <div className={styles.pin}>
                <input
                  className={styles.inputPin}
                  type="number"
                  required
                  onChange={handlePin}
                />
              </div>
            </div>
            <button
              className={`${styles.btn}`}
              type="submit"
              disabled={emptyForm}
            >
              Confirm
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default CreatePin;
