import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import OrderInformation, { GpsJson } from "@/pages/api/apisimulation";
import React, { useState, useEffect } from "react";
import { incomeOrder } from "@/examples";

export default function ShippingOrder() {
  return (
    <>
      <h1 className={styles.h1}>
        Ordenes de despacho
        <Link href="/">
          <AiOutlineSearch />
        </Link>
      </h1>
      <div className={styles.orderscontainer}>
        {incomeOrder.map((item, index) => (
          <div key={index} className={styles.order}>
            N°{item.id} <br></br> {item.state}
            {index == 0 ? "Nuevo" : null}
          </div>
        ))}
      </div>
    </>
  );
}
