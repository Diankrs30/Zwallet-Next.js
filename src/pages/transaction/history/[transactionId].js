import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import historyAction from "src/redux/actions/history";

import Image from "next/image";
import styles from "styles/Success.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import Button from "components/Button";
import { currency } from "src/helper/currency";

import Profile from "assets/profile3.png";
import Donwload from "assets/download.png";
import Success from "assets/success.svg";
import Failed from "assets/failed.svg";
import image from "assets/default-img.png";

function TransactionSuccess() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userData);
  const transferResult = useSelector((state) => state.transfer.transferResult);
  const { status, data } = transferResult;
  const transferData = useSelector((state) => state.transfer.transferData);
  const userBalance = useSelector((state) => state.user.profile.balance);
  const { receiverData } = transferData;
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  
  console.log(router.query);
  const id = router.query.transactionId ?? "";
  console.log("apaaaa", id)

  const transactionDate = () => {
    const arrbulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const date = new Date();
    const detik = date.getSeconds();
    const menit = date.getMinutes();
    const jam = date.getHours();
    const hari = date.getDay();
    const tanggal = date.getDate();
    const bulan = date.getMonth();
    const tahun = date.getFullYear();
    return `${arrbulan[bulan]} ${tanggal} , ${tahun} - ${jam}:${menit}:${detik} `;
  };

  const getHistoryById = () => {;
    if (id) {
      dispatch(historyAction.getHistoryByIdThunk(id, auth.token));
    }
  };

  useEffect(() => {
    getHistoryById();
  }, []);

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
              {status === 200 ? (
                <div className={styles["status-success"]}>
                  <Image src={Success} alt="success" width={70} height={70} />
                  <p className={styles.status}>Transfer Success</p>
                </div>
              ) : (
                <div className={styles["status-failed"]}>
                  <Image src={Failed} alt="success" width={70} height={70} />
                  <p className={styles.status}>Transfer Failed</p>
                  <p className={styles["description-status"]}>
                    We can&#39;t transfer your money at the moment, we recommend
                    you to check your <br /> internet connection and try again.
                  </p>
                </div>
              )}

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
                  <p className={styles.text2}>{transactionDate()}</p>
                </div>
              </div>
              <div className={styles["wrapper-card"]}>
                <div className={styles["card-confirmation"]}>
                  <p className={styles.text1}>Notes</p>
                  <p className={styles.text2}>{transferData.notes}</p>
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
                        src={
                          receiverData?.image === null
                            ? image
                            : `${link}/${receiverData?.image}`
                        }
                        alt="img"
                        width={70}
                        height={70}
                      ></Image>
                    </div>
                    <div className={styles["data-user"]}>
                      <p
                        className={styles.name}
                      >{`${receiverData?.firstName} ${receiverData?.lastName}`}</p>
                      <p className={styles.phone}>{receiverData?.noTelp}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {status === 200 ? (
                  <div className={styles["wrapper-button-success"]}>
                    <div className={styles["btn-download"]}>
                      <Image
                        src={Donwload}
                        alt="img"
                        width="22px"
                        height="22px"
                      ></Image>
                      <p>Download</p>
                    </div>
                    <Button
                      text="Back to Home"
                      variant="back"
                      onClick={() => {
                        router.push(`/dashboard/${auth.id}`);
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles["wrapper-button-failed"]}>
                    <Button
                      text="Try It Again"
                      variant="try"
                      onClick={() => {
                        router.push(`/dashboard/${auth.id}`);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default TransactionSuccess;
