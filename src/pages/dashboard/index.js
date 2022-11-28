import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/user";
import historyAction from "../../redux/actions/history";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/Dashboard.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";

import image from "assets/default-img.png";

function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth.userData);
  const dataHistory = useSelector((state) => state.history.history);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  console.log('>>>>>>>>>>>>>>>',dataHistory);

  const getUserById = () => {
    dispatch(userAction.getUserByIdThunk(auth.id, auth.token));
  };

  const getHistory = () => {
    const param = {
      page: 1,
      per_page: 4,
      filter: "MONTH",
    };
    dispatch(historyAction.getHistoryThunk(param, auth.token));
  };

  // const getHistoryById = () => {
  //   dispatch(historyAction.getHistoryByIdThunk(auth.id))
  // }

  const rupiah = (number) => {
    return (
      "Rp " +
      parseFloat(number)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  useEffect(() => {
    getUserById();
    getHistory();
  }, []);

  return (
    <div className={styles.container}>
      <Layout title="Dashboard"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <section className={`${styles.balance} ${styles.flex}`}>
              <div className={`${styles["wrapper-text"]} ${styles.flex}`}>
                <p className={styles.text1}>Balance</p>
                <p className={styles.text2}>{rupiah(profile.balance?? 0)}</p>
                <p className={styles.text3}>{profile.noTelp?? "-"}</p>
              </div>
              <div className={`${styles.button} ${styles.flex}`}>
                <button
                  className={styles.btn}
                  onClick={() => router.push("/transfer")}
                >
                  <i className={`fa-solid fa-arrow-up ${styles.icon}`}></i>
                  <span className={styles.text4}>Transfer</span>
                </button>
                <button className={styles.btn}>
                  <i className={`fa-solid fa-plus ${styles.icon}`}></i>
                  <span className={styles.text4}>Top Up</span>
                </button>
              </div>
            </section>
            <section className={`${styles["wrapper-content"]} ${styles.flex}`}>
              <div className={styles["wrapper-chart"]}>
                <div className={`${styles.resume} ${styles.flex}`}>
                  <div className={styles.incoming}>
                    <i
                      className={`fa-solid fa-arrow-down ${styles["icon-incoming"]}`}
                    ></i>
                    <p className={styles.status}>Income</p>
                    <p className={styles.text5}>Rp 2.120.000</p>
                  </div>
                  <div className={styles.expense}>
                    <i
                      className={`fa-solid fa-arrow-up ${styles["icon-expense"]}`}
                    ></i>
                    <p className={styles.status}>Expense</p>
                    <p className={styles.text5}>Rp 1.560.000</p>
                  </div>
                </div>
              </div>
              <div className={styles["history-transaction"]}>
                <div className={styles.history}>
                  <div className={`${styles.title2} ${styles.flex}`}>
                    <p className={styles.text5}>Transaction History</p>
                    <Link href="/history" passHref>
                      <p className={styles.text6}>See all</p>
                    </Link>
                  </div>
                </div>
                <div className={styles["wrapper-user"]}>
                  {
                    dataHistory.length > 0 &&
                    dataHistory.map((item, idx) => (
                      <div className={`${styles["card-user"]} ${styles.flex}`} key={idx} >
                        <div
                          className={`${styles["info-user"]} ${styles.flex}`}
                        >
                          <div className={styles["img-user"]}>
                          <Image
                            src={item.image !== null ? `${link}/${item.image}` : image} 
                            width={56}height={56} quality={56} alt="foto-profile"
                            // alt="img"
                            // width="56px"
                            // height="56px"
                          />
                          </div>
                          <div className={styles["data-user"]}>
                            <p className={styles.name}>{item.firstName}</p>
                            <p className={styles.status}>{item.status}</p>
                          </div>
                        </div>
                        <div className={styles.amount}>{item.type === "topup" ? "+ " + item.amount  : "- " + item.amount}</div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default Dashboard;
