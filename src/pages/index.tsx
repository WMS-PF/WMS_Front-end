import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/Components/molecules/SearchBar";
import OrderList from "@/Components/molecules/OrderList";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const IncomeOrder = dynamic(
  () => import("@/Components/molecules/Income_Order"),
  {
    ssr: false,
  }
);
const ShippingOrder = dynamic(
  () => import("@/Components/molecules/Shipping_Order"),
  {
    ssr: false,
  }
);

export default function Home() {
  const information = {
    orderid: 12345,
    status: "completado",
  };
  return (
    <>
      <Head>
        <title>WMS LogixPro - Home</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.dashboard}>
          <SearchBar />
          <div className={styles.orderinformationcontainer}>
            <div className={styles.ordercontainer}>
              <IncomeOrder />
              <ShippingOrder information={information} />
            </div>
            <OrderList />
          </div>
        </div>
      </main>
    </>
  );
}
