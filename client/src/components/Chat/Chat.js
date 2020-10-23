import React, { useState } from "react";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Picker from "emoji-picker-react";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
// import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import axios from "../../axios";

let counter = 0;

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setInput(input + emojiObject.emoji);
  };

  const toggleClass = () => {
    document.querySelector("");
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    if (input)
      await axios.post("/api/v1/messages/new", {
        message: input,
        name: "PIYUSH",
        timestamp: new Date().toLocaleTimeString(),
        received: true,
      });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room Name </h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={counter++}
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
            <span className="chat__seen">
              <DoneAllOutlinedIcon />
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <div className="emoji-picker hidden">
          <Picker id="picker" onEmojiClick={onEmojiClick} />
        </div>
        <SentimentSatisfiedOutlinedIcon onClick={toggleClass} />

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} type="submit">
            Send Message
          </button>
        </form>
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
