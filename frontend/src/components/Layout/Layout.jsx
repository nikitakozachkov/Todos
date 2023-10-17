import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "components/Nav/Nav";
import { Loading } from "components/Loading/Loading";
import styles from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <header>
          <Nav />
        </header>

        <main className={styles.main}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
};
