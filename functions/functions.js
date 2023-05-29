export function handleClickOrdering({ setQuery, setOrdering }) {
  setQuery("games");
  setOrdering("-name");
}

export function handleClickPlatform({ setPlatform }) {
  return setPlatform("platforms=16");
}

export function handleClickPage({ setPage }) {
  return setPage((prev) => prev + 1);
}
