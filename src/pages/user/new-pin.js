import React from "react";

import Image from "next/image";
import styles from "styles/ChangePin.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Button from "components/Button";

import Profile from "assets/profile3.png";
import Edit from "assets/edit-2.png";

function home() {
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
                <p>Change PIN</p>
              </div>
              <div className={styles.information}>
                <p className={styles.text1}>
                Type your new 6 digits security PIN to use in Fazzpay.
                </p>
              </div>
              <form className={styles.submitPin}>
                <div className={styles["wrapper-pin"]}>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                  <div className={styles.pin}>
                    <input className={styles.inputPin} type="password"></input>
                  </div>
                </div>
                <Button text="Change PIN" variant="change-password"></Button>
              </form>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default home;
