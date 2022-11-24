import React from "react";

import Image from "next/image";
import styles from "../../styles/Forgot_password.module.css";
import Button from "../../component/Button";
import Layout from "../../component/Layout";
import SidebarAuth from "../../component/SidebarAuth";

import mail from "../../assets/mail.png";

function pin() {
  return (
    <div className={styles.container}>
      <Layout title="Pin"></Layout>
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
              <Image src={mail} alt="mail" />
              <input
                className={styles.inputLogin}
                type="text"
                placeholder="Enter your e-mail"
              ></input>
            </div>
          </form>
          <div className={styles.btn}>
            <Button text="Confirm" variant="pageLogin" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default pin;
