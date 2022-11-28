import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../../redux/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/Register.module.css";
import Layout from "components/Layout";
import SidebarAuth from "components/SidebarAuth";

import mail from "assets/mail.png";
import lock from "assets/lock.png";
import eyeSlash from "assets/eye-crossed.png";
import eye from "assets/eye.png";
import person from "assets/person.png";

function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [body, setBody] = useState({});
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const isLoading = useSelector((state) => state.auth.isLoading);
  // console.log(body);

  const checkEmptyForm = (body) => {
    if (
      isLoading ||
      !body.email ||
      !body.firstName ||
      !body.lastName ||
      !body.password
    )
      return setEmptyForm(true);
    body.email &&
      body.firstName &&
      body.lastName &&
      body.password &&
      setEmptyForm(false);
  };

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  // console.log(body);

  const handleSubmit = (e) => {
    e.preventDefault();

    const registerSuccess = () => {
      toast.success(
        "Register success! Please check your email to verify your account"
      );
      router.push("/auth/login");
    };

    const registerDenied = () => {
      // console.log(auth.error);
      toast.error(`${auth.error}`);
    };

    dispatch(authAction.registerThunk(body, registerSuccess, registerDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  return (
    <div className={styles.container}>
      <Layout title="Sign Up"></Layout>
      <main className={`${styles["main-content"]} ${styles.flex}`}>
        <aside className={styles.aside}>
          <SidebarAuth></SidebarAuth>
        </aside>
        <section className={styles.content}>
          <p className={styles.text}>
            Start Accessing Banking Needs All Devices and All Platform With
            30.000+ Users
          </p>
          <p className={styles.text2}>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image
                className={styles.icon}
                src={person}
                alt="mail"
                width={24}
                heigth={24}
              />
              <input
                className={styles.inputLogin}
                type="text"
                name="firstName"
                required
                placeholder="Enter your first name"
                onChange={changeHandler}
              ></input>
            </div>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image
                className={styles.icon}
                src={person}
                alt="lock"
                width={24}
                heigth={24}
              />
              <input
                className={styles.inputLogin}
                type="text"
                name="lastName"
                required
                placeholder="Enter your last name"
                onChange={changeHandler}
              ></input>
            </div>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image
                className={styles.icon}
                alt="mail"
                src={mail}
                width={24}
                heigth={24}
              />
              <input
                className={styles.inputLogin}
                type="text"
                name="email"
                required
                placeholder="Enter your e-mail"
                onChange={changeHandler}
              ></input>
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
                placeholder="Enter your password"
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
            <button
              className={`${styles.btn}`}
              type="submit"
              disabled={emptyForm}
            >
              Sign Up
            </button>
          </form>
          <p className={styles.confirmation}>
            Don&#39;t have an account? Let&#39;s{" "}
            <Link href={"/auth/login"}>
              <span className={styles.textSpan}>Login</span>
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;
