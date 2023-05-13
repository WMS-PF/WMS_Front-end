import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Order from "@/Components/molecules/Order";
import { useState } from "react";
import ShippingOrder from "@/Components/molecules/ShippingOrder";
import IncomeOrder from "@/Components/molecules/IncomeOrder";
import { IncomingOrders } from "../api/Database/models/IncomingOrders";
import { Availability } from "../api/Database/models/Availability";
import { useMediaQuery } from "@mui/material";
import MobileHomeMenu from "@/Components/molecules/MobileHomeMenu";

export default function Home() {
  const [order, setOrder] = useState<null | IncomingOrders>(null);
  const [orderOut, setOrderOut] = useState<null | Availability>(null);
  const isMobile = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Head>
        <title>WMS LogixPro - Home</title>
      </Head>
      {isMobile ? (
        <main className={styles.main}>
          <div className={styles.home}>
            <MobileHomeMenu />
            <div className={styles.orderinformationcontainer}>
              <div className={styles.ordercontainer}>
                <IncomeOrder onChangeOrder={(order) => setOrder(order)} />
                <ShippingOrder onChangeOrder={(order) => setOrder(order)} />
              </div>
            </div>
            <Order order={order} />
          </div>
        </main>
      ) : (
        <main className={styles.main}>
          <div className={styles.home}>
            <div className={styles.orderinformationcontainer}>
              <div className={styles.ordercontainer}>
                <IncomeOrder onChangeOrder={(order) => setOrder(order)} />
                <ShippingOrder onChangeOrder={(order) => setOrder(order)} />
              </div>
            </div>
            <Order order={order} />
          </div>
        </main>
      )}
    </>
  );
}
