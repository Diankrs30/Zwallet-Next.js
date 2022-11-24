import React from "react";

import styles from "../../styles/Pin.module.css";
import Button from "../../component/Button";
import Layout from "../../component/Layout";
import SidebarAuth from "../../component/SidebarAuth";

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
            Secure Your Account, Your Wallet,<br/> and Your Data With 6 Digits PIN<br/>
            That You Created Yourself.
          </p>
          <p className={styles.text2}>
          Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don&#39;t tell anyone about your FazzPay account password and the PIN.
          </p>
          <form className={styles.submitPin}>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
            </div>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
            </div>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
            </div>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
            </div>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
            </div>
            <div className={styles.pin}>
              <input className={styles.inputPin} type="number"></input>
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
