import React, { useEffect, useState } from "react";
import { axiosInstance, useAxios } from "api";
import { Form, Input, Button, Card, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useAppContext, setToken } from "store";
import { parseErrorMessages } from "utils/forms";

export default function Login() {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await axiosInstance.post("/accounts/token/", data);

        const {
          data: { token: jwtToken },
        } = response;

        dispatch(setToken(jwtToken));
        // setJwtToken(jwtToken);

        notification.open({
          message: "로그인 성공",
          //   description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "##108ee9" }} />,
        });
        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessage } = error.response;
          setFieldErrors(parseErrorMessages(fieldsErrorMessage));
        }
      }
    }
    fn();
  };
  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              min: 4,
              message: "4글자 입력해주세요",
            },
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>{" "}
    </Card>
  );
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
