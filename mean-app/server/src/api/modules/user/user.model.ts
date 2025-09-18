export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "Volunteer" | "NGO" | "Admin";
  skills?: string[];
  location?: string;
  bio?: string;
}
