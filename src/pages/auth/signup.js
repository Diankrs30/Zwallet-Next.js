import React from "react";

import Image from "next/image";
import styles from "../../styles/Signup.module.css";
import Button from "../../component/Button";
import Layout from "../../component/Layout";
import SidebarAuth from "../../component/SidebarAuth";

import mail from "../../assets/mail.png";
import lock from "../../assets/lock.png";
import eyeSlash from "../../assets/eye-crossed.png";
import person from "../../assets/person.png";

function signup() {
  return (
    <div className={styles.container}>
      <Layout title="Sign Up"></Layout>
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
              <Image src={person} alt="mail" />
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Enter your first name"
              ></input>
            </div>
            <div className={`${styles.formLogin} ${styles.flex}`}>
              <Image src={person} alt="lock" />
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Enter your last name"
              ></input>
            </div>
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
          <div className={styles.btn}>
            <Button text="Sign Up" variant="pageLogin" />
          </div>
          <p className={styles.confirmation}>
            Don&#39;t have an account? Let&#39;s{" "}
            <span className={styles.textSpan}>Login</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default signup;
