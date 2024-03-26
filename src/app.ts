import express, { Application } from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";

// 1 - ENTRANCE
const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// 2 - SESSIONS

// 3 - VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4 - ROUTERS

app.use("/", router); // SPA: REACT
export default app;
