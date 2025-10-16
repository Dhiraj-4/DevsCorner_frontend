import { io } from "socket.io-client";
import { BACKEND_URL } from "./envConfig.js";

const SOCKET_URL = BACKEND_URL;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // we’ll connect manually after login
});