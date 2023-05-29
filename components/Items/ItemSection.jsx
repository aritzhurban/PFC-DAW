import styles from "./ItemSection.module.css";
import clsx from "clsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Platforms } from "./Platforms/Platforms";
import dateFormat from "dateformat";
import Image from "next/image";
import Link from "next/link";

export function ItemSection({ items, displayAsBlock }) {
  const displayBlock = clsx({
    [styles.displayAsBlock]: displayAsBlock,
  });

  return (
    <section className={`${styles.content_wrapper} ${displayBlock}`}>
      {items?.map((item) => {
        const metacriticStyles = clsx({
          [styles.card_info_metacritic]: true,
          [styles.isYellow]: item.metacritic < 85,
          [styles.isGreen]: item.metacritic >= 85,
        });
        return (
          <div name="card" key={item.id} className={styles.card}>
            <div className={styles.card_img_box}>
              {item.image ? (
                <LazyLoadImage
                  className={styles.LazyLoadImage}
                  src={item.image}
                  alt={item.name}
                  effect="blur"
                  width={"100%"}
                  height={"100%"}
                />
              ) : (
                <img
                  src="./image_not_found.PNG"
                  alt="image not found"
                  className={styles.LazyLoadImage}
                />
              )}
            </div>
            <div className={styles.card_info}>
              <header className={styles.card_info_header}>
                <div className={styles.card_platforms}>
                  <Platforms platforms={item.platforms} />
                </div>
                {item.metacritic ? (
                  <div className={metacriticStyles}>{item.metacritic}</div>
                ) : (
                  ""
                )}
              </header>
              <main>
                <h2 className="">{item.name}</h2>
              </main>
              <footer className={styles.footer}>
                {item.released ? (
                  <div className={styles.footer_info_row}>
                    <span>Release date:</span>
                    <span>{item.released}</span>
                  </div>
                ) : (
                  <div className={styles.footer_info_row}>
                    <span>Update date:</span>
                    <span>{dateFormat(item.updated, "dd/mm/yyyy")}</span>
                  </div>
                )}
                {item?.genres?.length > 1 && (
                  <div className={styles.footer_info_row}>
                    <span>Genres:</span>
                    <div>
                      {item.genres.slice(0, 3).map((genre, index) => {
                        return (
                          <span key={genre.slug}>
                            <Link href={`/games/genres/${genre.slug}`}><span>{genre.name}</span></Link>
                            <span>
                              {index < item.genres.slice(0, 3).length - 1 &&
                                ", "}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className={styles.footer_info_row}>
                  <Link
                    href={`/games/${item.id}`}
                    
                  >
                    <a className={styles.footer_link_more}>
                      <span>See game details</span>
                      <Image
                        className={styles.select_button_icon}
                        width={8}
                        height={14}
                        alt="arrow"
                        src="/arrow.svg"
                      />
                    </a>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        );
      })}
    </section>
  );
}
