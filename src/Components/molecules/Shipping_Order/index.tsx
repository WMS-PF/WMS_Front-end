import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
export default function ShippingOrder() {
  function generarNumeroOrden() {
    return Math.floor(Math.random() * 1000000);
  }
  const NumeroOrden = generarNumeroOrden();
  return (
    <>
      <h1 className={styles.h1}>
        Ordenes de despacho
        <Link href="/">
          <AiOutlineSearch />
        </Link>
      </h1>
      <div className={styles.orderscontainer}>
        <div className={styles.order}>
          {" "}
          N°{NumeroOrden} <br></br> Nuevo{" "}
        </div>
        <div className={styles.order}>
          {" "}
          N°{NumeroOrden} <br></br> Nuevo{" "}
        </div>
        <div className={styles.order}>
          {" "}
          N°{NumeroOrden} <br></br> Nuevo{" "}
        </div>
      </div>
    </>
  );
}
