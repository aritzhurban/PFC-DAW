import styles from "../../styles/Home.module.css";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { HookContext } from "../_app";
import { useDisplays } from "../../hooks/useDisplays";
import { ItemSection } from "../../components/Items/ItemSection";
import { Loader } from "../../components/Loader/Loader";
import { Dropdown } from "../../components/Items/Dropdowns/Dropdown";
import { useRouter } from "next/router";

export default function Games() {
  const router = useRouter();

  const {
    items,
    loadingBody,
    ordering,
    platform,
    next,
    changeOrdering,
    changePlatform,
    changePage,
  } = useContext(HookContext);

  const { displayList, changeDisplayList } = useDisplays();

  const ORDER_BY = [
    { name: "Relevance", id: "-updated" },
    { name: "Date added", id: "-created" },
    { name: "Name", id: "-name" },
    { name: "Release Date", id: "-released" },
    { name: "Popularity", id: "-metacritic" },
    { name: "Average rating", id: "-rating" },
  ];

  const PLATFORM_BY = [
    { name: "PC", id: "4" },
    { name: "iOS", id: "3" },
    { name: "Linux", id: "6" },
    { name: "PlayStation 4", id: "18" },
    { name: "PlayStation 5", id: "187" },
    { name: "Xbox", id: "80" },
    { name: "Android", id: "21" },
  ];

  useEffect(() => {

    if (!next) return;
    const paginationButton = document.getElementById("pagination_button");

    function pagination(entries) {
      entries.forEach((entry) => {
        if (window.scrollY < 500) return;
        if (entry.isIntersecting) {
          handleChangePage();
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => pagination(entries),
      { threshold: 0, rootMargin: "500px 0px 0px 0px" }
    );

    observer.observe(paginationButton);


    return () => {
      observer.disconnect();
    };
  }, [router.isReady]);

  useEffect(() => {

  },[next])

  function handleChangePage() {
    changePage();
  }

  //   const disablePagination = clsx({
  //     [styles.filter_selects]: next.current,
  //     [styles.displayNone]: !next.current,
  //   });

  const displayItemsAsGrid = clsx({
    [styles.active]: !displayList,
  });

  const displayItemsAsBlock = clsx({
    [styles.active]: displayList,
  });

  return (
    <div className={styles.content}>
      <header className={styles.content_header}>
        <div className={styles.content_header_title}>
          <h1 className={styles.heading}>New and Trending</h1>
          <p className={styles.subtitle}>Based on player counts and release date</p>
        </div>

        <div className={styles.displayBar}>
          <div className={styles.filter_selects}>
            <Dropdown
              changeDropdown={changePlatform}
              initialText="Platform"
              list={PLATFORM_BY}
              selectedElement={platform}
            />
            <Dropdown
              changeDropdown={changeOrdering}
              initialText="Ordering"
              list={ORDER_BY}
              selectedElement={ordering}
            />
          </div>
          <div className={styles.displayBar__buttons}>
            <p>Display Options: </p>
            <button
              id="button1"
              className={`${styles.displayBar__buttons_button} ${styles.displayBar__buttons_button_grid} ${displayItemsAsGrid}`}
              onClick={() => {
                changeDisplayList(false);
              }}
            ></button>
            <button
              id="button2"
              className={`${styles.displayBar__buttons_button} ${styles.displayBar__buttons_button_block} ${displayItemsAsBlock}`}
              onClick={() => {
                changeDisplayList(true);
              }}
            ></button>
          </div>
        </div>
      </header>

      {!loadingBody ? (
        <ItemSection items={items} displayAsBlock={displayList} />
      ) : (
        <Loader />
      )}
      <div className={styles.pagination_wrapper}>
        <div className={styles.pagination_button} id="pagination_button"></div>
      </div>
    </div>
  );
}
