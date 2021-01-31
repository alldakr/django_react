import React from "react";

const Post = (post) => {
  const { caption, location, photo } = post;
  return (
    <div>
      <img src={photo} alt={caption} style={{ width: "100px" }} />
      {caption}, {location}
    </div>
  );
};

export default Post;
