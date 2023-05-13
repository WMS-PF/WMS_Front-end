import { RiHome2Line } from "react-icons/ri";
import { HiOutlineViewGrid } from "react-icons/hi";
import styles from "./styles.module.css";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import { isObject } from "chart.js/dist/helpers/helpers.core";
export default function Menu() {
  const isMobile = useMediaQuery("(max-width: 480px)");
  return isMobile ? (
    <div className={styles.div}>
      <h1 className={styles.h1}>ProLogix WMS</h1>
      <div className={styles.div2}>
        <Link href={"/"} className={styles.link}>
          Inicio
        </Link>
        <Link href={"/Dashboard"} className={styles.link}>
          Dashboard
        </Link>
      </div>
    </div>
  ) : (
    <div className={styles.div}>
      <h1 className={styles.h1}>ProLogix WMS</h1>
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
