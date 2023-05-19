import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { serverURL } from "../../../serverUrl";

export default function PrivetAdminroute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${serverURL}/api/v1/auth/admin-auth`);

      if (res.data.ok) {
        setOk(true);
        console.log("admin")
      } else {
        setOk(false);
        console.log("normal")
      }
    };

    if(auth?.token) {
        authCheck()
    }

  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/"/>;
}
