import React from "react";

import Image from "next/image";
import styles from "styles/History.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";

import Profile from "assets/profile2.png";

function home() {
  return (
    <div className={styles.container}>
      <Layout title="History"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-history"]}>
              <div className={`${styles["wrapper-title"]} ${styles.flex}`}>
                <div className={styles.title}>
                  <p>Transaction History</p>
                </div>
                <div className={styles["wrapper-filter"]}>
                  <input className={styles.filter} type="text"placeholder="--Select Filter--"></input>
                </div>
              </div>
              <div className={styles["wrapper-user"]}>
                  <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                      <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
                  </div>
                  <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                        <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
                  </div>
                  <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                      <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
                  </div>
                  <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                      <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
                  </div>
                </div>
                <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                      <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
                  </div>
                  <div className={`${styles["card-user"]} ${styles.flex}`}>
                    <div className={`${styles["info-user"]} ${styles.flex}`}>
                      <div className={styles["img-user"]}>
                      <Image src={Profile} alt="img" width="56px" height="56px"></Image>
                      </div>
                      <div className={styles["data-user"]}>
                        <p className={styles.name}>Robert Chandler</p>
                        <p className={styles.status}>Accept</p>
                      </div>
                    </div>
                    <div className={styles.amount}>+Rp50.000</div>
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
