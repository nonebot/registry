/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const themeButton = document.getElementById("theme-toggle-btn");
  const themeIcon = document.getElementById("theme-toggle-icon");

  const setTheme = (theme) => {
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme) => {
    themeIcon.classList.forEach((className) => {
      themeIcon.classList.remove(className);
    });
    themeIcon.classList.add("mdi");
    if (theme === "dark") {
      themeIcon.classList.add("mdi-weather-night");
      themeButton.setAttribute("data-bs-theme-value", "dark");
    } else {
      themeIcon.classList.add("mdi-weather-sunny");
      themeButton.setAttribute("data-bs-theme-value", "light");
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    themeButton.addEventListener("click", () => {
      const theme = themeButton.getAttribute("data-bs-theme-value");
      let new_theme = "dark";
      if (theme === "dark" || theme === "auto") {
        new_theme = "light";
      }
      setStoredTheme(new_theme);
      setTheme(new_theme);
      showActiveTheme(new_theme);
    });
  });
})();
