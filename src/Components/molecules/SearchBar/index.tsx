import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import apis2 from "@/helpers/apis/getProduct";
import request from "@/helpers/request";
export default function SearchBar() {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar producto"
        name=""
        className={styles.searchbar}
      />
    </>
  );
}
