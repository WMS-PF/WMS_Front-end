import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import IncomeOrder from "@/Components/molecules/Income_Order";
import ShippingOrder from "@/Components/molecules/Shipping_Order";
import SearchBar from "@/Components/molecules/SearchBar";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <>
      <Head>
        <title>WMS LogixPro - Home</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.homecontainer}>
          <div className={styles.ordercontainer}>
            <IncomeOrder />
            <ShippingOrder />
          </div>
          <div>
            {" "}
            <SearchBar />
          </div>
        </div>
      </main>
    </>
  );
}
