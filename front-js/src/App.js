import { useEffect, useState } from "react";
import { Auth, Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { address } from "./config";
import axios from "axios";
import { Create } from "./pages/Create";

function App() {
  const [active, setActive] = useState();
  useEffect(() => {
    axios
      .post(
        `${address}/auth/provlogin`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setActive(response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Auth set={0} />} />
      <Route path="/register" element={<Auth set={1} />} />
      <Route path="/" element={active ? <Home /> : <Auth set={0} />} />
      <Route path="/create" element={<Create />} />
      <Route path="*" element={<h1>Error</h1>} />
    </Routes>
  );
}

export default App;
