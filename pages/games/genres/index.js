import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Genres() {
  const [items, setItems] = useState([]);

  function fetchItems() {
    const initialURL = new URL(
      `https://rawg.io/api/genres?key=e38f1a9c10804014b6a7435b854e0098`
    );
    fetch(initialURL)
      .then((response) => response.json())
      .then((data) => {
        const mappedItems = data?.results?.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.image_background,
            count: item.games_count,
            games: item.games,
          };
        });
        setItems(mappedItems);
      })
      .catch((error) => {
        console.error(error.message);
      })
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.content}>
      <header className={styles.content_header}>
        <div className={styles.content_header_title}>
          <h1 className={styles.heading}>Genres</h1>
        </div>
      </header>
      <section className={styles.content_wrapper}>
        {items?.map((item) => {
          return (
            <div
              name="card"
              key={item.id}
              className={styles.card}
              style={{
                backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${item.image})`,
              }}
            >
              <div className={styles.card_info}>
                <div className={styles.card_info_header}>
                  <Link href={`/games/genres/${item.id}`}><span className={`${styles.card_link} ${styles.card_header_title}`}>{item.name}</span></Link>
                </div>
                <div className={styles.card_info_footer}>
                  <div className={styles.card_footer_row}>
                    <span>Popular items</span>
                    <span>{item.count}</span>
                  </div>
                  {item.games.slice(0, 3).map((game) => {
                    return (
                      <div key={game.id} className={styles.card_footer_row}>
                        <Link href={`/games/${game.id}`}>
                          <span className={styles.card_link}>{game.name}</span>
                        </Link>
                        <span>{game.added}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <div className={styles.pagination_wrapper}>
        <div className={styles.pagination_button} id="pagination_button"></div>
      </div>
    </div>
  );
}
