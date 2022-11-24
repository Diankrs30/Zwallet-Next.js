import React from "react";

import Image from "next/image";
import Button from "../../component/Button";
import Layout from "../../component/Layout";
import SidebarAuth from "../../component/SidebarAuth";
import styles from "../../styles/Login.module.css";

import mail from "../../assets/mail.png";
import lock from "../../assets/lock.png";
import eyeSlash from "../../assets/eye-crossed.png";

function login() {
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
          <form className={styles.login}>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image src={mail} alt="mail" />
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Enter your e-mail"
              ></input>
            </div>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image src={lock} alt="lock" />
              <input
                className={styles.inputLogin}
                type="password"
                placeholder="Enter your password"
              ></input>
              <Image src={eyeSlash} alt="password" />
            </div>
          </form>
          <div className={styles.forgotPwd}>
            <p>Forgot password?</p>
          </div>
          <Button text="Login" variant="pageLogin" />
          <p className={styles.confirmation}>Don&#39;t have an account? Let&#39;s <span className={styles.textSpan}>Sign Up</span></p>
        </section>
      </main>
    </div>
  );
}

export default login;
