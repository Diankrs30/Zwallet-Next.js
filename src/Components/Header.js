import React from "react";
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
            />
          </div>
          <div className={styles.profile}>
            <p
              className={styles.username}
            >{`${profile.firstName} ${profile.lastName}`}</p>
            <p className={styles.phone}>{profile.noTelp ?? "-"}</p>
          </div>
          <div className={styles.icon}>
            <Image src={bell} alt="notification" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header;
