import { products } from "@/examples";
import styles from "./styles.module.css";
import { OrderDetails } from "@/types/order";
import { idText } from "typescript";

interface Props {
  order: OrderDetails | null;
}
export default function Order(props: Props) {
  return (
    <div className={styles.listcontainer} hidden>
      <div className={styles.orderinfo}>
        {" "}
        <p className={styles.p}>{props.order?.id}</p>
        <p className={styles.p}>{props.order?.business}</p>
        <p className={styles.p}>{props.order?.date}</p>
      </div>
      {props.order?.products.map((item, index) => (
        <>
          <div key={index} className={styles.orderdetailinfo}>
            {item.name}
            <div>{item.quantity}</div>
          </div>
        </>
      ))}
    </div>
  );
}
