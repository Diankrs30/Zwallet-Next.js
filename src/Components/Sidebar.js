import React, { useState, useEffect } from "react";
import Styles from "styles/Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import authAction from "src/redux/actions/auth";
import userAction from "src/redux/actions/user";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Modal from "src/Components/ModalTopUp"
import ModalLogout from 'src/Components/ModalLogout'

function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.userData);
  const [selectDashboard, setDashboard] = useState(false);
  const [selectTransfer, setTransfer] = useState(false);
  const [selectTopUp, setTopUp] = useState(false);
  const [selectProfile, setProfile] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpenModal(!openModal);

  const handleLogout = async () => {
    setOpen(!open);
  };

  const logoutSuccess = () => {
    toast.success("Logout success!");
    router.push("/auth/login");
  };

  const logoutHandler = () => {
    dispatch(authAction.logoutThunk(logoutSuccess));
  };

  const dashboardHandler = (e) => {
    e.preventDefault();
    setDashboard(true);
    setTransfer(false);
    setTopUp(false);
    setProfile(false);
    router.push(`/dashboard/${auth.id}`);
  };
  const transferHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(true);
    setTopUp(false);
    setProfile(false);
    router.push("/transaction/transfer");
  };
  const topupHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(true);
    setProfile(false);
    setShowModal(!showModal);
  };
  const profileHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(false);
    setProfile(true);
    router.push(`/user/${auth.id}`);
  };

  const toggleHandler = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (
      router.pathname.includes("transfer") ||
      router.pathname.includes("ammount") ||
      router.pathname.includes("confirmation")
    )
      return setTransfer(true);
    if (router.pathname.includes("dashboard")) return setDashboard(true);
    if (router.pathname.includes("[userId]")) return setProfile(true);
  }, []);

  return (
    <>
      <div
        className={`${Styles["toggle"]} ${Styles["close-toggle"]}`}
        onClick={toggleHandler}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      <Modal
        open={showModal}
        setOpen={setShowModal}
        token={auth.token}
      />
      {show && (
        <>
          <div className={Styles.test}></div>
          <div className={Styles["toggle-list"]}>
            <div
              className={`${Styles.dashboard} ${
                selectDashboard ? Styles.on : undefined
              }`}
              onClick={dashboardHandler}
            >
              {selectDashboard && <div className={Styles.rectangle}></div>}
              <i
                className={`bi bi-grid ${Styles.icon} ${
                  selectDashboard ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>
                Dashboard
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTransfer ? Styles.on : undefined
              }`}
              onClick={transferHandler}
            >
              {selectTransfer && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-arrow-up ${Styles.icon} ${
                  selectTransfer ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>
                Transfer
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTopUp ? Styles.on : undefined
              }`}
              onClick={topupHandler}
            >
              {selectTopUp && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-plus ${Styles.icon} ${
                  selectTopUp ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectProfile ? Styles.on : undefined
              }`}
              onClick={profileHandler}
            >
              {selectProfile && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-regular fa-user ${Styles.icon} ${
                  selectProfile ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>
                Profile
              </p>
            </div>
            <div className={Styles.logout} onClick={logoutHandler}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p className={Styles["close"]}>Logout</p>
            </div>
          </div>
        </>
      )}
      <div className={Styles["container"]}>
        <div
          className={`${Styles.dashboard} ${
            selectDashboard ? Styles.on : undefined
          }`}
          onClick={dashboardHandler}
        >
          {selectDashboard && <div className={Styles.rectangle}></div>}
          <i
            className={`bi bi-grid ${Styles.icon} ${
              selectDashboard ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Dashboard</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTransfer ? Styles.on : undefined
          }`}
          onClick={transferHandler}
        >
          {selectTransfer && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-arrow-up ${Styles.icon} ${
              selectTransfer ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Transfer</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTopUp ? Styles.on : undefined
          }`}
          onClick={topupHandler}
        >
          {selectTopUp && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-plus ${Styles.icon} ${
              selectTopUp ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectProfile ? Styles.on : undefined
          }`}
          onClick={profileHandler}
        >
          {selectProfile && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-regular fa-user ${Styles.icon} ${
              selectProfile ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Profile</p>
        </div>
        <div className={Styles.logout}
        //  onClick={logoutHandler}
         onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p className={Styles["close"]}>Logout</p>
        </div>
         <ModalLogout show={show} />
         <ModalLogout
        open={open}
        setOpen={setOpen}
      />

      </div>
    </>
  );
}

export default Sidebar;
