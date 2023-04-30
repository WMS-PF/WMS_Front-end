import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SearchBar from "@/Components/molecules/SearchBar";
import Order from "@/Components/molecules/Order";
import dynamic from "next/dynamic";
import { useState } from "react";
import { OrderDetails } from "@/types/order";
import ShippingOrder from "@/Components/molecules/ShippingOrder";
import IncomeOrder from "@/Components/molecules/IncomeOrder";
import { IncomingOrders } from "../api/Database/models/IncomingOrders";

export default function Home() {
  const [order, setOrder] = useState<null | IncomingOrders>(null);

  return (
    <>
      <Head>
        <title>WMS LogixPro - Home</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.dashboard}>
          <div className={styles.orderinformationcontainer}>
            <div className={styles.ordercontainer}>
              <IncomeOrder onChangeOrder={(order) => setOrder(order)} />
              <ShippingOrder onChangeOrder={(order) => setOrder(order)} />
            </div>
            <Order order={order} />
          </div>
        </div>
      </main>
    </>
  );
}
