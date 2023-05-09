import Menu from "@/Components/molecules/Menu";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "@/styles/Home.module.css";
// Create a client
const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.menu}>
        <Menu />
        <Home />
      </div>
    </QueryClientProvider>
  );
}
