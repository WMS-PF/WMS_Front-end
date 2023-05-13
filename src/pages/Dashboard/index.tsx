import { ShipmentChart } from "@/Components/charts/ShipmentChart";
import { QueryClient } from "react-query";
import styles from "@/styles/Dashboard.module.css";
import { IncomeChart } from "@/Components/charts/IncomeCharts";
import Head from "next/head";
import { InProcessOrders } from "@/Components/charts/InProcessOrders";
import { ResumeBarByMonth } from "@/Components/charts/ResumeBarByMonth";
import Menu from "@/Components/molecules/Menu";
import CalendarChart from "@/Components/charts/Calendar";
import { useMediaQuery } from "@mui/material";
// Create a client
const queryClient = new QueryClient();

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return isMobile ? (
    <>
      <Head>
        <title>WMS LogixPro - Dashboard</title>
      </Head>

      <main className={styles.mail}>
        <Menu />
        <div className={styles.main}>
          <div className={styles.barAndDoughnut}>
            <div className={styles.doughnutContainer}>
              <IncomeChart />
              <ShipmentChart />
            </div>
            <ResumeBarByMonth />
            <InProcessOrders />
          </div>
          <div className={styles.inProcessContainer}></div>
        </div>
      </main>
    </>
  ) : (
    <>
      <Head>
        <title>WMS LogixPro - Dashboard</title>
      </Head>

      <main className={styles.mail}>
        <Menu />
        <div className={styles.main}>
          <div className={styles.barAndDoughnut}>
            <div className={styles.doughnutContainer}>
              <IncomeChart />
              <ShipmentChart />
            </div>
            <ResumeBarByMonth />
          </div>
          <div className={styles.inProcessContainer}>
            <InProcessOrders />
          </div>
        </div>
      </main>
    </>
  );
}
