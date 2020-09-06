import React from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlined from "@material-ui/icons/Search";

import { IconButton, Avatar } from "@material-ui/core";
import SidebarChat from "../SidebarChat/SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <IconButton>
          <Avatar src="data:image/jpeg;base64,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" />
        </IconButton>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new Chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
