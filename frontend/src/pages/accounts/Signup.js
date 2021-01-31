import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert } from "antd";

export default function Signup() {
  //   const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState("");

  const [inputs, setInputs] = useState({});
  const [erorrs, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    Axios.post("http://localhost:8000/accounts/signup/", inputs)
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
        if (error.response) {
          setErrors({
            username: (error.response.data.username || []).join(" "),
            password: (error.response.data.password || []).join(" "),
          });
        }
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" name="username" onChange={onChange} />
          {erorrs.username && <Alert type="error" message={erorrs.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {erorrs.password && <Alert type="error" message={erorrs.password} />}
        </div>
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}
