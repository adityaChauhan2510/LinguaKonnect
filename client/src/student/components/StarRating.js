import React, { useState } from "react";
import axios from "axios";
import styles from "./StarRating.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function StarRating({ rating, hover, handleRating, setHover }) {
  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? styles.on : styles.off}
            onClick={() => handleRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className={styles.star}>&#9733;</span>
          </button>
        );
      })}
      <Toaster />
    </div>
  );
}
