import Link from "next/link";
import { useState } from "react";
import styles from "./Aside.module.css";

export default function Aside() {
  const ASIDE_LINKS = [
    {
      id: "1",
      title: "Home",
      link: "/",
    },
    {
      id: "2",
      title: "New Releases",
      link: "",
      rows: [
        {
          id: "3",
          title: "Last 30 days",
          icon: "/star.svg",
          link: "/games/recent-games-past",
        },
        {
          id: "4",
          title: "This week",
          icon: "/fire.svg",
          link: "/games/recent-games",
        },
        {
          id: "5",
          title: "Next week",
          icon: "/next.svg",
          link: "/games/next-week",
        }
      ],
    },
    {
      id: "7",
      title: "Top",
      link: "",
      rows: [
        {
          id: "8",
          title: "Best of the year",
          icon: "/bestOfTheYear.svg",
          link: "/games/best-of-the-year",
        },
        {
          id: "9",
          title: "Popular in 2022",
          icon: "/popular.svg",
          link: "/games/popular-in-2022",
        },
        {
          id: "10",
          title: "All time top 250",
          icon: "/allTime.svg",
          link: "/games/all-time-top",
        },
      ],
    },{
      id: "20",
      title: "Platforms",
      link: "/games/platforms",
      rows: [
        {
          id: "21",
          title: "PC",
          icon: "/pc.svg",
          link: "/games/platforms/1",
        },
        {
          id: "22",
          title: "PlayStation",
          icon: "/playstation.svg",
          link: "/games/platforms/2",
        },
        {
          id: "23",
          title: "Xbox",
          icon: "/xbox.svg",
          link: "/games/platforms/3",
        },
        {
          id: "24",
          title: "Nintendo",
          icon: "/nintendo.svg",
          link: "/games/platforms/7",
        },
        {
          id: "25",
          title: "iOS",
          icon: "/apple.svg",
          link: "/games/platforms/4",
        },
        {
          id: "26",
          title: "Android",
          icon: "/google-play.svg",
          link: "/games/platforms/8",
        }
      ],
    },
    {
      id: "27",
      title: "Genres",
      link: "/games/genres",
      rows: [
        {
          id: "28",
          title: "Action",
          image:
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          link: "/games/genres/action",
        },
        {
          id: "29",
          title: "Strategy",
          image:
            "https://media.rawg.io/media/games/054/0549f1a0a5e782d4e81cdf8d022073fa.jpg",
          link: "/games/genres/strategy",
        },
        {
          id: "30",
          title: "RPG",
          image:
            "https://media.rawg.io/media/games/0fd/0fd84d36596a83ef2e5a35f63a072218.jpg",
          link: "/games/genres/role-playing-games-rpg",
        },
        {
          id: "31",
          title: "Shooter",
          image:
            "https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg",
          link: "/games/genres/shooter",
        },
        {
          id: "32",
          title: "Adventure",
          image:
            "https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg",
          link: "/games/genres/adventure",
        },
        {
          id: "33",
          title: "Puzzle",
          image:
            "https://media.rawg.io/media/games/5aa/5aa4c12a53bc5f606bf8d92461ec747d.jpg",
          link: "/games/genres/puzzle",
        },
        {
          id: "34",
          title: "Racing",
          image:
            "https://media.rawg.io/media/games/d16/d160819f22de73d29813f7b6dad815f9.jpg",
          link: "/games/genres/racing",
        },
        {
          id: "35",
          title: "Sports",
          image:
            "https://media.rawg.io/media/games/11f/11fd681c312c14644ab360888dba3486.jpg",
          link: "/games/genres/sports",
        },
      ],
    },
  ];

  return (
    <aside className={styles.aside} id="aside">
      <ul className={styles.rows} id="sidebar__inner">
        {ASIDE_LINKS.map((item, index) => {
          const [show, setShow] = useState(true);
          const rowCount =
            show && item?.rows?.length > 4 ? 3 : item?.rows?.length;
          return (
            <div key={item.id}>
              <li className={styles.title}><Link href={item.link}><span>{item?.title}</span></Link></li>
              {item?.rows?.slice(0, rowCount).map((row, index) => {
                return (
                  <Link href={row.link} key={row.id}>
                    <li>
                      <div className={styles.row}>
                        {row.icon ? (
                          <div className={styles.aside_list_icon}>
                            <img className={styles.img} src={row.icon} />
                          </div>
                        ) : (
                          <img
                            src={row.image}
                            className={styles.aside_list_icons}
                          />
                        )}
                        <span>{row.title}</span>
                      </div>
                    </li>
                  </Link>
                );
              })}
              {item?.rows?.length > 4 && (
                <li
                  onClick={() => {
                    setShow((prev) => !prev);
                  }}
                  style={{ filter: "brightness(.5)" }}
                >
                  <div className={styles.row}>
                    <div className={styles.aside_list_icon}>
                      <img
                        className={styles.img}
                        src="/hideShow.svg"
                        style={{
                          transform: `rotate(${show ? "90" : "-90"}deg)`,
                        }}
                      />
                    </div>
                    <span>{show ? "Show" : "Hide"}</span>
                  </div>
                </li>
              )}
            </div>
          );
        })}
      </ul>
    </aside>
  );
}
