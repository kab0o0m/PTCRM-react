import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("login") && !localStorage.getItem("exp")) {
      navigate("/");
    } else {
      const exp = localStorage.getItem("exp");
      console.log("current: ", Date.now() - new Date(exp).getTime());
      console.log("Expiry: ", new Date(exp).getTime());

      if (Date.now() - new Date(exp).getTime() > 0) {
        console.log("Token expired");
        localStorage.removeItem("login");
        localStorage.removeItem("exp");
        navigate("/");
      } else {
        setIsLogin(true);
      }
    }
  }, [navigate]);

  return (
    <div>
      {isLogin && (
        <div className="">
          <Navbar />
          <h1>Homepage</h1>
        </div>
      )}
    </div>
  );
};

export default Homepage;
