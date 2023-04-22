import styles from "./page.module.css";
import IncomeOrder from "./Components/molecules/Income_Order";
import ShippingOrder from "./Components/molecules/Shipping_Order";
import SearchBar from "./Components/molecules/SearchBar";
import OrderList from "./Components/molecules/Order_List";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.homecontainer}>
        <div className={styles.ordercontainer}>
          <IncomeOrder />
          <ShippingOrder />
        </div>
        <SearchBar />
        <OrderList />
      </div>
    </main>
  );
}
