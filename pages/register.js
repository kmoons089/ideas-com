import Login from "../components/Login";
import Register from "../components/Register";
import Meta from "../components/Meta";

import { useRouter } from "next/router";
import { useEffect } from "react";

const register = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Meta title="Login" />

      <Register />
    </div>
  );
};

export default register;
