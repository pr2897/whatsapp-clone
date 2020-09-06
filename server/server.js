// importing
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Pusher from "pusher";

import Message from "./src/model/dbMessages.js";
// app config

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1067897",
  key: "c311793aea86ee635461",
  secret: "af4584c40435a2bab767",
  cluster: "ap2",
  encrypted: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world",
// });

// middleware

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB Config

const password = "Du2tIwBBqNW6EeYj";
const user_name = "admin";
const uri = `mongodb+srv://admin:${password}@cluster0.1dkqn.mongodb.net/whatsappDB?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log(`DB Connected!`);

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;

      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else console.log("Error triggering Pusher!");
  });
});
//  ?????

//api routes

app.get("/", (req, res) => {
  res.status(200).send({
    message: "All good",
  });
});

app.get("/api/v1/messages/sync", (req, res) => {
  Message.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;
  Message.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

//listener

app.listen(port, () => console.log(`Listening on localhost:${port}`));
