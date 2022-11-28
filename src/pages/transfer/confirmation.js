import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import styles from "styles/Confirmation.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Button from "src/Components/Button";
import { currency } from "../../helper/currency";
import Modal from "src/Components/ModulPin";

import image from "assets/default-img.png";

function Confirmation() {
  const transferData = useSelector((state) => state.transfer.transferData);
  const { receiverData } = transferData;
  const userBalance = useSelector((state) => state.user.profile.balance);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  const [open, setOpen] = useState(false);
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
                        src={`${link}/${receiverData?.image}` || image}
                        alt="img"
                        width={70}
                        height={70}
                        style={{ borderRadius: "10px" }}
                      ></Image>
                    </div>
                    <div className={styles["data-user"]}>
                      <p className={styles.name}>{`${receiverData?.firstName} ${receiverData?.lastName}`}</p>
                      <p className={styles.phone}>{receiverData?.noTelp}</p>
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
                  <p className={styles.text2}>{`Rp. ${currency(
                  transferData.amount
                )}`}</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Balance Left</p>
                  <p className={styles.text2}>{`Rp. ${currency(
                  userBalance - transferData.amount
                )}`}</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Date & Time</p>
                  <p className={styles.text2}>{Date(transferData.date)}</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Notes</p>
                  <p className={styles.text2}>{transferData.notes || "-"}</p>
                </div>
              </div>
              <div className={styles["wrapper-button"]}>
                <Button text="Continue" variant="continue" onClick={() => setOpen(true)} />
              </div>
            </div>
          </section>
        </section>
        <Footer />
        <Modal
        open={open}
        setOpen={setOpen}
        amount={transferData.amount}
        notes={transferData.notes}
        receiverId={receiverData?.id}
      />
      </main>
    </div>
  );
}

export default Confirmation;
