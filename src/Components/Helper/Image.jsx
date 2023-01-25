import React, { useState } from "react";
import styles from "./Image.module.css";

const Image = (props) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoading = ({ target }) => {
    setSkeleton((prevSkeleton) => prevSkeleton = false )
    target.style.opacity = 1;
  };

  return (
    <div className={styles.wrapper}>
      {skeleton &&  <div className={styles.skeleton}></div>}
      <img onLoad={handleLoading} className={styles.img} {...props} />
    </div>
  );
};

export default Image;
