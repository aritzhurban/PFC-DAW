import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Platforms } from "../../components/Items/Platforms/Platforms";
import styles from "./Game.module.css";
import dateFormat from "dateformat";
import { Loader } from "../../components/Loader/Loader";
import { RatingBar } from "../../components/Items/RatingBar/RatingBar";
import { Whishlist } from "../../components/Items/Whishlist/Whishlist";
import ReadMoreReact from "read-more-react";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";

export default function GameInfo() {
  const router = useRouter();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!router.isReady) return;
    const URL_GAMES = new URL(`https://rawg.io/api/games/${router.query.id}`);

    fetch(`${URL_GAMES}?key=e38f1a9c10804014b6a7435b854e0098`)
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, ...data };
        });
      });

    fetch(`${URL_GAMES}/game-series?key=e38f1a9c10804014b6a7435b854e0098`)
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, series: [...data.results] };
        });
      });

    fetch(`${URL_GAMES}/screenshots?key=e38f1a9c10804014b6a7435b854e0098`)
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, screenshots: [...data.results] };
        });
      });

    fetch(`${URL_GAMES}/collections?key=e38f1a9c10804014b6a7435b854e0098`)
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, collections: [...data.results] };
        });
      })
    fetch(
      `https://rawg.io/api/leaderboard/games/${router.query.id}?key=e38f1a9c10804014b6a7435b854e0098`
    )
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, contributors: [...data.results] };
        });
      })
      fetch(
        `https://rawg.io/api/games/${router.query.id}/reddit?key=e38f1a9c10804014b6a7435b854e0098`
      )
        .then((res) => res.json())
        .then((data) => {
          setItem((prev) => {
            return { ...prev, posts_count: data.count, reddit: [...data.results] };
          });
        })
    fetch(`${URL_GAMES}/development-team?key=e38f1a9c10804014b6a7435b854e0098`)
      .then((res) => res.json())
      .then((data) => {
        setItem((prev) => {
          return { ...prev, creators: [...data.results] };
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.isReady, router.query.id]);

  console.log(item.posts_count);

  return (
    <>
      <div
        className={styles.background}
        style={{
          backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${item?.background_image})`,
        }}
      />
      <section className={styles.main}>
        {loading ? (
          <Loader />
        ) : (
          <section className={styles.content_wrapper}>
            <p className={styles.breadcrumbs}>
              HOME<span>/</span>GAMES<span>/</span>
              {item?.name}
            </p>
            <section className={styles.column_wrapper}>
              <div className={styles.column}>
                <div className={styles.header}>
                  {item?.released && (
                    <p className={styles.released}>
                      {dateFormat(item?.released, "mmm dd, yyyy").toUpperCase()}
                    </p>
                  )}
                  <Platforms platforms={item?.parent_platforms} />
                  {item?.playtime !== 0 && (
                    <p>
                      AVERAGE PLAYTIME: <span>{item?.playtime}</span> HOURS
                    </p>
                  )}
                </div>
                <div>
                  <p className={styles.title}>{item?.name}</p>
                </div>
                <Whishlist />
                <RatingBar ratings={item?.ratings} />
                {item?.description_raw && (
                  <section className={styles.about}>
                    <h1>About</h1>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        wordBreak: "break-all",
                        maxWidth: "100%",
                      }}
                    >
                      <ReadMoreReact
                        text={item?.description_raw}
                        min={150}
                        ideal={250}
                        max={350}
                        readMoreText="Read More"
                      />
                    </div>
                  </section>
                )}
                <section className={styles.game_info}>
                  {item?.platforms && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Platforms</h1>
                      <p className={styles.game_info_paragraph}>
                        {item?.platforms?.map((row) => {
                          return (
                            <Link href="/" key={row.platform.id}>
                              <span className={styles.game_info_link}>
                                {row.platform.name}
                                <span className={styles.game_info_comma}>
                                  ,
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </p>
                    </div>
                  )}
                  {item?.metacritic && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Metascore</h1>
                      <div className={styles.game_info_paragraph}>
                        {item.metacritic && (
                          <p
                            className={`${styles.metacritic} ${
                              item.metacritic >= 85
                                ? styles.isGreen
                                : styles.isYellow
                            }`}
                          >
                            {item.metacritic}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {item?.genres && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Genres</h1>
                      <div className={styles.game_info_paragraph}>
                        {item?.genres?.map((row) => {
                          return (
                            <Link href="/" key={row.id}>
                              <span className={styles.game_info_link}>
                                {row.name}
                                <span className={styles.game_info_comma}>
                                  ,
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className={styles.game_info_spec}>
                    <h1 className={styles.game_info_title}>Release Date</h1>
                    <div className={styles.game_info_paragraph}>
                      {item?.released
                        ? dateFormat(
                            item.released,
                            "mmm dd, yyyy"
                          ).toUpperCase()
                        : "TBA"}
                    </div>
                  </div>
                  {item?.developers && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Developer</h1>
                      <div className={styles.game_info_paragraph}>
                        {item?.developers?.map((row) => {
                          return (
                            <Link href="/" key={row.id}>
                              <span className={styles.game_info_link}>
                                {row.name}
                                <span className={styles.game_info_comma}>
                                  ,
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {item?.publishers && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Publisher</h1>
                      <div className={styles.game_info_paragraph}>
                        {item?.publishers?.map((row) => {
                          return (
                            <div key={row.id}>
                              <Link href="/">
                                <span className={styles.game_info_link}>
                                  {row.name}
                                </span>
                              </Link>
                              <span className={styles.game_info_comma}>,</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {item?.esrb_rating && (
                    <div className={styles.game_info_spec}>
                      <h1 className={styles.game_info_title}>Age rating</h1>
                      <p className={styles.game_info_paragraph}>
                        {item.esrb_rating
                          ? item.esrb_rating.name
                          : "Not rating"}
                      </p>
                    </div>
                  )}
                  {item?.series?.length > 0 && (
                    <div
                      className={`${styles.game_info_spec} ${styles.width_100}`}
                    >
                      <h1 className={styles.game_info_title}>
                        Other games in the series
                      </h1>
                      <div className={styles.game_info_paragraph}>
                        {item?.series?.map((row) => {
                          return (
                            <Link href={`/games/${row.slug}`} key={row.id}>
                              <span className={styles.game_info_link}>
                                {row.name}
                                <span className={styles.game_info_comma}>
                                  ,
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {item?.tags && (
                    <div
                      className={`${styles.game_info_spec} ${styles.width_100}`}
                    >
                      <h1 className={styles.game_info_title}>Tags</h1>
                      <div className={styles.game_info_paragraph}>
                        {item?.tags?.map((row) => {
                          return (
                            <Link href="/" key={row.id}>
                              <span className={styles.game_info_link}>
                                {row.name}
                                <span className={styles.game_info_comma}>
                                  ,
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {item?.website && (
                    <div
                      className={`${styles.game_info_spec} ${styles.width_100}`}
                    >
                      <h1 className={styles.game_info_title}>Website</h1>
                      <div className={styles.game_info_paragraph}>
                        <Link href={`${item.website}`}>
                          <span className={styles.game_info_link}>
                            {item.website}
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                  {item?.platforms && (
                    <div
                      className={`${styles.game_info_spec} ${
                        readMore && styles.system_requirements_wrapper
                      } ${styles.width_100}`}
                    >
                      <div className={styles.game_info_paragraph}>
                        {item?.platforms?.map((row, index) => {
                          return (
                            <div key={index}>
                              <p className={styles.system_requirements}>
                                System requirements for {row?.platform?.name}
                              </p>
                              {row?.requirements && (
                                <div>
                                  {row?.requirements?.minimum
                                    ?.split("\n")
                                    .map((line, indexLine) => {
                                      return (
                                        <li
                                          key={`line${indexLine}`}
                                          className={styles.system_minimum}
                                        >
                                          {line
                                            .split(": ")
                                            .map((word, indexWord) => {
                                              if (indexLine === 0) {
                                                return (
                                                  <span
                                                    key={`word${indexLine}${indexWord}`}
                                                  >
                                                    {line}
                                                  </span>
                                                );
                                              }
                                              return (
                                                <span
                                                  key={`word${indexLine}${indexWord}`}
                                                >
                                                  {indexWord === 0
                                                    ? `${word}: `
                                                    : word}
                                                </span>
                                              );
                                            })}
                                        </li>
                                      );
                                    })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div
                    className={styles.readMoreRequirements}
                    onClick={() => {
                      setReadMore((prev) => !prev);
                    }}
                  >
                    {readMore ? "Read More..." : "Show Less"}
                  </div>
                </section>
              </div>
              <div className={styles.column}>
                {item?.screenshots && (
                  <div className={styles.gallery}>
                    {item?.screenshots?.slice(0, 4).map((image) => {
                      if (image.is_deleted) return;
                      return (
                        <div key={image.id} className={styles.gallery_item}>
                          <img
                            src={image.image}
                            className={styles.gallery_image}
                          />
                        </div>
                      );
                    })}
                    {item?.screenshots?.length > 4 && (
                      <div
                        className={`${styles.gallery_item} ${styles.gallery_item_more}`}
                        style={{
                          backgroundImage: `url(${item?.screenshots[4]?.image})`,
                        }}
                      >
                        <span>. . .</span>
                        <span>view all</span>
                      </div>
                    )}
                  </div>
                )}
                {item?.stores?.length > 0 && (
                  <div className={styles.game_stores}>
                    <h1 className={styles.game_info_title}>Where to buy</h1>
                    <div className={styles.stores_buttons}>
                      {item?.stores?.map((store) => {
                        return (
                          <a key={store?.id} href={store?.store?.domain}>
                            <div className={styles.store_button}>
                              <span>{store?.store?.name}</span>
                              <ReactSVG src={`/${store?.store?.slug}.svg`} />
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
                {item?.contributors?.length > 0 && (
                  <div className={styles.game_stores}>
                    <h1 className={styles.game_info_title}>Top Contributors</h1>
                    <div className={styles.contributors}>
                      {item?.contributors?.map((contributor) => {
                        return (
                          <div
                            className={styles.contributor}
                            key={contributor?.user?.id}
                          >
                            <div className={styles.contributor_info}>
                              {contributor?.user?.avatar ? (
                                <img
                                  src={contributor?.user?.avatar}
                                  className={styles.contributor_avatar}
                                />
                              ) : (
                                <div
                                  className={`${styles.contributor_avatar} ${styles.contributor_avatar_background}`}
                                >
                                  <span>
                                    {contributor?.user?.username?.split("")[0]}
                                  </span>
                                </div>
                              )}
                              <div className={styles.contributor_info_wrapper}>
                                <span>{contributor?.user?.username}</span>
                                <span>
                                  {contributor?.editing_count}{" "}
                                  {contributor?.editing_count > 0
                                    ? "edits"
                                    : "edit"}
                                </span>
                              </div>
                            </div>
                            <button className={styles.contributor_button}>
                              <span>+</span>
                              <span>Follow</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {item?.collections?.length > 0 && (
                  <div className={styles.collections}>
                    <div className={styles.collections_title_wrapper}>
                      <h1 className={styles.collections_title}>
                        Collections with {item?.name}
                      </h1>
                      <h3 className={styles.collections_subtitle}>
                        <span>{item.collections.length}</span> collections
                      </h3>
                    </div>
                    <div className={styles.collections_rows}>
                      {item?.collections?.slice(0, 3).map((collection) => {
                        return (
                          <div key={collection?.id}>
                            <div className={styles.collection}>
                              <div className={styles.collection_gallery}>
                                {collection?.backgrounds?.map((bg, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        backgroundImage: `url(${bg.url})`,
                                      }}
                                      className={styles.collection_image}
                                    />
                                  );
                                })}
                              </div>
                              <div className={styles.collection_info}>
                                <span>{collection?.name}</span>
                                <span>
                                  {collection?.games_count}{" "}
                                  {collection?.games_count > 1
                                    ? "GAMES"
                                    : "GAME"}
                                </span>
                                <span>
                                  {collection?.likes_count}{" "}
                                  {collection?.likes_count > 1
                                    ? "LIKES"
                                    : "LIKE"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
            {item?.creators?.length > 0 && (
              <section className={styles.game_creators}>
                <div className={styles.game_title_wrapper}>
                  <h1 className={styles.game_title}>{item?.name} created by</h1>
                  <h3 className={styles.game_creators_count}></h3>
                </div>
                <Swiper
                  spaceBetween={30}
                  slidesPerView={3}
                  slidesPerGroup={3}
                  loop={true}
                  className={`${styles.creators_wrapper} mySwiper`}
                  modules={[Navigation]}
                  navigation={{ nextEl: "#nextEl", prevEl: "#prevEl" }}
                  speed={800}
                >
                  {item.creators
                    .slice(
                      0,
                      item.creators.length >= 5
                        ? 5
                        : item.creators.length >= 3
                        ? 3
                        : item.creators.length
                    )
                    .map((creator) => {
                      console.log(creator);
                      return (
                        <SwiperSlide
                          className={styles.swiper_item}
                          key={creator.id}
                          style={{
                            backgroundColor: "rgb(32, 32, 32)",
                            backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${creator.image_background})`,
                          }}
                        >
                          <div className={styles.creator_header}>
                            {creator.image && (
                              <div
                                style={{
                                  backgroundImage: `url(${creator.image})`,
                                }}
                                className={styles.creator_image}
                              />
                            )}
                            <p
                              className={`${styles.game_info_link} ${styles.creator_name}`}
                            >
                              {creator.name}
                            </p>
                            <p className={styles.creator_position}>
                              {creator.positions?.map((position) => {
                                return (
                                  <span key={position.id}>
                                    {position.name}
                                    <span className={styles.game_info_comma}>
                                      ,{" "}
                                    </span>
                                  </span>
                                );
                              })}
                            </p>
                          </div>
                          <div className={styles.creator_footer}>
                            <div className={styles.creator_footer_known}>
                              <span>Known for</span>
                              <span>{creator.games_count}</span>
                            </div>
                            {creator?.games?.map((game) => {
                              return (
                                <div
                                  key={game.id}
                                  className={styles.creator_game}
                                >
                                  <Link href={`/games/${game.id}`}><span className={styles.game_info_link}>{game.name}</span></Link>
                                  <span>{game.added}</span>
                                </div>
                              );
                            })}
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  <SwiperSlide
                    className={`${styles.swiper_item} ${styles.more_button}`}
                    style={{
                      backgroundColor: "rgb(32, 32, 32)",
                    }}
                  >
                    {item.creators.length >= 5 && (
                      // TODO: End creators card
                      <div className={styles.creator_info}>
                        {item.creators.length > 3 && (
                          <div className={styles.creators_more_button}>
                            More
                          </div>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                </Swiper>
                {item.creators.length >= 5 && (
                  <div id="nextEl" className={styles.nextEl}>
                    <svg
                      style={{
                        width: "15px",
                        height: "25px",
                        fontSize: "14px",
                      }}
                      viewBox="0 0 19 35"
                      width="19"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.414 16.476l-15-15A2 2 0 10.586 4.304L14.172 17.89.586 31.476a2 2 0 102.828 2.828l15-15a2 2 0 000-2.828z"
                        fill="#FFF"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                {item.creators.length >= 5 && (
                  <div id="prevEl" className={styles.prevEl}>
                    <svg
                      style={{
                        width: "15px",
                        height: "25px",
                        fontSize: "14px",
                      }}
                      viewBox="0 0 19 35"
                      width="19"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.414 16.476l-15-15A2 2 0 10.586 4.304L14.172 17.89.586 31.476a2 2 0 102.828 2.828l15-15a2 2 0 000-2.828z"
                        fill="#FFF"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
              </section>
              )}
              {item?.reddit?.length > 0 && <section className={styles.posts}>
                <div className={styles.posts_header}>
                  <div className={styles.game_title}><span>{item.name} posts</span></div>
                  <div className={styles.posts_count}><span>{item.posts_count} posts</span></div>
                </div>
                <div className={styles.posts_content}>
                  {item.reddit.slice(0,6).map((post) => {
                    return <div key={post.id} className={`${styles.post} ${styles.game_info_link}`}>
                      <div className={styles.post_content} >
                        { post.image && <div style={{ backgroundImage: `url(${post.image})` }} />}
                        <span className={styles.post_description}>{post.name}</span>
                      </div>
                      <div className={styles.post_footer}>
                        <span>{dateFormat(post.created, "mmm dd, yyyy")}</span>
                        <span>·</span>
                        <span>{post.username.split("/u/")}</span>
                      </div>
                    </div>
                  })}
                </div>
              </section>}
          </section>
        )}
      </section>
    </>
  );
}
