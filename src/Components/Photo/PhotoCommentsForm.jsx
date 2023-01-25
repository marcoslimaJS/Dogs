import React, { useState } from "react";
import { COMMENT_POST } from "../../api";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const { request, error, loading } = useFetch();
  const [comment, setComment] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, token, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setComments((comments) => ([...comments, json]));
    }
  };

  return (
    <form className={`${styles.form} ${single ? styles.single: ''}`} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        nome="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
