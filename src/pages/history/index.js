import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import historyAction from "../../redux/actions/history";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/History.module.css";
import Layout from "src/pages/Components/Layout";
import Header from "src/pages/Components/Header";
import Footer from "src/pages/Components/Footer";
import Sidebar from "src/pages/Components/Sidebar";

import image from "assets/default-img.png";

function History() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.userData);
  const dataHistory = useSelector((state) => state.history.history);
  const getHistory = () => {
    const param = {
      page: 1,
      per_page: 6,
      filter: "MONTH",
    };
    dispatch(historyAction.getHistoryThunk(param, auth.token));
  };
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  const rupiah = (number) => {
    return (
      "Rp " +
      parseFloat(number)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  useEffect(() => {
    getHistory();
  }, []);
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
                  <input
                    className={styles.filter}
                    type="text"
                    placeholder="--Select Filter--"
                  ></input>
                </div>
              </div>
              <div className={styles["wrapper-user"]}>
                {dataHistory.length > 0 &&
                  dataHistory.map((item, idx) => (
                    <div
                      className={`${styles["card-user"]} ${styles.flex}`}
                      key={idx}
                    >
                      <div className={`${styles["info-user"]} ${styles.flex}`}>
                        <div className={styles["img-user"]}>
                        <Image
                              src={
                                item.image !== null
                                  ? `${link}/${item.image}`
                                  : image
                              }
                              width={56}
                              height={56}
                              quality={56}
                              alt="foto-profile"
                              styles={{ borderRadius: "10px" }}
                            />
                        </div>
                        <div className={styles["data-user"]}>
                          <p
                            className={styles.name}
                          >{`${item.firstName} ${item.lastName}`}</p>
                          <p className={styles.status}>{item.status}</p>
                        </div>
                      </div>
                      <div className={styles.amount}>
                        {" "}
                        <div
                          className={
                            item.type === "send"
                              ? styles["amount-send"]
                              : styles["amount-receive"]
                          }
                        >
                          {item.type === "topup"
                            ? "+ " + rupiah(item.amount)
                            : "- " + rupiah(item.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default History;
