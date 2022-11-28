import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../../redux/actions/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import Layout from "src/Components/Layout";
import SidebarAuth from "src/Components/SidebarAuth";
import styles from "styles/Login.module.css";

import mail from "assets/mail.png";
import lock from "assets/lock.png";
import eyeSlash from "assets/eye-crossed.png";
import eye from "assets/eye.png";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [body, setBody] = useState({});
  const [isPwdShown, setIsPwdShown] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const checkEmptyForm = (body) => {
    if (isLoading || !body.email || !body.password) return setEmptyForm(true);
    body.email && body.password && setEmptyForm(false);
  };

  console.log(body);

  const loginSuccess = (data) => {
    console.log(">>>>>>>>>>>>> callbackSuccess", data.data.pin);
    if (data.data.pin === null) {
      toast.success("Login succes! Please create your pin fisrt")
      router.push("/create-pin");
    } else {
      toast.success("Login succes!")
    router.push("/dashboard");
    }
  };

  const loginDenied = () => {
    toast.error(`Login failed! ${auth.error}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("mmmmmmmmm");

    dispatch(authAction.loginThunk(body, loginSuccess, loginDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  return (
    <div className={styles.container}>
      <Layout title="Login"></Layout>
      <main className={`${styles["main-content"]} ${styles.flex}`}>
        <aside className={styles.aside}>
          <SidebarAuth></SidebarAuth>
        </aside>
        <section className={styles.content}>
          <p className={styles.text}>
            Start Accessing Banking Needs <br /> All Devices and All Platforms{" "}
            <br />
            With 30.000+ Users
          </p>
          <p className={styles.text2}>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
          <form className={styles.login} onSubmit={handleSubmit}>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image src={mail} alt="mail" />
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
              <Image src={lock} alt="lock" />
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
            <div className={styles.forgotPwd}>
              <Link href={"/forgot-password"}>Forgot password?</Link>
            </div>
            <button
              className={`${styles.btn}`}
              type="submit"
              disabled={emptyForm}
            >
              Login
            </button>
          </form>
          <p className={styles.confirmation}>
            Don&#39;t have an account? Let&#39;s{" "}
            <Link href={"/auth/register"}>
              <span className={styles.textSpan}>Sign Up</span>
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
