import React, { useEffect, useState } from "react";
import userAction from "src/redux/actions/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "styles/PersonalInfo.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

function ProfileInfo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const userData = useSelector((state) => state.auth.userData);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);

  const isEditName = () => {
    setEdit(!edit);
  };

  const toEditPhone = () => {
    router.push(`/user/edit-phone/${userData.id}`);
  };

  const success = () => {
    toast.success("Data update successfully");
    router.push(`/user/${userData.id}`);
    setEdit(!edit);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // let body = new FormData();
    const body = {
      firstName: firstName,
      lastName: lastName,
    };
    console.log(body);
    dispatch(
      userAction.updateUserByIdThunk(userData.id, userData.token, body, success)
    );
  };

  useEffect(() => {
    dispatch(userAction.getUserByIdThunk(userData.id, userData.token));
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
  }, [dispatch, profile.firstName, profile.lastName, userData.id, userData.token]);

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
            <div className={styles["wrapper-receiver"]}>
              <div className={styles.title}>
                <p>Personal Information</p>
              </div>
              <div className={styles.information}>
                <p className={styles.text1}>
                  We got your personal information from the sign up proccess. If
                  you want to make changes on your information, contact our
                  support.
                </p>
              </div>
              <div
                className={styles["edit-btn"]}
                onClick={(e) => {
                  e.preventDefault();
                  isEditName();
                }}
              >
                <p>Edit</p>
              </div>
              <form action="" onSubmit={submitHandler}>
                <div className={styles["wrapper-card"]}>
                  <div className={styles["card-info-user"]}>
                    <p className={styles.text1}>First Name</p>{" "}
                    <input
                      className={styles["text2"]}
                      type="text"
                      name="firstName"
                      value={firstName === null ? "Input Here..." : firstName}
                      disabled={!edit}
                      placeholder="Input Here..."
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        console.log(firstName);
                      }}
                    />
                  </div>
                </div>
                <div className={styles["wrapper-card"]}>
                  <div className={styles["card-info-user"]}>
                    <p className={styles.text1}>Last Name</p>{" "}
                    <input
                      className={styles["text2"]}
                      type="text"
                      name="lastName"
                      value={lastName === null ? "Input Here..." : lastName}
                      disabled={!edit}
                      placeholder="Input Here..."
                      onChange={(e) => {
                        setLastName(e.target.value);
                        console.log(lastName);
                      }}
                    />
                  </div>
                </div>
                <div className={styles["wrapper-card"]}>
                  <div className={styles["card-info-user"]}>
                    <p className={styles.text1}>Verified E-mail</p>
                    <p className={styles.text3}>{profile.email}</p>
                  </div>
                </div>
                <div className={styles["wrapper-card"]}>
                  <div className={styles["card-info-user"]}>
                    <div className={styles["info-phone"]}>
                      <div>
                        <p className={styles.text1}>Phone Number</p>{" "}
                        <input
                          className={styles["text2"]}
                          type="text"
                          value={!profile.noTelp ? "-" : `${profile.noTelp}`}
                          placeholder="Input Here..."
                        />
                      </div>
                      <div className={styles.manage}>
                        <p onClick={toEditPhone}>Manage</p>
                      </div>
                    </div>
                  </div>
                </div>
                {edit && (
                  <div className={styles.wrapper_button}>
                    <button className={styles.btn_save_profile} type="submit">
                      Save change
                    </button>
                  </div>
                )}
              </form>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default ProfileInfo;
