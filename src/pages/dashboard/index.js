import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/user";
import historyAction from "../../redux/actions/history";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "src/pages/Components/ModalTopUp";
import getDashboardAction from "src/redux/actions/dashboard";
import { currency } from "src/helper/currency";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Image from "next/image";
import styles from "styles/Dashboard.module.css";
import Layout from "src/pages/Components/Layout";
import Header from "src/pages/Components/Header";
import Footer from "src/pages/Components/Footer";
import Sidebar from "src/pages/Components/Sidebar";

import image from "assets/default-img.png";

function Dashboard() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const dispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth.userData);
  const dataHistory = useSelector((state) => state.history.history);
  // const allState = useSelector((state) => state);
  // const { dataDashboard } = allState.getDashboard;
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  const [showModal, setShowModal] = useState(false);
  const statistic = useSelector((state) => state.getDashboard.data);

  const modalHandler = () => setShowModal(!showModal);

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

  const rupiah = (number) => {
    return (
      "Rp " +
      parseFloat(number)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const incomeData = {
    label: "Income",
    data: statistic.listIncome
      ? [
          statistic.listIncome[5].total,
          statistic.listIncome[6].total,
          statistic.listIncome[0].total,
          statistic.listIncome[1].total,
          statistic.listIncome[2].total,
          statistic.listIncome[3].total,
          statistic.listIncome[4].total,
        ]
      : [],
    backgroundColor: "#6379F4",
  };

  const expenseData = {
    label: "Expense",
    data: statistic.listExpense
      ? [
          statistic.listExpense[5].total,
          statistic.listExpense[6].total,
          statistic.listExpense[0].total,
          statistic.listExpense[1].total,
          statistic.listExpense[2].total,
          statistic.listExpense[3].total,
          statistic.listExpense[4].total,
        ]
      : [],
    backgroundColor: "#9DA6B5",
  };

  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };

  const chartOptions = {
    maintainAspecRatio: false,
    legend: { display: true },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        display: false,
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        gridLines: {},
      },
    },
    plugins: {
      tooltip: {
        usePointStyle: true,
        enabled: true,
      },
    },
    hover: {
      mode: "nearest",
      intersec: true,
    },
    responsive: true,
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };

  const getDasboard = () => {
    dispatch(getDashboardAction.statisticThunk(auth.id, auth.token));
  };

  useEffect(() => {
    getUserById();
    getHistory();
    getDasboard();
  }, []);

  return (
    <div className={styles.container}>
      <Layout title="Dashboard"></Layout>
      <main>
        <Header />
        <Modal open={showModal} setOpen={setShowModal} token={auth.token} />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <section className={`${styles.balance} ${styles.flex}`}>
              <div className={`${styles["wrapper-text"]} ${styles.flex}`}>
                <p className={styles.text1}>Balance</p>
                <p className={styles.text2}>
                  {rupiah(profile.balance ? profile.balance : 0)}
                </p>
                <p className={styles.text3}>
                  {profile.noTelp ? profile.noTelp : "-"}
                </p>
              </div>
              <div className={`${styles.button} ${styles.flex}`}>
                <button
                  className={styles.btn}
                  onClick={() => router.push("/transfer")}
                >
                  <i className={`fa-solid fa-arrow-up ${styles.icon}`}></i>
                  <span className={styles.text4}>Transfer</span>
                </button>
                <button className={styles.btn} onClick={modalHandler}>
                  <i className={`fa-solid fa-plus ${styles.icon}`}></i>
                  <span className={styles.text4}>Top Up</span>
                </button>
              </div>
            </section>
            <section className={`${styles["wrapper-content"]} ${styles.flex}`}>
              <div className={styles["wrapper-chart"]}>
                <div>
                  <div className={`${styles.resume} ${styles.flex}`}>
                    <div className={styles.incoming}>
                      <i
                        className={`fa-solid fa-arrow-down ${styles["icon-incoming"]}`}
                      ></i>
                      <p className={styles.status}>Income</p>
                      <p className={styles.text5}>{`Rp. ${currency(
                        statistic.totalIncome
                      )}`}</p>
                    </div>
                    <div className={styles.expense}>
                      <i
                        className={`fa-solid fa-arrow-up ${styles["icon-expense"]}`}
                      ></i>
                      <p className={styles.status}>Expense</p>
                      <p className={styles.text5}>{`Rp. ${currency(
                        statistic.totalExpense
                      )}`}</p>
                    </div>
                  </div>
                  <div>
                    <Bar data={data} height={200} options={chartOptions} />
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
                  {dataHistory.length > 0 &&
                    dataHistory.map((item, idx) => (
                      <div
                        className={`${styles["card-user"]} ${styles.flex}`}
                        key={idx}
                      >
                        <div
                          className={`${styles["info-user"]} ${styles.flex}`}
                        >
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
                            <p className={styles.name}>{`${item.firstName} ${item.lastName}`}</p>
                            <p className={styles.status}>{item.status}</p>
                          </div>
                        </div>
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
