import React from "react";
import moment from "moment";
import { Avatar, Card, Comment, Tooltip } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";
import "./Post.scss";

import CommentList from "./CommentList";

const Post = ({ post, handleLike }) => {
  const { author, caption, location, photo, tag_set, is_like } = post;
  const { username, name, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[
          is_like ? (
            <HeartFilled onClick={() => handleLike({ post, isLike: false })} />
          ) : (
            <HeartOutlined onClick={() => handleLike({ post, isLike: true })} />
          ),
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={"http://localhost:8000" + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
          style={{ marginBottom: "0.5em" }}
        />
        <CommentList post={post} />
      </Card>
    </div>
  );
};

export default Post;
