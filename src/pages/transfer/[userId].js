import React from "react";

import Image from "next/image";
import styles from "../../styles/InputAmount.module.css";
import Layout from "../../component/Layout";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Sidebar from "../../component/Sidebar";

import Profile from "../../assets/profile3.png";
import Edit from "../../assets/edit-2.png";
import Button from "../../component/Button";

function home() {
  return (
    <div className={styles.container}>
      <Layout title="Search Receiver"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-receiver"]}>
              <div className={styles.title}>
                <p>Transfer Money</p>
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

              <p className={styles.instruction}>
                Type the amount you want to transfer and then <br /> press
                continue to the next steps.
              </p>

              <div className={`${styles["wrapper-transfer"]} ${styles.flex}`}>
                <div className={styles.nominal}>0.00</div>
                <div className={styles.saldo}>Rp120.000 Available</div>
                <div className={styles.edit}>
                  <Image src={Edit} alt="edit"></Image>
                  <input className={styles.input} type="text" placeholder="Add some note"></input>
                </div>
              </div>

              <div className={styles["wrapper-button"]}>
                <Button text="Continue" variant="continue"/>
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
