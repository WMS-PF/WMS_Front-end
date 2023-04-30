import styles from "./styles.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import request from "@/helpers/request";

interface Props {
  value: string;
  setValue: (value: string) => void;
}
export default function SearchBar(props: Props) {
  return (
    <input
      type="text"
      placeholder="Buscar producto"
      className={styles.searchbar}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}
