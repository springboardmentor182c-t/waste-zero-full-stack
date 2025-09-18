import { Injectable, computed, signal } from "@angular/core";

export type Role = "Volunteer" | "NGO" | "Admin";
export interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: Role;
  location?: string;
  skills?: string[];
  bio?: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSig = signal<User | null>(null);
  readonly user = computed(() => this.currentUserSig());
  readonly isAuthenticated = computed(() => !!this.currentUserSig());

  constructor() {
    try {
      const raw = localStorage.getItem("wastezero_user");
      if (raw) this.currentUserSig.set(JSON.parse(raw));
    } catch {}
  }

  register(data: Omit<User, "id"> & { password: string }): {
    ok: boolean;
    message?: string;
  } {
    const users = this.getUsers();
    if (
      users.some(
        (u) => u.username.toLowerCase() === data.username.toLowerCase(),
      )
    ) {
      return { ok: false, message: "Username already exists" };
    }
    const user: User = { id: crypto.randomUUID(), ...data };
    users.push(user);
    this.setUsers(users);
    this.setSession(user);
    return { ok: true };
  }

  login(username: string, password: string): { ok: boolean; message?: string } {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase(),
    );
    if (!user) return { ok: false, message: "Invalid credentials" };
    // NOTE: In demo we skip password verification
    this.setSession(user);
    return { ok: true };
  }

  updateProfile(update: Partial<User>) {
    const user = this.currentUserSig();
    if (!user) return;
    const next = { ...user, ...update } as User;
    this.currentUserSig.set(next);
    this.saveUser(next);
  }

  logout() {
    this.currentUserSig.set(null);
    try {
      localStorage.removeItem("wastezero_user");
    } catch {}
  }

  private setSession(user: User) {
    this.currentUserSig.set(user);
    this.saveUser(user);
  }

  private saveUser(user: User) {
    try {
      localStorage.setItem("wastezero_user", JSON.stringify(user));
    } catch {}
  }

  private getUsers(): User[] {
    try {
      const raw = localStorage.getItem("wastezero_users");
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }
  private setUsers(users: User[]) {
    try {
      localStorage.setItem("wastezero_users", JSON.stringify(users));
    } catch {}
  }
}
