import Image from "next/image";
import styles from "./Platforms.module.css";
export function Platforms({ platforms = [] }) {
  const plataformas = platforms.length > 4 ? platforms.slice(0, 4) : platforms;

  return (
    <div className={styles.card_platforms}>
      {plataformas?.map((item) => {
        const { platform } = item;
        if (platform.id === 1) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/pc.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 2) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/playstation.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 3) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/xbox.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 4 || platform.id === 5) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/apple.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 6) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/linux.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 7) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/nintendo.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 9) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/atari.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 11) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/sega.svg"
              alt={platform.slug}
            />
          );
        }
        if (platform.id === 14) {
          return (
            <Image
              key={platform.id}
              width={"15px"}
              height={"15px"}
              src="/web.svg"
              alt={platform.slug}
            />
          );
        }
      })}
      {platforms.length > 4 && <span>+{platforms.length - 4}</span>}
    </div>
  );
}
