import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/user";

import Image from "next/image";
import styles from "styles/SeacrhReceiver.module.css";
import Layout from "components/Layout";
import Header from "components/Header";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";

import Profile from "assets/profile3.png";
import Search from "assets/search.png";
import image from "assets/default-img.png";

function SearchReceiver() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userData);
  const dataUser = useSelector((state) => state.user.dataUser);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  const getDataUser = () => {
    const param = {
      page: 5,
      per_page: 6,
      search: "",
      sort: "firstName ASC",
    };
    dispatch(userAction.getDataUserThunk(param, auth.token));
  };

  useEffect(() => {
    getDataUser();
  }, []);

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
              <div className={`${styles["wrapper-search"]} ${styles.flex}`}>
                <Image src={Search} alt="search"></Image>
                <input
                  className={styles.search}
                  type="text"
                  placeholder="Search receiver here"
                ></input>
              </div>

              <div className={styles["wrapper-user"]}>
                {dataUser.length > 0 &&
                  dataUser.map((item, idx) => {
                    return (

                    <div className={`${styles["card-user"]} ${styles.flex}`} key={idx}>
                      <div className={`${styles["info-user"]} ${styles.flex}`}>
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
                          <p className={styles.phone}>{item.noTelp}</p>
                        </div>
                      </div>
                    </div>
                    )
                  })}
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default SearchReceiver;
