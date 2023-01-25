import React, { useEffect, useState } from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/conta/postar":
        setTitle((prevTitle) => (prevTitle = "Poste Sua Foto"));
        break;
      case "/conta/estatisticas":
        setTitle((prevTitle) => (prevTitle = "Estatísticas"));
        break;
      default:
        setTitle((prevTitle) => (prevTitle = "Minha Conta"));
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
