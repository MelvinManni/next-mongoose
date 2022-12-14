import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import PhonebookCard from "../components/PhonebookCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [phonebooks, setPhonebooks] = useState([]);
  const { data: session } = useSession();

  const getPhonebooks = useCallback(async () => {
    if (session) {
      const res = await fetch("/api/phonebooks/");
      const data = await res.json();
      console.log(data);
      data.phonebooks && setPhonebooks(data.phonebooks);
    }
  }, [session]);

  useEffect(() => {
    getPhonebooks();
  }, [getPhonebooks]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next MongoDb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session ? (
          <button onClick={() => signIn()} className={styles.btn}>
            Sign In
          </button>
        ) : (
          <>
            <h4 className="text-center">
              Welcome, <br />
              {session?.user?.name}
            </h4>
            <button onClick={signOut}>Sign Out</button>

            <div className={styles.linkText}>
              <Link href="/add-phonebook"> Add Contact</Link>
            </div>

            <div className={styles.cardContainer}>
              <div className="cardGrid">
                {phonebooks.map((contact) => (
                  <PhonebookCard
                    key={contact._id}
                    name={contact.name}
                    fax={contact.fax}
                    mobile={contact.mobile}
                    work={contact.work}
                    id={contact._id}
                    refresh={getPhonebooks}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
