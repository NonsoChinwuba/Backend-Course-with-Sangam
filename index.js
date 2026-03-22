import dotenv from "dotenv";
dotenv.config();
import dns from "dns/promises";
import express from "express";
// import http, { createServer } from "http";
// import socketIo, { Server } from "socket.io";
import connectDB from "./database/db.js";
import router from "./routes/bookRoutes.js";
import authRouter from "./routes/authRoutes.js";
import homeRouter from "./routes/homeRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import productRouter from "./routes/productRoutes.js";
import authorBookRouter from "./routes/authorBookRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT;

//create server for socket.io
// const server = http.createServer(app);

//initiate socket.io and attach this to the http server
// const io = new Server(server);
// const io = socketIo(server);

//serving static files
app.use(express.static("public"));

//storing the users in a Set data structure for practice purposes
// const users = new Set();

//initiating a connection
// io.on("connection", (socket) => {
//   console.log("A user is connected");

//   //handle users when they join the chat
//   socket.on("join", (userName) => {
//     users.add(userName);

//     //broadcast to all users that a new user has joined
//     io.emit("userJoined", userName);

//     //send updated user list to all clients
//     io.emit("userList", Array.from(users));
//   });

//   //handle incoming chat message

//   //handle user disconnection
// });

//database connection
connectDB();

//middleware
app.use(express.json());

//routes
app.use("/api/books", router);
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);
app.use("/api/image", imageRouter);
app.use("/products", productRouter);
app.use("/author-book", authorBookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
