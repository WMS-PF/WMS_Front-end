import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import OrderInformation, { GpsJson } from "@/pages/api/apisimulation";
import React, { useState } from "react";
type OrderInformationProps = {
  information: GpsJson;
};

export default function ShippingOrder(props: OrderInformationProps) {
  const { information } = props;
  const { status, orderId } = information;

  const guardarInfo = () => {
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
    } else {
    }
  };
  return (
    <>
      <h1 className={styles.h1}>
        Ordenes de despacho
        <Link href="/">
          <AiOutlineSearch />
        </Link>
      </h1>
      <div className={styles.orderscontainer}>
        <div className={styles.order} id="div1">
          {" "}
          N°{orderId} <br></br> {status} <br></br>
        </div>
        <div className={styles.order} id="div2">
          {" "}
          N°{orderId} <br></br> {status} <br></br>
        </div>
        <div className={styles.order}> </div>
      </div>
    </>
  );
}
