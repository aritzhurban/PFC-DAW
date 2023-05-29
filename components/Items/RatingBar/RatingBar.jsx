import styles from "./RatingBar.module.css";

export function RatingBar({ ratings }) {
  return (
    <section className={styles.rating_section}>
      <div className={styles.ratingBar}>
        {ratings &&
          ratings.map((rating) => {
            if (rating.title === "exceptional")
              return (
                <div
                  key={rating.id}
                  className={`${styles.ratingBar_section} ${styles.color_exceptional}`}
                  style={{ width: `${rating.percent}%` }}
                ></div>
              );
            if (rating.title === "recommended")
              return (
                <div
                  key={rating.id}
                  className={`${styles.ratingBar_section} ${styles.color_recommended}`}
                  style={{ width: `${rating.percent}%` }}
                ></div>
              );
            if (rating.title === "meh")
              return (
                <div
                  key={rating.id}
                  className={`${styles.ratingBar_section} ${styles.color_meh}`}
                  style={{ width: `${rating.percent}%` }}
                ></div>
              );
            if (rating.title === "skip")
              return (
                <div
                  key={rating.id}
                  className={`${styles.ratingBar_section} ${styles.color_skip}`}
                  style={{ width: `${rating.percent}%` }}
                ></div>
              );
          })}
      </div>
      <div className={styles.rating_description}>
        {ratings &&
          ratings.map((rating) => {
            if (rating.title === "exceptional")
              return (
                <div
                  key={rating.id}
                  className={styles.rating_description_group}
                >
                  <div className={`${styles.rating_description_dot} ${styles.color_exceptional}`} />
                  <p className={styles.rating_description_label}>
                    {rating.title}
                    <span>{rating.count}</span>
                  </p>
                </div>
              );
            if (rating.title === "recommended")
              return (
                <div
                  key={rating.id}
                  className={styles.rating_description_group}
                >
                  <div className={`${styles.rating_description_dot} ${styles.color_recommended}`} />
                  <p className={styles.rating_description_label}>
                    {rating.title}
                    <span>{rating.count}</span>
                  </p>
                </div>
              );
            if (rating.title === "meh")
              return (
                <div
                  key={rating.id}
                  className={styles.rating_description_group}
                >
                  <div className={`${styles.rating_description_dot} ${styles.color_meh}`} />
                  <p className={styles.rating_description_label}>
                    {rating.title}
                    <span>{rating.count}</span>
                  </p>
                </div>
              );
            if (rating.title === "skip")
              return (
                <div
                  key={rating.id}
                  className={styles.rating_description_group}
                >
                  <div className={`${styles.rating_description_dot} ${styles.color_skip}`} />
                  <p className={styles.rating_description_label}>
                    {rating.title}
                    <span>{rating.count}</span>
                  </p>
                </div>
              );
          })}
      </div>
    </section>
  );
}
