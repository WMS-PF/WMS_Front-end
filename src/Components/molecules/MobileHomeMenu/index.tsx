import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
export default function MobileHomeMenu() {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className={styles.mobileMenu}>
      <p>
        <Link
          href={"/"}
          className={
            styles.link +
            (router.pathname === "/Products" ? " " + styles.selected : "")
          }
        >
          Ordenes
        </Link>
      </p>
      <p>
        <Link
          href={"/Products"}
          className={
            styles.link +
            (router.pathname === "/Products" ? " " + styles.selected : "")
          }
        >
          Productos
        </Link>
      </p>
    </div>
  );
}
