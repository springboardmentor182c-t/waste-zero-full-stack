import { Component, signal } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
})
export class App {
  protected readonly title = signal("WasteZero");

  isDark = signal<boolean>(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  toggleDark() {
    const root = document.documentElement;
    root.classList.toggle("dark");
    this.isDark.set(root.classList.contains("dark"));
    try {
      localStorage.setItem("theme", this.isDark() ? "dark" : "light");
    } catch {}
  }

  constructor() {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") {
        document.documentElement.classList.add("dark");
        this.isDark.set(true);
      }
    } catch {}
  }
}
