import { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS
import request from "@/helpers/request";
import apis from "@/helpers/apis";
import { useQuery } from "react-query";
import { IncomingOrders } from "@/pages/api/Database/models/IncomingOrders";
import { OutgoingOrders } from "@/pages/api/Database/models/OutgoingOrders";
import styles from "./styles.module.css";
export const InProcessOrders = (): JSX.Element => {
  const ref = useRef();
  //Income orders query
  const incomeOrderQuery = useQuery<IncomingOrders[]>({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  //Income orders query
  const outOrderQuery = useQuery<OutgoingOrders[]>({
    queryFn: () => request(apis.getOrderOut),
    queryKey: [apis.getOrderOut],
  });
  //incoming order in process filter
  const incomingOrdersInProcess = incomeOrderQuery.data?.filter(
    (item) => item.Status == 1
  );
  //Outgoing order in process filter
  const outGoingOrdersInProcess = outOrderQuery.data?.filter(
    (item) => item.Status == 1
  );
  //number of shipping orders in process
  const numberOfShippingOrdersInProcess = outGoingOrdersInProcess?.length;
  //number of incoming orders in process
  const numberOfIncomingOrdersInProcess = incomingOrdersInProcess?.length;

  return (
    <div className={styles.container}>
      <div className={styles.inProcessContainer}>
        <h2 className={styles.h2}>{numberOfIncomingOrdersInProcess}</h2>
        <p className={styles.p}> En proceso de entrada</p>
      </div>
      <div className={styles.inProcessContainer2}>
        <h2 className={styles.h2}>{numberOfShippingOrdersInProcess}</h2>
        <p className={styles.p}>En proceso de salida</p>
      </div>
    </div>
  );
};
