import { useState } from "react";

export function useDisplays() {
  const [displayList, setDisplayList] = useState(false);

  function changeDisplayList(newBlockState) {
    setDisplayList(newBlockState);
  }

  return {
    displayList,
    changeDisplayList,
  };
}
