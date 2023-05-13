import ProductDetails from "@/Components/molecules/ProductDetails";
import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Products.module.css";
import MobileHomeMenu from "@/Components/molecules/MobileHomeMenu";
import Menu from "@/Components/molecules/Menu";
export default function Products() {
  const [itemCode, setItemCode] = useState<string | null>(null);
  return (
    <>
      <Head>
        <title>WMS LogixPro - Productos</title>
      </Head>

      <main className={styles.main}>
        <Menu />
        <div className={styles.home}>
          <MobileHomeMenu />
          <div className={styles.productsDiv}>
            <ProductDetails itemCode={itemCode} setItemCode={setItemCode} />;
          </div>
        </div>
      </main>
    </>
  );
}
