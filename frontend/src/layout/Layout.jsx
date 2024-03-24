import React from "react";

import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import Router from "../routers/Routers";
const Layout = () => {
    return (
    <>
      <Header/>
      <main>
        <Router/>
      </main>
      <Footer/>
    </>
    );
};

export default Layout;