import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "styles/ChangePhone.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";

function EditPhone() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userData);
  const errorMsg = useSelector((state) => state.user);
  const [changeNumber, setChangeNumber] = useState("")
  const [emptyForm, setEmptyForm] = useState(true);

  const checkEmptyForm = (changeNumber) => {
    if (!changeNumber) return setEmptyForm(true);
    changeNumber && setEmptyForm(false);
  };

  const valueNumber = (e) => {
    if (e.target.value.length === 0) setChangeNumber('')
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1])) setChangeNumber(e.target.value)
  }

  const editPhoneSuccess = () => {
    toast.success("Your phone number updated successfully!");
    router.push(`/user/profile/${auth.id}`);
  };
  const editPhoneError = () => {
    toast.error(`Update failed! ${errorMsg}`);
  };

  const editPhoneHandler = (e) => {
    e.preventDefault();
    const body = {
      noTelp: changeNumber
    }
    dispatch(
      userAction.updateUserByIdThunk(
        auth.id,
        auth.token,
        body,
        editPhoneSuccess,
        editPhoneError
      )
    );
  };

  useEffect(() => {
    checkEmptyForm(changeNumber);
  }, [changeNumber]);

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
                <p>Change Password</p>
              </div>
              <div className={styles.information}>
                <p className={styles.text1}>
                  You must enter your current password and then type your new
                  password twice.
                </p>
              </div>
              <form
                className={styles["form-input"]}
                onSubmit={editPhoneHandler}
              >
                <div className={styles["wrapper-input"]}>
                  {emptyForm ? (
                    <i className={`fa fa-phone ${styles.icon}`}></i>
                  ) : (
                    <i
                      className={`fa fa-phone ${styles.icon} ${styles.blue}`}
                    ></i>
                  )}
                  <span>+62</span>
                  <input
                    // className={
                    //   emptyForm
                    //     ? styles.input
                    //     : `${styles.input} ${styles.blue}`
                    // }
                    className={styles.input}
                    type="phone"
                    placeholder="Enter your phone number"
                    required
                    onChange={valueNumber}
                    // onChange={(e) => {
                    //   setChangeNumber(e.target.value);
                    //   console.log(changeNumber);
                    // }}
                  ></input>
                </div>
                <button
                  className={styles.btn}
                  type="submit"
                  disabled={emptyForm}
                >
                  <p>Edit Phone Number</p>
                </button>
              </form>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default EditPhone;
