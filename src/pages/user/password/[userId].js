import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "styles/ChangePassword.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Loading from "components/LoadingBtn";

function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userData);
  const isLoading = useSelector((state) => state.user.isLoading);
  const errorMsg = useSelector((state) => state.user.msgWrongPass);
  const [pwdShown, setPwdShown] = useState(false);
  const [pwdShown1, setPwdShown1] = useState(false);
  const [pwdShown2, setPwdShown2] = useState(false);
  const [similarity1, setSimilarity1] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  const [value, setValue] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const checkEmptyForm = () => {
    if (!body.oldPassword || !body.newPassword || !body.confirmPassword)
      return setEmptyForm(true);
    body.oldPassword &&
      body.newPassword &&
      body.confirmPassword &&
      setEmptyForm(false);
  };

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    if (e.target.value) setValue(true);
    else setValue(false);
  };

  const editPasswordHandler = (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    const editPasswordSuccess = () => {
      toast.success("Your password updated successfully!");
      router.push(`/user/${auth.id}`);
    };
  
    const editPasswordError = () => {
      toast.error(`Update password failed! ${errorMsg}`);
    };

    if (
      e.target.newPassword.value !== e.target.confirmPassword.value ||
      e.target.oldPassword.value === e.target.newPassword.value
    ) {
      if (e.target.newPassword.value !== e.target.confirmPassword.value)
        return setSimilarity2(true);
      if (e.target.oldPassword.value === e.target.newPassword.value)
        return setSimilarity1(true);
    }

    dispatch(
      userAction.updatePasswordThunk(
        auth.id,
        auth.token,
        body,
        editPasswordSuccess,
        editPasswordError
      )
    );
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

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
                onSubmit={editPasswordHandler}
              >
                <div className={styles["wrapper-input"]}>
                  {emptyForm ? (
                    <i className={`bi bi-lock ${styles.icon}`}></i>
                  ) : (
                    <i
                      className={`bi bi-lock ${styles.icon} ${styles.blue}`}
                    ></i>
                  )}
                  <input
                    className={styles.input}
                    type={pwdShown ? "text" : "password"}
                    placeholder="Current password"
                    name="oldPassword"
                    required
                    onClick={() => setSimilarity1(false)}
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${pwdShown ? `bi-eye-slash` : `bi-eye`} ${
                      styles.icon
                    }`}
                    onClick={() => setPwdShown(!pwdShown)}
                  ></i>
                </div>
                <div className={styles["wrapper-input"]}>
                  {emptyForm ? (
                    <i className={`bi bi-lock ${styles.icon}`}></i>
                  ) : (
                    <i
                      className={`bi bi-lock ${styles.icon} ${styles.blue}`}
                    ></i>
                  )}
                  <input
                    className={styles.input}
                    type={pwdShown1 ? "text" : "password"}
                    placeholder="New password"
                    name="newPassword"
                    required
                    onClick={() => setSimilarity2(false)}
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${pwdShown1 ? `bi-eye-slash` : `bi-eye`} ${
                      styles.icon
                    }`}
                    onClick={() => setPwdShown1(!pwdShown1)}
                  ></i>
                </div>
                <div className={styles["wrapper-input"]}>
                  {emptyForm ? (
                    <i className={`bi bi-lock ${styles.icon}`}></i>
                  ) : (
                    <i
                      className={`bi bi-lock ${styles.icon} ${styles.blue}`}
                    ></i>
                  )}
                  <input
                    className={styles.input}
                    type={pwdShown2 ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Repeat password"
                    required
                    onClick={() => setSimilarity2(false)}
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${pwdShown2 ? `bi-eye-slash` : `bi-eye`} ${
                      styles.icon
                    }`}
                    onClick={() => setPwdShown2(!pwdShown2)}
                  ></i>
                </div>
                <p
                  className={`${styles["password-notif"]} ${
                    !similarity1 ? styles["show"] : styles["hide"]
                  }`}
                >
                  Your new password cannot be the same as your old password!
                </p>
                <p
                  className={`${styles["password-notif"]} ${
                    similarity2 ? styles["hide"] : styles["show"]
                  }`}
                >
                  Retyped password didn&apos;t match!
                </p>
                {isLoading ? (
                  <div className={`${styles.btn}`}>
                    <Loading />
                  </div>
                ) : (
                  <button
                    className={`${styles.btn}`}
                    type="submit"
                    disabled={emptyForm}
                  >
                    <p>Login</p>
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

export default ChangePassword;
