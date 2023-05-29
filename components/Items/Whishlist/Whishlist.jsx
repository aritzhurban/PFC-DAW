import Link from "next/link";
import styles from "./Whishlist.module.css"

export function Whishlist() {
    return <div className={styles.whishlist}>
    <Link href="/">
      <button className={styles.whishlist_button}>
        <div className={styles.whishlist_button_text}>
          <span className={styles.button_subtitle}>Add to</span>
          <span className={styles.button_title}>My Games</span>
        </div>
        <img
          src="/genres.svg"
          className={styles.whishlist_button_img}
        />
      </button>
    </Link>
    <Link href="/">
      <button className={styles.whishlist_button}>
        <div className={styles.whishlist_button_text}>
          <span className={styles.button_subtitle}>Add to</span>
          <span className={styles.button_title}>Whishlist</span>
        </div>
        <img
          src="/heart.svg"
          className={styles.whishlist_button_img}
        />
      </button>
    </Link>
    <Link href="/">
      <button className={styles.whishlist_button}>
        <div className={styles.whishlist_button_text}>
          <span className={styles.button_subtitle}>Save to</span>
          <span className={styles.button_title}>Collection</span>
        </div>
        <img
          src="/collections.svg"
          className={styles.whishlist_button_img}
        />
      </button>
    </Link>
  </div>
}