import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import historyAction from "../../../redux/actions/history";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/History.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Loading from "src/Components/Loading";

import image from "assets/default-img.png";

function History() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.userData);
  const dataHistory = useSelector((state) => state.history.history);
  const totalPage = useSelector((state) => state.history.pagination);
  const isLoading = useSelector((state) => state.history.isLoading);
  const [param, setParam] = useState({
    page: 1,
    per_page: 5,
    filter: "MONTH",
  });
  const getHistory = () => {
    const param = {
      page: 1,
      per_page: 5,
      filter: "MONTH",
    };
    dispatch(historyAction.getHistoryThunk(param, auth.token));
  };
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  const [filter, setFilter] = useState(false);
  const [filterSelect, setfilterSelect] = useState(null);
  const [dataFound, setDataFound] = useState(false);

  const rupiah = (number) => {
    return (
      "Rp " +
      parseFloat(number)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const filterHandler = (text) => {
    setfilterSelect(text);
  };

  useEffect(() => {
    router.push(
      `/transaction/history?page=${param.page}&limit=${param.per_page}&filter=${param.filter}`
    );
    dispatch(historyAction.getHistoryThunk(param, auth.token));
    if (dataHistory.length > 0) setDataFound(true);
  }, [param]);
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
                <div className={`${styles.filter} ${styles.filterHead}`}>
                  <div
                    className={styles.show}
                    onClick={() => {
                      setFilter(filter ? false : true);
                      console.log(filter);
                    }}
                  >
                    {!filterSelect ? "-- Select Filter --" : filterSelect}
                  </div>
                  {filter && (
                    <i
                      className={`fa-regular fa-x ${styles["icon"]}`}
                      onClick={() => {
                        setFilter(filter ? false : true);
                        setfilterSelect(null);
                        router.push("/transaction/history");
                      }}
                    ></i>
                  )}
                  <div
                    className={
                      filter ? styles.filterDownOn : styles.filterDownOff
                    }
                  >
                    <p
                      className={
                        filter ? styles.filterDownOn2 : styles.filterDownOff
                      }
                      onClick={() => {
                        filterHandler("WEEK");
                        setFilter(false);
                        router.push("/transaction/history?filter=WEEK");
                      }}
                    >
                      WEEK
                    </p>
                    <p
                      className={
                        filter ? styles.filterDownOn2 : styles.filterDownOff
                      }
                      onClick={() => {
                        filterHandler("MONTH");
                        setFilter(false);
                        router.push("/transaction/history?filter=MONTH");
                      }}
                    >
                      MONTH
                    </p>
                    <p
                      className={
                        filter ? styles.filterDownOn2 : styles.filterDownOff
                      }
                      onClick={() => {
                        filterHandler("YEAR");
                        setFilter(false);
                        router.push("/transaction/history?filter=YEAR");
                      }}
                    >
                      YEAR
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles["wrapper-user"]}>
                {isLoading ? (
                  <Loading />
                ) : dataFound ? (
                  dataHistory.length > 0 &&
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
                            alt="foto-profile"
                            width={56}
                            height={56}
                            // layout="fill"
                            // objectFit="cover"
                          />
                        </div>
                        <div className={styles["data-user"]}>
                          <p
                            className={styles.name}
                          >{`${item.firstName} ${item.lastName}`}</p>
                          <p className={styles.status}>
                            {item.type} {item.status}
                          </p>
                        </div>
                      </div>
                      <div className={styles.amount}>
                        {" "}
                        <div
                          className={
                            item.type === "topup"
                              ? styles["amount-receive"]
                              : styles["amount-send"]
                          }
                        >
                          {item.type === "topup"
                            ? "+ " + rupiah(item.amount)
                            : "- " + rupiah(item.amount)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className={styles["no-data"]}>No Data Available</div>
                  </div>
                )}
              </div>
              <div className={styles["btn-container"]}>
                <button
                  disabled={param.page === 1 ? true : false}
                  onClick={() => {
                    setParam({ ...param, page: param.page - 1 });
                  }}
                >
                  <i className="fa-solid fa-caret-left"></i>
                </button>
                <button
                  disabled={param.page === totalPage ? true : false}
                  onClick={() => {
                    setParam({ ...param, page: param.page + 1 });
                  }}
                >
                  <i className="fa-solid fa-caret-right"></i>
                </button>
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
