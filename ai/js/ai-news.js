(function () {
  var STORAGE_KEY = "ai-news-theme";
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    return t === "light" ? "light" : "dark";
  }

  function setTheme(theme, persist) {
    var next = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    btn.setAttribute(
      "aria-label",
      next === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    }
  }

  setTheme(currentTheme(), false);

  btn.addEventListener("click", function () {
    setTheme(currentTheme() === "dark" ? "light" : "dark", true);
  });

  try {
    var media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", function (event) {
      var stored = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
      if (stored !== "light" && stored !== "dark") {
        setTheme(event.matches ? "light" : "dark", false);
      }
    });
  } catch (e) {}
})();
