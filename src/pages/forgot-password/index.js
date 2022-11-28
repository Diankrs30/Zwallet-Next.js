import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import authAction from "src/redux/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import styles from "styles/Forgot_password.module.css";
import Button from "components/Button";
import Layout from "components/Layout";
import SidebarAuth from "components/SidebarAuth";

import mail from "assets/mail.png";

function ForgotPassword() {
  const dispatct = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  // const isLoading = useSelector((state) => state.auth.isLoading);
  const [body, setBody] = useState({
    linkDirect: "http://localhost:3000/forgot-password/",
  });
  const [emptyForm, setEmptyForm] = useState(true);

  const checkEmptyForm = (body) => {
    if (!body.email) return setEmptyForm(true);
    body.email && setEmptyForm(false);
  };

  const changeHandler = (e) => {
    setBody({ ...body, email : e.target.value });
  };

  console.log(body);

  const handleSubmit = (e) => {
    e.preventDefault();

    const forgotSuccess = () => {
      toast.success("Success! Please check your email to reset your password.");
    };
  
    const forgotDenied = () => {
      toast.error(`${auth.error}`);
    };
    // console.log("mmmmmmmmm");
    dispatct(authAction.forgotThunk(body, forgotSuccess, forgotDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
  }, [auth]);

  return (
    <div className={styles.container}>
      <Layout title="Forgot Password"></Layout>
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
              <Image src={mail} alt="mail" />
              <input
                className={styles.inputLogin}
                type="text"
                name="email"
                placeholder="Enter your e-mail"
                required
                onChange={changeHandler}
              ></input>
            </div>
            <button
              className={`${styles.btn}`}
              type="submit"
              disabled={emptyForm}
            >
              Confirm
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
