import styles from "../../../styles/Home.module.css";
import clsx from "clsx";
import { useDisplays } from "../../../hooks/useDisplays";
import { ItemSection } from "../../../components/Items/ItemSection";
import { Loader } from "../../../components/Loader/Loader";
import { Dropdown } from "../../../components/Items/Dropdowns/Dropdown";
import { useEffect, useRef, useState } from "react";
import dateFormat from "dateformat";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Genre() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [genre, setGenre] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState("");
  const [ordering, setOrdering] = useState("");
  const [dates, setDates] = useState("");
  const [page, setPage] = useState(1);
  const next = useRef();
  const isFirstRender = useRef(true);
  const [show, setShow] = useState(true);
  const tagsCount = show ? 6 : 20;

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

  const DATE_BY = [
    { name: "1970-1979", id: "1970-01-01,1979-12-31" },
    { name: "1980-1989", id: "1980-01-01,1989-12-31" },
    { name: "1990-1999", id: "1990-01-01,1999-12-31" },
    { name: "2000-2009", id: "2000-01-01,2009-12-31" },
    { name: "2010-2019", id: "2010-01-01,2019-12-31" },
    {
      name: "2020-2023",
      id: `2020-01-01,${dateFormat(Date.now(), "yyyy-mm-dd")}`,
    },
  ];

  function fetchInitialItems() {
    setLoading(true);
    const initialURL = new URL(
      `https://rawg.io/api/games?genres=${router.query.id}&key=e38f1a9c10804014b6a7435b854e0098`
    );
    platform && initialURL.searchParams.set("platforms", platform);
    ordering && initialURL.searchParams.set("ordering", ordering);
    dates && initialURL.searchParams.set("dates", dates);
    fetch(initialURL)
      .then((response) => response.json())
      .then((data) => {
        next.current = data.next;
        const mappedItems =
          data.results.length > 0 &&
          data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              released: item.released,
              updated: item.updated,
              image: item.background_image,
              metacritic: item.metacritic,
              platforms: item.parent_platforms,
              genres: item.genres,
              screenshots: item.short_screenshots,
              tags: item.tags,
            };
          });
        setItems(removeDuplicates(mappedItems));
        const mappedTags =
          data.results.length > 0 &&
          data.results
            .map((item) => {
              return item.tags.map((tagArray) => {
                if (tagArray.language === "eng")
                  return { id: tagArray.id, name: tagArray.name };
              });
            })
            .flat()
            .filter((x) => x)
            .slice(0, 20);
        console.log(mappedTags);
        setTags(removeDuplicates(mappedTags));

        console.log(tags);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
        isFirstRender.current = false;
      });
  }

  function fetchGenre() {
    const initialURL = new URL(
      `https://rawg.io/api/genres/${router.query.id}?key=e38f1a9c10804014b6a7435b854e0098`
    );
    platform && initialURL.searchParams.set("platforms", platform);
    ordering && initialURL.searchParams.set("ordering", ordering);
    fetch(initialURL)
      .then((response) => response.json())
      .then((data) => {
        setGenre(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function fetchPaginationItems() {
    if (!next.current) return;
    fetch(next.current)
      .then((response) => response.json())
      .then((data) => {
        next.current = data.next;
        const mappedItems =
          data.results.length > 0 &&
          data.results.map((item) => {
            return {
              id: item.id,
              name: item.name,
              released: item.released,
              updated: item.updated,
              image: item.background_image,
              metacritic: item.metacritic,
              platforms: item.parent_platforms,
              genres: item.genres,
              screenshots: item.short_screenshots,
            };
          });
        setItems(removeDuplicates([...items, ...mappedItems]));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function changePlatform(platform) {
    setPlatform(platform);
  }

  function changeOrdering(ordering) {
    setOrdering(ordering);
  }

  function changePage() {
    setPage((prev) => prev + 1);
  }

  function removeDuplicates(arr) {
    const seen = [];
    const retArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (!(arr[i].id in seen)) {
        retArr.push(arr[i]);
        seen[arr[i].id] = true;
      }
    }
    return retArr;
  }

  useEffect(() => {
    if (!router.isReady) return;
    setDates();
    setPlatform();
    setOrdering();
    fetchGenre();
    // fetchTags();
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!router.isReady) return;
    fetchInitialItems();
  }, [platform, ordering, dates, router.isReady, router.query.id]);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (page === 1) return;

    fetchPaginationItems();
  }, [page]);

  useEffect(() => {
    const button = document.getElementById("pagination_button");

    function pagination(entries) {
      entries.forEach((entry) => {
        if (window.scrollY < 500) return;
        if (entry.isIntersecting) {
          changePage();
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => pagination(entries),
      { threshold: 0, rootMargin: "500px 0px 0px 0px" }
    );

    observer.observe(button);

    if (!next) observer.disconnect();

    return () => {
      observer.disconnect();
    };
  }, [next]);

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
          <h1 className={styles.heading}>
            {platform &&
              PLATFORM_BY.map((plat) => {
                if (plat.key === platform) return `${plat.text} `;
              })}
            {genre.name}
            {" games"}
            {dates &&
              DATE_BY.map((date) => {
                if (date.key === dates) return ` of ${date.text}`;
              })}
          </h1>
          <div className={styles.subtitle}>
            {genre?.description && (
              <ReadMoreReact
                text={genre.description.replace(/<[^>]+>|&#39;/g, "")}
                min={600}
                ideal={650}
                max={700}
                readMoreText="Read More"
              />
            )}
          </div>
          <div className={styles.related_tags}>
            Related tags:{" "}
            {tags.slice(0, tagsCount).map((tag) => {
              return (
                <Link key={tag.id} href={`/games/tags/${tag.id}`}>
                <div className={styles.tag}>
                  {tag.name}
                  </div>
                  </Link>
              );
            })}
            <div
              onClick={() => {
                setShow((prev) => !prev);
              }}
              className={`${styles.tagShow} ${styles.tag}`}
              style={{ transform: !show && "rotate(180deg)" }}
            />
          </div>
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
            <Dropdown
              changeDropdown={setDates}
              initialText="Release date"
              list={DATE_BY}
              selectedElement={dates}
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

      {!loading ? (
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
