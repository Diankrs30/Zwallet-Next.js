import React from "react";

import Image from "next/image";
import styles from "../../styles/Confirmation.module.css";
import Layout from "../../component/Layout";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Sidebar from "../../component/Sidebar";
import Button from "../../component/Button";

import Profile from "../../assets/profile3.png";
import Edit from "../../assets/edit-2.png";

function home() {
  return (
    <div className={styles.container}>
      <Layout title="Confirmation"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-receiver"]}>
              <div className={styles.title}>
                <p>Transfer To</p>
              </div>

              <div className={styles["wrapper-user"]}>
                <div className={`${styles["card-user"]} ${styles.flex}`}>
                  <div className={`${styles["info-user"]} ${styles.flex}`}>
                    <div className={styles["img-user"]}>
                      <Image
                        src={Profile}
                        alt="img"
                        width="56px"
                        height="56px"
                      ></Image>
                    </div>
                    <div className={styles["data-user"]}>
                      <p className={styles.name}>Robert Chandler</p>
                      <p className={styles.phone}>+62 813-8492-9994</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p>Details</p>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Amount</p>
                  <p className={styles.text2}>Rp100.000</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Balance Left</p>
                  <p className={styles.text2}>Rp20.000</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Date & Time</p>
                  <p className={styles.text2}>May 11, 2020 - 12.20</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Notes</p>
                  <p className={styles.text2}>For buying some socks</p>
                </div>
              </div>
              <div className={styles["wrapper-button"]}>
                <Button text="Continue" variant="continue" />
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default home;
