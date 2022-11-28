import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { getUserById } from "../../utils/user";
import { currency } from "src/helper/currency";
import transferAction from "src/redux/actions/transfer";

import Image from "next/image";
import styles from "styles/InputAmount.module.css";
import Layout from "src/Components/Layout";
import Header from "src/Components/Header";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";

import image from "assets/default-img.png";
import Edit from "assets/edit-2.png";
import Button from "src/Components/Button";

function Amount() {
  const router = useRouter();
  const dispatch = useDispatch();
  const receiverId = router.query.receiver;
  const token = useSelector((state) => state.auth.userData.token);
  const userBalance = useSelector((state) => state.user.profile.balance);
  const [amount, setAmount] = useState(null);
  const [notes, setNotes] = useState("");
  const [receiverData, setReceiverData] = useState({});
  const link = process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE;

  useEffect(() => {
    getUserById(token, receiverId)
      .then((res) => {
        setReceiverData({ ...res.data.data });
      })
      .catch((err) => console.log(err));
  }, [token, receiverId]);

  const amountHandler = (e) => setAmount(e.target.value);
  const notesHandler = (e) => setNotes(e.target.value);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!amount)
      return toast.error("Input the amount of money you want to transfer");
    if (parseInt(amount) > userBalance)
      return toast.error("insufficient balance");
    if (amount < 1000)
      return toast.error(
        "insufficient amount, only more than Rp. 1000 are allowed"
      );
    const date = new Date();
    const body = {
      receiverId: receiverId,
      amount: parseInt(amount),
      date,
      notes,
      receiverData,
    };
    dispatch(transferAction.transferData(body));
    router.push("/transfer/confirmation");
  };

  return (
    <div className={styles.container}>
      <Layout title="Transfer"></Layout>
      <main>
        <Header />
        <section className={`${styles.main} ${styles.flex}`}>
          <aside className={styles.aside}>
            <Sidebar />
          </aside>
          <section className={`${styles.content}`}>
            <div className={styles["wrapper-receiver"]}>
              <div className={styles.title}>
                <p>Transfer Money</p>
              </div>

              <div className={styles["wrapper-user"]}>
                <div className={`${styles["card-user"]} ${styles.flex}`}>
                  <div className={`${styles["info-user"]} ${styles.flex}`}>
                    <div className={styles["img-user"]}>
                      <Image
                        src={`${link}/${receiverData.image}` || image}
                        alt="img"
                        width={56}
                        height={56}
                        style={{ borderRadius: "10px" }}
                      ></Image>
                    </div>
                    <div className={styles["data-user"]}>
                      <p
                        className={styles.name}
                      >{`${receiverData.firstName} ${receiverData.lastName}`}</p>
                      <p className={styles.phone}>{receiverData.noTelp}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className={styles.instruction}>
                Type the amount you want to transfer and then <br /> press
                continue to the next steps.
              </p>

              <div className={`${styles["wrapper-transfer"]} ${styles.flex}`}>
                <input
                  className={styles.nominal}
                  type="number"
                  placeholder="RP.0.00"
                  onChange={amountHandler}
                ></input>
                <div className={styles.saldo}>{`Rp . ${currency(
                  userBalance
                )} Available`}</div>
                <div className={styles.edit}>
                  <Image src={Edit} alt="edit"></Image>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Add some notes"
                    onChange={notesHandler}
                  ></input>
                </div>
              </div>

              <div className={styles["wrapper-button"]}>
                <Button
                  text="Continue"
                  variant="continue"
                  onClick={submitHandler}
                />
              </div>
            </div>
          </section>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default Amount;
