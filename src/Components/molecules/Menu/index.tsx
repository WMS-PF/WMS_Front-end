import { RiHome2Line } from "react-icons/ri";
import { HiOutlineViewGrid } from "react-icons/hi";
import styles from "./styles.module.css";
import Link from "next/link";
export default function Menu() {
  return (
    <div className={styles.div}>
      <h1>ProLogix WMS</h1>
      <div className={styles.div2}>
        <Link href={"/"} className={styles.link}>
          <RiHome2Line size={"20px"} /> Inicio
        </Link>
        <Link href={"/Dashboard"} className={styles.link}>
          <HiOutlineViewGrid size={"20px"} /> Dashboard
        </Link>
      </div>
    </div>
  );
}
