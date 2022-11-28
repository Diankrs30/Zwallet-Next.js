import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import Image from "next/image";
import { Router, useRouter } from "next/router";

import styles from "styles/Profile.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
// import Button from "components/Button";

import image from "assets/default-img.png";
import Edit from "assets/edit-2.png";

function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth.userData);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  const router = useRouter();
  const [imageSend,setImageSend]=useState({})  
  const [isSave,setIsSave]=useState(false) 

  const handleImageChange = (e) =>{

    e.preventDefault();
    
    const file = e.target.files[0];
    console.log("tolak",file);
    setImageSend(file)
    setDropdown(!dropdown)
    setIsSave(true)
    // this.setState({imageSend : file ?? this.state.image })
  }
  const handleSave = () =>{

    console.log(imageSend);
    const token = JSON.parse(localStorage.getItem("token"));
    const id = JSON.parse(localStorage.getItem("id"));
    const body = new FormData();
    body.append("image", imageSend);
    console.log(id,body,token)
    dispatch(userAction.updateImgThunk(id,body,token))
        .then((result) => {
          console.log("ini ", result.value.data.data);
          const data = result.value.data.data;
          toast.success("update image success", {
            position: toast.POSITION.TOP_CENTER,
            autoClose : 2000
        });
          console.log(data);
          dispatch(
            userAction.getUserByIdThunk(id,token)
          );
          setIsSave(false)
        })
        .catch((err) => alert("password gagal"));
  }

  return (
    <div className={styles.container}>
      <Layout title="Profile"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-info-user"]}>
              <div className={`${styles["user-info"]} ${styles.flex}`}>
                <div className={styles["img-user"]}>
                  <Image
                    src={profile.image !== null ? `${link}/${profile.image}` : image}
                    width={80}
                    height={80}
                    quality={80}
                    alt="foto-profile"
                  />
                </div>
                <div className={`${styles["btn-edit"]} ${styles.flex}`}>
                  <Image
                    src={Edit}
                    alt="img"
                    width={20}
                    height={20}
                    quality={20}
                    className={styles["icon-edit"]}
                  ></Image>
                  <p>Edit</p>
                </div>
                <div className={styles.name}>{profile.firstNanme}</div>
                <div className={styles.phone}>{profile.noTelp}</div>
              </div>
              <div className={styles["wrapper-btn"]}>
                <button className={styles.button} onClick={() => router.push('/user/personal-info')}> 
                  <p>Personal Information</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button className={styles.button} onClick={() => router.push('/user/change-password')}>
                  <p>Change Password</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button className={styles.button} onClick={() => router.push('/user/change-pin')}>
                  <p>Change PIN</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button className={styles.button}>
                  <p>Logout</p>
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

export default Profile;
