import React from "react";
import styles from "../styles/Phonebook.module.css";

export default function PhonebookCard({ name, mobile, fax, work, id }) {
  return (
    <div className={styles.card}>
      <div className={styles.textWrapper}>
        <p className={styles.title}>Name:</p>
        <p className={styles.text}>{{ name }}</p>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>Mobile:</p>
        <p className={styles.text}>{{ mobile }}</p>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>FAX:</p>
        <p className={styles.text}>{{ fax }}</p>
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>Work:</p>
        <p className={styles.text}>{{ work }}</p>
      </div>
    </div>
  );
}
