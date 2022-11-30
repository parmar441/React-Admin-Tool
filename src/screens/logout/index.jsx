import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../firebase";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [navigate]);
}

export default Logout;
