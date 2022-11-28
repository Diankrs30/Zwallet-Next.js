import React from "react";
import styles from "../styles/Button.module.css";

function Button({variant, text, onClick}) {
    return (
        <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
            <p className={styles["btn-text"]}>{text}</p>
        </button>
    )
}

export default Button;