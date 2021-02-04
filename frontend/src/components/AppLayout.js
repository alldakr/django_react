import React from "react";
import { Input, Menu } from "antd";
import "./AppLayout.scss";
import LogoImage from "assets/logo.png";
import { useHistory } from "react-router-dom";

function AppLayout({ children, sidebar }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/accounts/login");
  };

  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" />
        </h1>

        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Menu mode="horizontal">
            <Menu.Item onClick={handleClick}>로그인</Menu.Item>
            <Menu.Item>메뉴2</Menu.Item>
            <Menu.Item>메뉴3</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className="sidebar">{sidebar}</div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2020. ask Company.</div>
    </div>
  );
}

export default AppLayout;
