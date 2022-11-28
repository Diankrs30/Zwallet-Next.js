import React from "react";

import Image from "next/image";
import styles from "styles/ChangePassword.module.css";
import Layout from "src/pages/Components/Layout";
import Header from "src/pages/Components/Header";
import Footer from "src/pages/Components/Footer";
import Sidebar from "src/pages/Components/Sidebar";
import Button from "src/pages/Components/Button";

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
                <p>Change Password</p>
              </div>
              <div className={styles.information}>
                <p className={styles.text1}>
                  You must enter your current password and then type your new
                  password twice.
                </p>
              </div>
              <form className={styles["form-input"]}>
                <div className={styles["wrapper-input"]}>
                  <i className={`bi bi-lock ${styles.icon}`}></i>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Current password"
                  ></input>
                  <i className={`bi bi-eye ${styles.icon}`}></i>
                </div>
                <div className={styles["wrapper-input"]}>
                  <i className={`bi bi-lock ${styles.icon}`}></i>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="New password"
                  ></input>
                  <i className={`bi bi-eye ${styles.icon}`}></i>
                </div>
                <div className={styles["wrapper-input"]}>
                  <i className={`bi bi-lock ${styles.icon}`}></i>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Repeat password"
                  ></input>
                  <i className={`bi bi-eye ${styles.icon}`}></i>
                </div>
                <Button text="Change Password" variant="change-password"></Button>
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
