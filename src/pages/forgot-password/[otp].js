import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import authAction from "src/redux/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import styles from "styles/Forgot_password.module.css";
import Layout from "src/pages/Components/Layout";
import SidebarAuth from "src/pages/Components/SidebarAuth";

import lock from "assets/lock.png";
import eyeSlash from "assets/eye-crossed.png";
import eye from "assets/eye.png";

function ForgotPassword() {
  const dispatct = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [isPwdNewShown, setIsPwdNewShown] = useState(false);
  const [isPwdConfirmShown, setIsPwdConfirmShown] = useState(false);
  const [notMatched, setNotMatched] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({
    keysChangePassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const checkEmptyForm = (body) => {
    if (!body.newPassword || !body.confirmPassword) return setEmptyForm(true);
    body.newPassword && body.confirmPassword && setEmptyForm(false);
  };

  const changeHandler = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
      keysChangePassword: router.query.otp,
    });
  };

  const resetSuccess = () => {
    toast.success("Success! Password has been change.");
    router.push("/auth/login");
  };

  const resetDenied = () => {
    toast.error(`${auth.error}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.newPassword !== body.confirmPassword) return setNotMatched(true);
    dispatct(authAction.resetThunk(body, resetSuccess, resetDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
  }, [auth]);

  return (
    <div className={styles.container}>
      <Layout title="Reset Password"></Layout>
      <main className={`${styles["main-content"]} ${styles.flex}`}>
        <aside className={styles.aside}>
          <SidebarAuth></SidebarAuth>
        </aside>
        <section className={styles.content}>
          <p className={styles.text}>
            Did You Forgot Your Password? <br />
            Don&#39;t Worry, You Can Reset Your <br />
            Password In a Minutes.
          </p>
          <p className={styles.text2}>
            To reset your password, you must type your e-mail and we will send a
            link to your email and you will be directed to the reset password
            screens.
          </p>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image
                className={styles.icon}
                src={lock}
                alt="lock"
                width={24}
                heigth={24}
              />
              <input
                className={styles.inputLogin}
                type={isPwdNewShown ? "text" : "password"}
                name="newPassword"
                placeholder="Enter your new password"
                required
                onChange={changeHandler}
                onClick={() => setNotMatched(false)}
              ></input>
              <Image
                className={styles.icon}
                src={isPwdNewShown ? eye : eyeSlash}
                alt="password"
                width={24}
                heigth={24}
                onClick={() => setIsPwdNewShown(!isPwdNewShown)}
              />
            </div>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image
                className={styles.icon}
                src={lock}
                alt="lock"
                width={24}
                heigth={24}
              />
              <input
                className={styles.inputLogin}
                type={isPwdConfirmShown ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Enter your confirm password"
                onChange={changeHandler}
                onClick={() => setNotMatched(false)}
              ></input>
              <Image
                className={styles.icon}
                src={isPwdConfirmShown ? eye : eyeSlash}
                alt="password"
                width={24}
                heigth={24}
                onClick={() => setIsPwdConfirmShown(!isPwdConfirmShown)}
              />
            </div>
            <p
              className={`${styles["notif-password"]} ${
                notMatched ? styles["show"] : styles["hide"]
              }`}
            >
              Password did not matched! Please retype your password.
            </p>
            <button
              className={`${styles.btn}`}
              type="submit"
              disabled={emptyForm}
            >
              Reset Password
            </button>
          </form>
          <p className={styles.confirmation}>
            Back to{" "}
            <Link href={"/auth/login"}>
              <span className={styles.textSpan}>Login</span>
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
