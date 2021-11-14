import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import Config from "../component/Config";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [discovery, setDiscovery] = useState(null);
  const handleChangeDiscovery = useCallback((e) => {
    if (e.target.files.length !== 1) {
      console.error("need exactly one file");
      return;
    }

    var reader = new FileReader();
    reader.onload = (event) => {
      // console.log(JSON.parse(event.target?.result));
      setDiscovery(JSON.parse(event.target?.result));
    };
    reader.readAsText(e.target.files[0]);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Config creator</title>
        <meta
          name="description"
          content="Generated config file automatically"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Config Creator</h1>

        <p className={styles.description}>
          Import your discovery file to generate your config file
          <input
            type="file"
            name="discover"
            id="discovery"
            aria-label="discovery file"
            onChange={handleChangeDiscovery}
          />
        </p>

        {discovery ? (
          <Config discovery={discovery} />
        ) : (
          <p>Upload your discovery file</p>
        )}
      </main>

      <footer className={styles.footer}>Made by MaelFr</footer>
    </div>
  );
};

export default Home;
