import React, { useState, useEffect, useMemo } from "react";
import { Card } from "antd";
import Suggestion from "./Suggestion";
import "./SuggestionList.scss";
import { useAppContext } from "store";
import { axiosInstance, useAxios } from "api";

export default function SuggestionList(style) {
  const {
    store: { jwtToken },
  } = useAppContext();
  const headers = { Authorization: `JWT ${jwtToken}` };

  const [userList, setUserList] = useState([]);

  const [{ data: origUserList, loading, error }, refetch] = useAxios({
    url: "/accounts/suggestions/",
    headers,
  });

  useEffect(() => {
    if (!origUserList) setUserList([]);
    else {
      setUserList(origUserList.map((user) => ({ ...user, is_follow: false })));
    }
  }, [origUserList]);

  const onFollowUser = (username) => {
    const data = { username };
    const config = { headers };
    axiosInstance
      .post("/accounts/follow/", data, config)
      .then((response) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={style}>
      {loading && <div>loading...</div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}
      <button onClick={() => refetch()}>Reload</button>
      <Card title="Suggestion for you" size="small">
        {userList.map((suggestionUser, idx) => (
          <Suggestion
            suggestionUser={suggestionUser}
            onFollowUser={onFollowUser}
            key={idx}
          />
        ))}
      </Card>
    </div>
  );
}
