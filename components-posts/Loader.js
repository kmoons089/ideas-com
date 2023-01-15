import CircularProgress from "@mui/material/CircularProgress";
import style from "../styles/logo.module.css";

export const Loader = () => {
  return (
    <div>
      <main className={style.loader}>
        <CircularProgress />
      </main>
    </div>
  );
};
