import styles from "./styles.module.css";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { incomeOrder } from "@/examples";
import { OrderDetails } from "@/types/order";

interface Props {
  onChangeOrder: (order: OrderDetails) => void;
}
export default function IncomeOrder(props: Props) {
  return (
    <>
      <h1 className={styles.h1}>
        Ordenes de recibo
        <Link href="/">
          <AiOutlineSearch />
        </Link>
      </h1>
      <div className={styles.orderscontainer}>
        {incomeOrder.map((item, index) => (
          <div
            key={index}
            className={styles.order}
            onClick={() => props.onChangeOrder(item)}
          >
            N°{item.id} <br></br> {item.state}
          </div>
        ))}
      </div>
    </>
  );
}
