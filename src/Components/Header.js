import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import userAction from "../redux/actions/user";

import Image from "next/image";
import styles from "styles/Header.module.css";

import image from "assets/default-img.png";
import bell from "assets/bell.png";

function Header() {
  // const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  // const auth = useSelector((state) => state.auth.userData);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  const history = useSelector((state) => state.history.history);
  const [show, setShow] = useState(false);

  const received = `${styles["green"]} fa-solid fa-arrow-down`;
  const sent = `${styles["red"]} fa-solid fa-arrow-up`;

  const rupiah = (number) => {
    return (
      "Rp " +
      parseFloat(number)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  const notifHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      <section className={`${styles.container} ${styles.flex}`}>
        <aside className={styles.aside}>
          <p className={styles["text-title"]}>FazzPay</p>
        </aside>
        <div className={`${styles.navbar} ${styles.flex}`}>
          <div className={styles["img-profile"]}>
            <Image
              src={profile.image !== null ? `${link}/${profile.image}` : image}
              width={52}
              height={52}
              quality={52}
              style={{ cursor: "pointer", borderRadius: "10px" }}
              alt="foto profile"
              // layout="fill"
              // objectFit="cover"
            />
          </div>
          <div className={styles.profile}>
            <p
              className={styles.username}
            >{`${profile.firstName} ${profile.lastName}`}</p>
            <p className={styles.phone}>{profile.noTelp ?? "-"}</p>
          </div>
          <div className={styles.icon} onClick={notifHandler}>
            {/* <Image src={bell} alt="notification" /> */}
            {!show ? (
              <i className="fa-regular fa-bell" style={{ fontSize: 25 }}></i>
            ) : (
              <i className="fa-solid fa-bell" style={{ color: "#6379F4", fontSize: 25 }}></i>
            )}
          </div>
        </div>
      </section>
      {show && (
        <>
          <div className={styles.modal}>
            {history?.length < 1 ? (
              <p>No transaction yet</p>
            ) : (
              history?.map((data, idx) => {
                return (
                  <>
                    <div className={styles.card} key={idx}>
                      <i className={data.type === "send" ? sent : received}></i>
                      <div>
                        <p className={styles["name"]}>
                          {data.type === "send"
                            ? `Transfer to ${data.fullName}`
                            : data.type === "topup"
                            ? `Top up`
                            : `Accept from ${data.fullName}`}
                        </p>
                        <p className={styles["price"]}>{rupiah(data.amount)}</p>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
