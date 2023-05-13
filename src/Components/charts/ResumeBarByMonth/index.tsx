import apis from "@/helpers/apis";
import request from "@/helpers/request";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import { OutgoingOrders } from "@/pages/api/Database/models/OutgoingOrders";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import styles from "./styles.module.css";
import { useMediaQuery } from "@mui/material";
export const ResumeBarByMonth = (): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const ref = useRef();
  //Income orders query
  const incomeOrderQuery = useQuery<IncomingOrders[]>({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });

  //Shipped orders query
  const outOrderQuery = useQuery<OutgoingOrders[]>({
    queryFn: () => request(apis.getOrderOut),
    queryKey: [apis.getOrderOut],
  });

  let shippedOrderDataByMonths: Record<string, any> = {};
  outOrderQuery.data?.forEach((item) => {
    let month = new Date(item.Date).getDate().toString();
    shippedOrderDataByMonths[month] = [
      ...(shippedOrderDataByMonths[month] ?? []),
      item,
    ];
  });

  let incomingOrderDataByMonths: Record<string, any> = {};
  incomeOrderQuery.data?.forEach((item) => {
    let month = new Date(item.Date).getDate().toString();
    incomingOrderDataByMonths[month] = [
      ...(incomingOrderDataByMonths[month] ?? []),
      item,
    ];
  });
  let incomeOrderDataGraph = new Array(12)
    .fill(0)
    .map((item, index) => incomingOrderDataByMonths[index]?.length ?? 0);
  let shippedOrderDataGraph = new Array(12)
    .fill(0)
    .map((item, index) => shippedOrderDataByMonths[index]?.length ?? 0);
  const data = {
    labels: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciember",
    ],
    datasets: [
      {
        label: "Ordenes recibidas",
        data: incomeOrderDataGraph,
        backgroundColor: "#000000",
        borderColor: "#000000",
        borderWidth: 1,
      },
      {
        label: "Ordenes despachadas",
        data: shippedOrderDataGraph,
        backgroundColor: "rgb(237, 28, 36)",
        borderColor: "rgb(237, 28, 36)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Ordenes del 2023",
      },
    },
  };

  return isMobile ? (
    <div className={styles.bar}>
      <Bar data={data} ref={ref} options={options} />
    </div>
  ) : (
    <div className={styles.bar}>
      <Bar data={data} ref={ref} options={options} />
    </div>
  );
};
