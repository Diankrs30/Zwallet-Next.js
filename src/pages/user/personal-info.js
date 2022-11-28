import React from "react";

// import Image from "next/image";
import styles from "styles/PersonalInfo.module.css";
import Layout from "src/pages/Components/Layout";
import Header from "src/pages/Components/Header";
import Footer from "src/pages/Components/Footer";
import Sidebar from "src/pages/Components/Sidebar";
// import Button from "components/Button";

// import Profile from "assets/profile3.png";
// import Edit from "assets/edit-2.png";

function home() {
  return (
    <div className={styles.container}>
      <Layout title="Profile"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-receiver"]}>
              <div className={styles.title}>
                <p>Personal Information</p>
              </div>
              <div className={styles.information}>
                <p className={styles.text1}>
                  We got your personal information from the sign up proccess. If
                  you want to make changes on your information, contact our
                  support.
                </p>
              </div>

              <div className={styles["wrapper-card"]}>
                <div className={styles["card-info-user"]}>
                  <p className={styles.text1}>First Name</p>
                  <p className={styles.text2}>Robert</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-info-user"]}>
                  <p className={styles.text1}>Last Name</p>
                  <p className={styles.text2}>Chandler</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-info-user"]}>
                  <p className={styles.text1}>Verified E-mail</p>
                  <p className={styles.text3}>pewdiepie1@gmail.com</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-info-user"]}>
                  <div className={styles["info-phone"]}>
                    <div>
                      <p className={styles.text1}>Phone Number</p>
                      <p className={styles.text2}>+62 813-9387-7946</p>
                    </div>
                    <div className={styles.manage}>
                      <p>Manage</p>
                    </div>
                  </div>
                </div>
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
