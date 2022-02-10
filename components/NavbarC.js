import styles from "../styles/NavbarC.module.css";
import { Menu, X } from "react-feather";
import { motion, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function NavbarC({ resumelink }) {
  const { scrollY } = useViewportScroll();
  const [hidden, setHidden] = useState(false);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    // call autoHide on scroll
    scrollY.onChange(() => autoHide());
  });

  // toggle offcanvas nav
  function showOffcanvas() {
    if (!toggled) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
    setToggled(!toggled);
  }

  // hide navbar on scroll down, show nav on scroll up
  function autoHide() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }
  // show/hide animation properties
  const variants = {
    visible: { y: 0 },
    hidden: { y: -100 },
  };

  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.4 }}
      className={`${styles.navbar} ${styles.navDark}`}
      id="navspy"
    >
      <div className={styles.brand}>
        <a href="#">
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svgAccent"
          >
            <mask
              id="mask0"
              // style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="100"
              height="100"
            >
              <rect width="100" height="100" fill="#C4C4C4" />
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M49.9936 94.344C40.0096 94.344 32.2336 91.624 26.6656 86.184C21.1616 80.744 18.4096 73.032 18.4096 63.048V25.8H37.4176V62.472C37.4176 73.224 41.6736 78.6 50.1856 78.6C58.6336 78.6 62.8576 73.224 62.8576 62.472V25.8H81.5776V63.048C81.5776 73.032 78.7936 80.744 73.2256 86.184C67.7216 91.624 59.9776 94.344 49.9936 94.344ZM40.0096 20.424C37.8336 20.424 36.0096 19.752 34.5376 18.408C33.1296 17 32.4256 15.176 32.4256 12.936C32.4256 10.696 33.1296 8.872 34.5376 7.464C36.0096 6.056 37.8336 5.352 40.0096 5.352C42.1856 5.352 43.9776 6.056 45.3856 7.464C46.8576 8.872 47.5936 10.696 47.5936 12.936C47.5936 15.176 46.8576 17 45.3856 18.408C43.9776 19.752 42.1856 20.424 40.0096 20.424ZM60.3616 20.424C58.1856 20.424 56.3616 19.752 54.8896 18.408C53.4816 17 52.7776 15.176 52.7776 12.936C52.7776 10.696 53.4816 8.872 54.8896 7.464C56.3616 6.056 58.1856 5.352 60.3616 5.352C62.5376 5.352 64.3296 6.056 65.7376 7.464C67.2096 8.872 67.9456 10.696 67.9456 12.936C67.9456 15.176 67.2096 17 65.7376 18.408C64.3296 19.752 62.5376 20.424 60.3616 20.424Z"
                fill="#currentColor"
              />
            </g>
          </svg>
        </a>
      </div>
      <button
        className={styles.navToggler}
        onClick={showOffcanvas}
        aria-controls="primary-navigation"
        aria-expanded="false"
      >
        {/* <span className="sr-only">Menu</span> */}
        {!toggled ? (
          <Menu width={40} height={40} color="var(--accentColor)"></Menu>
        ) : (
          <X width={40} height={40} color="var(--accentColor)"></X>
        )}
      </button>
      <div
        className={styles.offCanvas}
        data-visible={`${toggled}`}
        id="primary-navigation"
      >
        <ul className={styles.navList}>
          <li className={styles.navItem} onClick={showOffcanvas}>
            <a href="#about" className={styles.navLink}>
              <span aria-hidden="true">00</span>About
            </a>
          </li>
          <li className={styles.navItem} onClick={showOffcanvas}>
            <a href="#skills" className={styles.navLink}>
              <span aria-hidden="true">01</span>Skills
            </a>
          </li>
          <li className={styles.navItem} onClick={showOffcanvas}>
            <a href="#projects" className={styles.navLink}>
              <span aria-hidden="true">02</span>Projects
            </a>
          </li>
          <li className={styles.navItem} onClick={showOffcanvas}>
            <a href="#contact" className={styles.navLink}>
              <span aria-hidden="true">03</span>Contact
            </a>
          </li>
        </ul>
        <a
          href={resumelink}
          className="k-button px-3 py-2 text-sm border"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"Resumé"}
        </a>
      </div>
    </motion.nav>
  );
}
