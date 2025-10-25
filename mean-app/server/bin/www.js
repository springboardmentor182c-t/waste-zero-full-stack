import { Server } from "socket.io";
import http from "http";
import app from "../server.js"; // adjust path if needed

const server = http.createServer(app);
export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
