import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { HookContext } from "../../pages/_app";
import { Loader } from "../Loader/Loader";
import { Platforms } from "../Items/Platforms/Platforms";

export default function NavBar() {
  const { count, searchedItems, query, changeQuery, loadingNavBar, changeUrl } =
    useContext(HookContext);
  const [isBig, setIsBig] = useState(false);

  function toggleActive() {
    document.getElementById("container").classList.toggle(`${styles.active}`);
  }

  function handleChangeQuery(event) {
    event.preventDefault();
    const newQuery = event.target.value;
    changeQuery(newQuery);
  }

  const updateResize = useCallback(() => {
    if (window.innerWidth > 979) {
      setIsBig(true);
    } else {
      setIsBig(false);
    }
  }, [isBig, setIsBig]);

  useEffect(() => {
    document.addEventListener("keyup", docAltEnter, false);
    const button = document.getElementById("button");
    button.addEventListener("click", toggleActive, false);
    window.addEventListener("resize", updateResize);

    updateResize();

    return () => {
      document.removeEventListener("keyup", docAltEnter);
      button.removeEventListener("click", toggleActive, false);
      window.removeEventListener("resize", updateResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__item}>
          <Link href="/">
            <div
              onClick={() => {changeUrl("https://rawg.io/api/games")}}
              className={`${styles.header__logo} ${styles.header__itemLink}`}
            >
              <div className={styles.logo}>RAWG</div>
            </div>
          </Link>
        </div>
        <div
          className={`${styles.header__item} ${styles.header__itemSearch}`}
          id="searchInput"
        >
          <div
            className={`${styles.header__item} ${styles.header__itemSearch} ${styles.header__itemCenter} ${styles.header__search}`}
          >
            <form
              className={styles.header__search_form}
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className={styles.header__search_input_area}>
                <input
                  className={styles.header__search_input}
                  type="text"
                  role="searchbox"
                  placeholder="Diablo III, The Last Of Us, League of Legends..."
                  value={query}
                  onChange={handleChangeQuery}
                />
                {!query && (
                  <div className={styles.header__search_hotkey}>
                    <span className={styles.header__search_hotkey_key}>
                      alt
                    </span>
                    <span>+</span>
                    <span className={styles.header__search_hotkey_key}>
                      enter
                    </span>
                  </div>
                )}
                {query && (
                  <div
                    className={styles.header__search_delete}
                    onClick={() => {
                      changeQuery("");
                    }}
                  >
                    <img
                      src="/close.svg"
                      alt="delete query button"
                      className={styles.delete_icon}
                    />
                  </div>
                )}
                {query && (
                  <div
                    className={`${styles.searchedItems_container}`}
                    style={{display: `${query && "flex"}`}}
                    id="searchDropdown"
                  >
                    {loadingNavBar ? (
                      <Loader />
                    ) : (
                      <ul className={styles.searchedItems_list}>
                        <li>Games {count.current}</li>
                        {searchedItems.map((item) => {
                          return (
                            <Link key={item.id} href={`/games/${item.id}`}>
                              <li className={styles.searchedItems_item}  onClick={() => {changeQuery("")}}>
                                <img src={item.image} alt={item.name} />
                                <div>
                                  <Platforms platforms={item.platforms} />
                                  <span>{item.name}</span>
                                </div>
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>
              <div
                className={`${styles.dropdown} ${styles.header__search_suggestions} ${styles.dropdown__search_suggestions}`}
              ></div>
            </form>
          </div>
        </div>
        <div className={styles.header__item}>
          <div className={styles.header__my_library}>
            <div className={styles.header__my_library_dropdown}>
              <div className={styles.dropdown} id="button">
                <div
                  className={styles.dropdown__button}
                  role="button"
                  tabIndex="0"
                >
                  <Link href="/">
                    <div
                      className={`${styles.header__item_link} ${styles.header__library_link}`}
                    >
                      <span>Login</span>
                    </div>
                  </Link>
                  <div className={styles.header__hamburguer_wrapper}>
                    <div className={styles.header__hamburguer} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function docAltEnter(e) {
  const input = document.querySelector("input");
  // this would test for whichever key is 40 (down arrow) and the ctrl key at the same time
  if (e.altKey && e.key === "Enter") {
    input.focus();
  }
}
