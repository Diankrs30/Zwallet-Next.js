import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import authAction from "src/redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import styles from "styles/Forgot_password.module.css";
import Button from "components/Button";
import Layout from "components/Layout";
import SidebarAuth from "components/SidebarAuth";

import lock from "assets/lock.png";
import eyeSlash from "assets/eye-crossed.png";
import eye from "assets/eye.png";

function ForgotPassword() {
  const dispatct = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({
    linkDirect: "http://localhost:3000/auth/forgo-passwordt/",
  });

  const forgotSuccess = () => {
    toast.success("Success! Please check your email to reset your password.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const forgotDenied = () => {
    toast.error(`${auth.error}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const changeHandler = (e) => {
    e.preventDefault();
    dispatct(authAction.forgotThunk(body, forgotSuccess, forgotDenied));
  };

  const checkEmptyForm = (body) => {
    if (!body.email) return setEmptyForm(true);
    body.mail && setEmptyForm(false)
  }

  useEffect(() => {
    checkEmptyForm(body);
  }, [body])

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
  }, [auth]);
  

  return (
    <div className={styles.container}>
      <Layout title=""></Layout>
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
          <form className={styles.login}>
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
                type={isPwdShown ? "text" : "password"}
                name="password"
                required
                placeholder="Create new password"
                onChange={changeHandler}
              ></input>
              <Image
                className={styles.icon}
                src={isPwdShown ? eye : eyeSlash}
                alt="password"
                width={24}
                heigth={24}
                onClick={() => setIsPwdShown(!isPwdShown)}
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
                type={isPwdShown ? "text" : "password"}
                name="password"
                required
                placeholder="Create new password"
                onChange={changeHandler}
              ></input>
              <Image
                className={styles.icon}
                src={isPwdShown ? eye : eyeSlash}
                alt="password"
                width={24}
                heigth={24}
                onClick={() => setIsPwdShown(!isPwdShown)}
              />
            </div>
          </form>
          <button
            className={`${styles.btn}`}
            type="submit"
            disabled={emptyForm}
          >
            Confirm
          </button>
        </section>
      </main>
    </div>
  );
}

export default ForgotPassword;
