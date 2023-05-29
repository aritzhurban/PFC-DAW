import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/Home.module.css"

export function Dropdown({ list, initialText, selectedElement, changeDropdown }) {
    const [display, setDisplay] = useState(false);
    const dropdown = useRef()
    const dropdownButton = useRef()
    
    useEffect(() => {

        function dropdownToggle(event) {
          event.preventDefault();
          setDisplay(true);
        }
    
        function handleOutClick(event) {
          event.preventDefault();
          if (!dropdownButton?.current?.contains(event.target)) {
            if (display) {
              setDisplay(false);
            }
          }
        }
        dropdown?.current.addEventListener("click", dropdownToggle);
    
        window?.addEventListener("click", handleOutClick);
    
        return () => {
          dropdown?.current?.removeEventListener("click", dropdownToggle);
          window?.removeEventListener("click", handleOutClick);
        };
      }, [display]);
    
      const displayDropdown = clsx({
        [styles.dropdown_active]: display,
      });

    function clearDropdown(event) {
        event.preventDefault();
        changeDropdown("");
    }
    
    function handleChange(event) {
        event.preventDefault();
        const dropdownItem = event.target.getAttribute("name");
        changeDropdown(dropdownItem);
      }

    return <div className={styles.filter_select} ref={dropdown}>
    <div className={styles.dropdown_button}>
      <button
                className={styles.discover_filter_button}
                ref={dropdownButton}
      >
        <div className={styles.select_button_content}>
          <div className={styles.select_button_title}>
            <span>
              {list?.find((item) => item?.id?.toString() === selectedElement)
                ?.name || initialText}
            </span>
          </div>
          <Image
            className={styles.select_button_icon}
            width={10}
            height={18}
            alt="arrow"
            src="/arrow.svg"
          />
        </div>
      </button>
      <div
        className={`${styles.dropdown__menu} ${displayDropdown}`}
      >
        <ul className={styles.dropdown__list}>
          <li style={{ color: "gray" }}>Platform</li>
          {list.find((item) => item.id === selectedElement) && (
            <li
              className={styles.dropdown__list_item}
              onClick={clearDropdown}
            >
              <button
                name=""
                className={styles.dropdown__list_button}
                style={{ color: "red" }}
              >
                Clear
              </button>
            </li>
          )}

          {list.map((item) => {
            return (
              <li
                key={item.id}
                className={styles.dropdown__list_item}
                onClick={handleChange}
              >
                <button
                  name={item.id}
                  className={styles.dropdown__list_button}
                >
                  {item?.name}
                  {item?.id?.toString() === selectedElement && (
                    <img src="/check.svg" style={{ width: "20px" }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
}