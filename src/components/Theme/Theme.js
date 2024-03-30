"use client";
import React from "react";
import Cookie from "js-cookie";
import { Sun, Moon } from "react-feather";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Theme.module.css";
import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

function ThemeToggle({ initialTheme }) {
  const [activeTheme, setActiveTheme] = React.useState(initialTheme);

  function toggleTheme() {
    // Referencing this:
    // https://github.com/joy-of-react/next-dark-mode/blob/main/src/components/DarkLightToggle/DarkLightToggle.js
    //   - Uses cookies instead of localStorage to handle light/dark mode
    //     because localStorage has a significant amount of time between
    //     client receiving server-generated HTML and client re-rendering
    const nextTheme = activeTheme === "light" ? "dark" : "light";

    setActiveTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, { expires: 1000 });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);

    // Swap out the actual colors on the <html> tag.
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.action} onClick={toggleTheme}>
      {activeTheme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
