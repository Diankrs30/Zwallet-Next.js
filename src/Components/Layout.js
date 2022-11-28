import react from "react";
import Head from "next/head";
// import Header from "./Header";

function Layout({ children, title = "FazzPay", isHeaderShown = false }) {
  return (
    <>
      <Head>
        <title>{`FazzPay | ${title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* {isHeaderShown && <Header />}
      {children} */}
    </>
  );
}

export default Layout;
