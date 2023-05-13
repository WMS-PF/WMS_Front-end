import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { Product as ProductModel } from "@/pages/api/Database/models/Product.model";
import { useQuery } from "react-query";
import styles from "./styles.module.css";
import { useState } from "react";
interface Props {
  quantity: number;
  data?: ProductModel;
  onClick: () => void;
}

export default function Product(props: Props) {
  return (
    <>
      <div className={styles.orderdetailinfo} onClick={props.onClick}>
        {props.data?.ProductName}
        <div className={styles.orderdetailinfo2}>{props.quantity}</div>
      </div>
    </>
  );
}
