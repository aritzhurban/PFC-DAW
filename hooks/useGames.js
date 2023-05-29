import { useEffect, useRef, useState } from "react";

export function useGames() {
  const [items, setItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);

  const [url, setUrl] = useState("https://rawg.io/api/games");
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState("");
  const [platform, setPlatform] = useState("");
  const [query, setQuery] = useState("");
  const [loadingBody, setLoadingBody] = useState(false);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [loadingNavBar, setLoadingNavBar] = useState(false);
  const count = useRef();
  const next = useRef();
  const isFirstRender = useRef(true);

  const URL_GET_GAMES = new URL(url);
  URL_GET_GAMES.searchParams.set("key", "e38f1a9c10804014b6a7435b854e0098");

  function changeUrl(newUrl) {
    setUrl(newUrl);
  }

  function changeOrdering(newOrdering) {
    setOrdering(newOrdering);
  }

  function changePlatform(newPlatform) {
    setPlatform(newPlatform);
  }

  function changeQuery(newQuery) {
    setQuery(newQuery);
  }

  function changePage() {
    setPage((prev) => prev + 1);
  }

  function fetchData() {
    setLoadingBody(true);
    platform && URL_GET_GAMES.searchParams.set("platforms", platform);
    ordering && URL_GET_GAMES.searchParams.set("ordering", ordering);
    fetch(URL_GET_GAMES)
      .then((response) => response.json())
      .then((data) => {
        next.current = data.next;
        count.current = data.count;
        data.results.length > 0 && setItems(removeDuplicates(data.results));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoadingBody(false);
      });
  }

  function fetchSearchedItems() {
    setLoadingNavBar(true);
    query && URL_GET_GAMES.searchParams.set("search", query);
    URL_GET_GAMES.searchParams.set("ordering", "-added");
    fetch(URL_GET_GAMES)
      .then((response) => response.json())
      .then((data) => {
        data.results.length > 0 &&
          setSearchedItems(removeDuplicates(data.results));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoadingNavBar(false);
      });
  }

  function fetchPaginationItems() {
    if (!next.current) return;
    setLoadingPagination(true);
    fetch(next.current)
      .then((response) => response.json())
      .then((data) => {
        next.current = data.next;
        data.results.length > 0 &&
          setItems(removeDuplicates([...items, ...data.results]));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoadingPagination(false);
        isFirstRender.current = false;
      });
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

  function fetchInitialItems() {
    setLoadingBody(true);
    const initialURL = new URL(
      "https://rawg.io/api/games/lists/main?key=e38f1a9c10804014b6a7435b854e0098"
    );
    platform && URL_GET_GAMES.searchParams.set("platforms", platform);
    ordering && URL_GET_GAMES.searchParams.set("ordering", ordering);
    fetch(initialURL)
      .then((response) => response.json())
      .then((data) => {
        next.current = data.next;
        console.log(removeDuplicates(data.results));
        data.results.length > 0 && setItems(removeDuplicates(data.results));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoadingBody(false);
        isFirstRender.current = false;
      });
  }

  useEffect(() => {
    fetchInitialItems();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (!platform && !ordering) return;

    fetchData();
  }, [platform, ordering, url]);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (query === "") return;

    fetchSearchedItems();
  }, [query]);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (page === 1) return;

    fetchPaginationItems();
  }, [page]);

  const mappedSearchedItems = searchedItems.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.background_image,
      platforms: item.parent_platforms,
    };
  });

  const mappedItems = items.map((item) => {
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

  return {
    count,
    items: mappedItems,
    searchedItems: mappedSearchedItems,
    loadingBody,
    loadingNavBar,
    loadingPagination,
    ordering,
    platform,
    query,
    next,
    changeOrdering,
    changePlatform,
    changeQuery,
    changePage,
    changeUrl,
  };
}
