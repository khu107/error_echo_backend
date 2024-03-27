import express, { Application } from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDB(session);
const store = new MongoDBStore({
  uri: String(process.env.MONGO_URL),
  collection: "session",
});
// 1 - ENTRANCE
const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// 2 - SESSIONS
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 6, // 6h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
// 3 - VIEWS

// 4 - ROUTERS

app.use("/", router); // SPA: REACT
export default app;
