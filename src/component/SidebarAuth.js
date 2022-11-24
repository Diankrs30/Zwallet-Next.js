import Image from "next/image";
import vector from "../assets/Vector.png";
import vector4 from "../assets/vector4.png"
import phone2 from "../assets/png-phone2.svg";
import phone from "../assets/png-phone.svg";
import styles from "../styles/SidebarAuth.module.css";

function Sidelogin() {
  return (
    <div>
      <section className={`${styles.container}`}>
        <div className={styles["wrapper-title"]}>
          <p className={styles.title}>FazzPay</p>
        </div>
        <div className={styles.vector}>
        <Image className={styles.vector} src={vector} alt="" />
        <Image className={styles.vector1} src={vector4} alt="" />
          <div className={styles.wraperImg}>
            <Image className="img1" src={phone2} alt="" priority/>
          </div>
          <div className={styles.wraperImg2}>
            <Image className="img2" src={phone} alt="" priority/>
          </div>
        </div>
        <div className={styles.wrapperText}>
          <p className={styles.title1}>App that Covering Banking Needs.</p>
          <p className={styles.text}>
            Zwallet is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in Zwallet everyday with worldwide <br/>
            users coverage.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Sidelogin;
