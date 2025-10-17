import { io } from "socket.io-client";
import { SOCKET_URL } from "./envConfig.js";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, // we’ll connect manually after login
});