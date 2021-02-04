import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import useAxios from "axios-hooks";
import { axiosInstance, useAxios } from "api";

import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";

const apiUrl = "/api/posts/";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [postList, setPostList] = useState([]);

  const [{ data: originPostList, loading, error }, refetch] = useAxios({
    url: "/api/posts/",
    headers,
  });

  useEffect(() => {
    setPostList(originPostList);
  }, [originPostList]);

  const handleLike = async ({ post, isLike }) => {
    console.log("PostList => isLike: ", isLike);
    const apiUrl = `/api/posts/${post.id}/like/`;
    const method = isLike ? "POST" : "DELETE";
    try {
      const response = await axiosInstance({ url: apiUrl, method, headers });
      // console.group("handleLike");
      // console.log(post);
      // console.log(isLike);
      // console.groupEnd();
      console.log("handleLike: ", response);
      setPostList((prevList) => {
        return prevList.map((currentPost) =>
          currentPost === post
            ? { ...currentPost, is_like: isLike }
            : currentPost
        );
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList &&
        postList.map((post) => (
          <Post post={post} key={post.id} handleLike={handleLike} />
        ))}
    </div>
  );
}

export default PostList;
