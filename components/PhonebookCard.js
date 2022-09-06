import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Phonebook.module.css";

export default function PhonebookCard({ name, mobile, fax, work, id, refresh }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    router.replace("/update-phonebook/" + id);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch("/api/phonebooks/" + id, {
        method: "delete",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      refresh && refresh();
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.textWrapper}>
          <p className={styles.title}>Name:</p>
          <p className={styles.text}>{name}</p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.title}>Mobile:</p>
          <p className={styles.text}>{mobile || "N/A"}</p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.title}>FAX:</p>
          <p className={styles.text}>{fax || "N/A"}</p>
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.title}>Work:</p>
          <p className={styles.text}>{work || "N/A"}</p>
        </div>
      </div>

      <div className="row-between">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>{loading ? "Deleting..." : "Delete"}</button>
      </div>
    </div>
  );
}
