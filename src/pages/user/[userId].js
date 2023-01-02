import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "src/redux/actions/user";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "styles/Profile.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Modal from "src/Components/ModalLogout";

import image from "assets/default-img.png";
import Edit from "assets/edit-2.png";

function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const auth = useSelector((state) => state.auth.userData);
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const inputFileRef = React.createRef();
  const [display, setDisplay] = useState(null);
  const [image, setImage] = useState("");

  const editImageHandler = () => {
    const body = new FormData();
    body.append("image", image);

    dispatch(
      userAction.updateImgThunk(auth.id, body, auth.token, () => {
        toast.success("Image updated successfully");
      })
    );
  };

  const inputImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleLogout = async () => {
    setOpen(!open);
  };

  const handleSaveShow = () => {
    setIsSave(true);
  };

  const handleCancel = () => {
    setDisplay(`${link}/${profile.image}`), setIsSave(false);
  };

  useEffect(() => {
    dispatch(userAction.getUserByIdThunk(auth.id, auth.token));
  }, [dispatch, auth]);

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
                    src={display || `${link}/${profile.image}` || image}
                    // src={
                    //   display === null ? `${link}/${profile.image}` : display
                    // }
                    // src={
                    //   display !== null
                    //     ? display
                    //     : profile.image !== null
                    //     ? `${link}/${profile.image}`
                    //     : image
                    // }
                    width={80}
                    height={80}
                    quality={80}
                    alt="foto-profile"
                    priority
                  />
                </div>
                <div className={`${styles["wrapper-btnEdit"]} ${styles.flex}`}>
                  {!isSave ? (
                    <div
                      onClick={handleSaveShow}
                      className={styles["btn-edit"]}
                    >
                      <Image
                        src={Edit}
                        alt="img"
                        width={20}
                        height={20}
                        quality={20}
                        className={styles["icon-edit"]}
                      ></Image>
                      <label htmlFor="file">Edit</label>
                    </div>
                  ) : (
                    <div className={styles.inputImg}>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={inputImage}
                        className={styles.input}
                      />
                      <div className={styles.button_image}>
                        <button
                          className={styles.btn_cancel_profile}
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.btn_save_profile}
                          onClick={() => (editImageHandler(), setIsSave(false))}
                        >
                          Save Profile
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={styles.name}
                >{`${profile.firstName} ${profile.lastName}`}</div>
                <div className={styles.phone}>
                  {profile.noTelp ? `${profile.noTelp}` : "-"}
                </div>
              </div>
              <div className={styles["wrapper-btn"]}>
                <button
                  className={styles.button}
                  onClick={() => router.push(`/user/profile/${auth.id}`)}
                >
                  <p>Personal Information</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button
                  className={styles.button}
                  onClick={() => router.push(`/user/password/${auth.id}`)}
                >
                  <p>Change Password</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button
                  className={styles.button}
                  onClick={() => router.push(`/user/change-pin/${auth.id}`)}
                >
                  <p>Change PIN</p>
                  <i className={`fa fa-arrow-right ${styles.icon}`}></i>
                </button>
                <button className={styles.button} onClick={handleLogout}>
                  <p>Logout</p>
                </button>
              </div>
              <Modal show={show} open={open} setOpen={setOpen} />
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default Profile;
