import React from 'react'

import styles from "../styles/Footer.module.css"

function Footer() {
  return (
    <div>
      <section className={`${styles.container} ${styles.flex}`}>
        <aside className={styles.aside}>
          <p className={styles.text1}>2020 FazzPay. All right reserved.</p>
        </aside>
        <aside className={`${styles.contacts} ${styles.flex}`}>
        <p className={styles.text2}>+62 5637 8882 9901</p>
        <p className={styles.text2}>contact&#64;fazzpay.com</p>
        </aside>
      </section>
    </div>
  )
}

export default Footer;