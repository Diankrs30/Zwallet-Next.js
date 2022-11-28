import React from "react";

import Image from "next/image";
import styles from "styles/Success.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Button from "components/Button";

import Profile from "assets/profile3.png";
import Donwload from "assets/download.png";
import Success from "assets/success.svg";
import Failed from "assets/failed.svg";

function home() {
  return (
    <div className={styles.container}>
      <Layout title="confirmation"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-receiver"]}>
              <div className={styles["status-success"]}>
                <Image src={Success} alt="success" width="70px" height="70px" />
                <p className={styles.status}>Transfer Success</p>
              </div>
              <div className={styles["status-failed"]}>
                <Image src={Failed} alt="success" width="70px" height="70px" />
                <p className={styles.status}>Transfer Failed</p>
                <p className={styles["description-status"]}>
                  We can&#39;t transfer your money at the moment, we recommend
                  you to check your <br /> internet connection and try again.
                </p>
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
                        width="70px"
                        height="70px"
                      ></Image>
                    </div>
                    <div className={styles["data-user"]}>
                      <p className={styles.name}>Robert Chandler</p>
                      <p className={styles.phone}>+62 813-8492-9994</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["wrapper-button-success"]}>
                <buton className={styles["btn-download"]}>
                  <Image
                    src={Donwload}
                    alt="img"
                    width="22px"
                    height="22px"
                  ></Image>
                  <p>Download</p>
                </buton>
                <Button text="Back to Home" variant="back" />
              </div>
              <div className={styles["wrapper-button-failed"]}>
                <Button text="Try It Again" variant="try" />
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
