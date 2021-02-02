import React, { useEffect, useState } from "react";
import Axios from "axios";
import useAxios from "axios-hooks";
import Post from "./Post";
import { useAppContext } from "store";
import { Alert } from "antd";

const apiUrl = "http://localhost:8000/api/posts/";

function PostList() {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  // const [postList, setPostList] = useState([]);

  const [{ data: postList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/api/posts/",
    headers,
  });

  // useEffect(() => {
  //   const headers = { Authorization: `JWT ${jwtToken}` };
  //   Axios.get(apiUrl, { headers })
  //     .then((response) => {
  //       const { data } = response;
  //       setPostList(data);
  //     })
  //     .catch((error) => {
  //       //   error.response;
  //     });
  // }, []);

  return (
    <div>
      {postList && postList.length === 0 && (
        <Alert type="warning" message="포스팅이 없습니다." />
      )}
      {postList && postList.map((post, idx) => <Post post={post} key={idx} />)}
    </div>
  );
}

export default PostList;
