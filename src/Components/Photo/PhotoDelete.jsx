import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const token = localStorage.getItem("token");
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) {
        navigate("/");
      }
    }
  };

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
