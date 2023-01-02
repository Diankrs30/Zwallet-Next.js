import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/SeacrhReceiver.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Loading from "src/Components/Loading";

import Search from "assets/search.png";
import image from "assets/default-img.png";
import { getAllUser } from "utils/transfer";

function SearchReceiver() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.userData.token);
  let page = parseInt(router.query.page) || 1;
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  useEffect(() => {
    router.query.q
      ? getAllUser(token, page, router.query.q)
          .then((res) => {
            setLoading(false);
            setUserData(res.data.data);
            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err))
      : getAllUser(token, page)
          .then((res) => {
            setLoading(false);
            setUserData(res.data.data);
            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err));
    // dispatch(transferAction.transferReset());
  }, [router.query, page, token]);

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
                <p>Search Receiver</p>
              </div>
              <form
                className={`${styles["wrapper-search"]} ${styles.flex}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push(`/transaction/transfer?q=${e.target.q.value}`);
                }}
              >
                <Image src={Search} alt="search"></Image>
                <input
                  className={styles.inputSearch}
                  type="text"
                  name="q"
                  placeholder="Search receiver here"
                ></input>
              </form>

              <div className={styles["wrapper-user"]}>
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    {userData ? (
                      <div>
                        {userData.length > 0 &&
                          userData.map((item, idx) => {
                            return (
                              <Link
                                href={`/transaction/transfer/amount?receiver=${item.id}`}
                                passHref
                                key={idx}
                              >
                                <div
                                  className={`${styles["card-user"]} ${styles.flex}`}
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
                                        width={70}
                                        height={70}
                                        quality={70}
                                        alt="foto-profile"
                                        style={{ borderRadius: "10px" }}
                                        priority
                                      />
                                    </div>
                                    <div className={styles["data-user"]}>
                                      <p
                                        className={styles.name}
                                      >{`${item.firstName} ${item.lastName}`}</p>
                                      <p className={styles.phone}>
                                        {item.noTelp}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : (
                      <div>
                        <div className={styles["no-data"]}>No Data Available</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default SearchReceiver;
