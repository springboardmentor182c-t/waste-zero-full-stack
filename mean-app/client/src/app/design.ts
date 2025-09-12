
type Theme = "light" | "dark";


let currentTheme: Theme = "light";

function applyTheme(theme: Theme) {
  const body = document.body;

  if (theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  currentTheme = theme;
  localStorage.setItem("theme", theme);
}

export function toggleDarkMode(checked: boolean) {
  applyTheme(checked ? "dark" : "light");
}

export function initTheme() {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) {
    applyTheme(saved);
    const darkModeCheckbox = document.getElementById("darkMode") as HTMLInputElement;
    if (darkModeCheckbox) darkModeCheckbox.checked = saved === "dark";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();

  const darkModeCheckbox = document.getElementById("darkMode") as HTMLInputElement;
  if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener("change", () => {
      toggleDarkMode(darkModeCheckbox.checked);
    });
  }
});
