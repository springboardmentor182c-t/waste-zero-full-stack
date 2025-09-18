import { Routes } from "@angular/router";
import { HomePage } from "./pages/home.page";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { ProfilePage } from "./pages/profile.page";

export const routes: Routes = [
  { path: "", component: HomePage },
  { path: "login", component: LoginPage },
  { path: "register", component: RegisterPage },
  { path: "profile", component: ProfilePage },
  { path: "**", redirectTo: "" },
];
