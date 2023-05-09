import { useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { useQuery } from "react-query";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import styles from "./styles.module.css";
export const IncomeChart = (): JSX.Element => {
  const ref = useRef();
  //query
  const query = useQuery<IncomingOrders[]>({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  // console.log(query.data);

  //data filter by status order. if status order is 0,1,2 = "open" else "close" order
  const filteredOrders = query.data?.filter(
    (item) =>
      item.Status == 1 ||
      item.Status == 0 ||
      item.Status == 2 ||
      item.Status == 3
  );
  const filteredClosedOrders = query.data?.filter((item) => item.Status == 3);
  //console.log(filteredClosedOrders);
  const totalItems: any = filteredOrders?.length;
  const totalItemsFiltered: any = filteredClosedOrders?.length;
  const percentage = (totalItemsFiltered / totalItems) * 100;
  //console.log(percentage);
  const dataDoughnut = {
    labels: ["Ordenes recibidas", "Ordenes por recibir"],
    datasets: [
      {
        label: "Ordenes",
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
