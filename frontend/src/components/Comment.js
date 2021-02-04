import React, { useState } from "react";
import moment from "moment";

import {
  Avatar,
  Card,
  Comment as AntdComment,
  Tooltip,
  Input,
  Button,
} from "antd";

export default function Comment({ comment }) {
  const {
    author: { username, name, avatar_url },
    message,
    create_at,
  } = comment;
  const displayName = name.length === 0 ? username : name;
  return (
    <AntdComment
      author={displayName}
      avatar={
        <Avatar src={"http://localhost:8000" + avatar_url} alt={displayName} />
      }
      content={message}
      datetime={
        <Tooltip title={moment().format(create_at)}>
          <span>{moment(create_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
