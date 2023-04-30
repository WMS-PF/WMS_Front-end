import styles from "./styles.module.css";
import { OrderDetails } from "@/types/order";
import { useQuery } from "react-query";
import apis from "@/helpers/apis/getOrderIn";
import request from "@/helpers/request";
import { useState } from "react";
interface Props {
  order: OrderDetails | null;
}

export default function Order(props: Props) {
  // Queries
  const query = useQuery({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  const data = query.data;
  console.log(data);
  return (
    <div className={styles.listcontainer}>
      <div className={styles.orderinfo}>
        <p className={styles.p}>Pedido N°: {data[0].OrdenID}</p>
        <p className={styles.p}>Empresa: {data[0].Empresa}</p>
        <p className={styles.p}>Sucursal: {data[0].Sucursal}</p>
        <p className={styles.p}> Fecha: {data[0].Fecha}</p>
      </div>
      {data?.map((item: any, index: number) => (
        <>
          {" "}
          <div key={index} className={styles.orderdetailinfo}>
            {item.Sucursal}
          </div>
        </>
      ))}
    </div>
  );
}
