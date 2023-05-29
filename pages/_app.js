import { createContext } from "react";
import NavBar from "../components/NavBar/NavBar";
import { useGames } from "../hooks/useGames";
import "../styles/globals.css";
import Aside from "../components/Aside/Aside";
import styles from "../styles/Home.module.css";
import { Helmet } from "react-helmet";

export const HookContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const hook = useGames();

  return (
    <HookContext.Provider value={hook}>
      <Helmet>
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
      </Helmet>
      <NavBar />
      <main className={styles.main} id="main">
        <Aside />
        <Component {...pageProps} />
      </main>
    </HookContext.Provider>
  );
}

export default MyApp;
