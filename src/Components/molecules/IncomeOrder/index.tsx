import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import apis from "@/helpers/apis/getOrderIn";
import request from "@/helpers/request";
import { OrderDetails } from "@/types/order";
import { useState } from "react";

interface Props {
  onChangeOrder: (order: OrderDetails) => void;
}
export default function IncomeOrder(props: Props) {
  // Queries
  const query = useQuery({
    queryFn: () => request(apis.getOrderIn),
    queryKey: [apis.getOrderIn],
  });
  const data = query.data;
  // Search order by orderID
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };
  return (
    <>
      <div className={styles.searchContainer}>
        Ordenes de ingreso
        <i className={styles.fafasearch} onClick={handleSearchClick}>
          <AiOutlineSearch />
        </i>
        {searchActive && (
          <input
            type="number"
            placeholder="Search"
            className={styles.searchbar}
            onChange={(e) => console.log(e.target.value)}
          />
        )}
      </div>
      <div className={styles.orderscontainer}>
        {data?.map((item: any, index: number) => (
          <div key={index} className={styles.order}>
            N°{item.OrdenID} <br></br> {index == 0 ? "Nuevo - " : null}
            {item.Status}
          </div>
        ))}
      </div>
    </>
  );
}
