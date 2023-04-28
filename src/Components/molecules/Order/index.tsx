import { products } from "@/examples";
import styles from "./styles.module.css";
import { OrderDetails } from "@/types/order";

interface Props {
  order: OrderDetails | null;
}
export default function Order(props: Props) {
  return (
    <>
      <div className={styles.listcontainer}>
        <>
          {props.order?.products.map((item, index) => (
            <>
              <div key={index} className={styles.orderinfo}></div>
              <div key={index} className={styles.orderdetailinfo}>
                {item.name}
                <div>{item.quantity}</div>
              </div>
            </>
          ))}
        </>
      </div>
    </>
  );
}
