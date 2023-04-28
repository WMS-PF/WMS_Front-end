import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/components/molecules/SearchBar";
import Order from "@/components/molecules/Order";
import dynamic from "next/dynamic";
import { useState } from "react";
import { OrderDetails } from "@/types/order";

const IncomeOrder = dynamic(
  () => import("@/components/molecules/IncomeOrder"),
  {
    ssr: false,
  }
);
const ShippingOrder = dynamic(
  () => import("@/components/molecules/ShippingOrder"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [order, setOrder] = useState<null | OrderDetails>(null);

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
              <IncomeOrder onChangeOrder={(order) => setOrder(order)} />
              <ShippingOrder />
            </div>
            <Order order={order} />
          </div>
        </div>
      </main>
    </>
  );
}
