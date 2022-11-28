import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/user";
import { useRouter } from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "styles/SeacrhReceiver.module.css";
import Layout from "src/pages/Components/Layout";
import Header from "src/pages/Components/Header";
import Footer from "src/pages/Components/Footer";
import Sidebar from "src/pages/Components/Sidebar";

import Search from "assets/search.png";
import image from "assets/default-img.png";
import { getAllUser } from "utils/transfer";

function SearchReceiver() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const token = useSelector((state) => state.auth.userData.token);
  let page = parseInt(router.query.page) || 1;
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  const searchHandler = (e) => {
    e.preventDefault();
    setQuery({ ...query, search: search });
  };

  useEffect(() => {
    router.query.q
      ? getAllUser(token, page, router.query.q)
          .then((res) => {
            setUserData(res.data.data);

            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err))
      : getAllUser(token, page)
          .then((res) => {
            setUserData(res.data.data);
            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err));
    // dispatch(transferAction.transferReset());
  }, [router.query]);
  console.log(userData);

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
                  router.push(`/transfer?q=${e.target.q.value}`);
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
                {userData.length > 0 &&
                  userData.map((item, idx) => {
                    return (
                      <Link
                        href={`/transfer/amount?receiver=${item.id}`}
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
                              />
                            </div>
                            <div className={styles["data-user"]}>
                              <p
                                className={styles.name}
                              >{`${item.firstName} ${item.lastName}`}</p>
                              <p className={styles.phone}>{item.noTelp}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
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
