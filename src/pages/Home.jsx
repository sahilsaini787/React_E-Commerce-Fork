import { Navbar, Main, Product, Footer } from "../components";
import { useEffect } from "react";
import analytics from "../lib/segment"

function Home() {
  useEffect(() => {
    analytics.page();
  }, []);

  return (
    <>
      <Navbar />
      <Main />
      <Product />
      <Footer />
    </>
  )
}

export default Home