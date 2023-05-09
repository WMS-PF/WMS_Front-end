import { useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { useQuery } from "react-query";
import styles from "./styles.module.css";
import { OutgoingOrders } from "@/pages/api/Database/models/OutgoingOrders";

export const ShipmentChart = (): JSX.Element => {
  const ref = useRef();
  //query
  const query = useQuery<OutgoingOrders[]>({
    queryFn: () => request(apis.getOrderOut),
    queryKey: [apis.getOrderOut],
  });
  // console.log(query.data);

  const filteredOrders = query.data?.filter(
    (item) =>
      item.Status == 1 ||
      item.Status == 0 ||
      item.Status == 2 ||
      item.Status == 3
  );
  const filteredOpenOrders = query.data?.filter((item) => item.Status == 3);
  //console.log(filteredClosedOrders);
  const totalItems: any = filteredOrders?.length;
  const totalItemsFiltered: any = filteredOpenOrders?.length;
  const percentage = (totalItemsFiltered / totalItems) * 100;
  //console.log(percentage);
  const dataDoughnut = {
    labels: ["Ordenes despachadas", "Ordenes por despachar"],
    datasets: [
      {
        label: "% Ordenes",
        data: [percentage, 100 - percentage],
        backgroundColor: ["#ED1C24", "#000000"],
        hoverBackgroundColor: ["#ED1C24", "#000000"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.doughnut}>
      <Doughnut ref={ref} data={dataDoughnut} />{" "}
    </div>
  );
};
