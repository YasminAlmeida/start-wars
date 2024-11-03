import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, theme, Drawer } from "antd";
import { ThemeType } from "../../theme";
import { Themes } from "../../types/theme";

const { Header, Sider, Content } = Layout;

interface ISideBarProps {
  contentComponent: React.ReactNode;
  headerComponent: React.ReactNode;
  theme: Themes[ThemeType]["token"];
}

export const SideBar: React.FC<ISideBarProps> = ({
  contentComponent,
  headerComponent,
  theme,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const menuItems = [
    {
      key: "/",
      label: "Home",
    },
    {
      key: "/people",
      label: "Personagens",
    },
    {
      key: "/films",
      label: "Filmes",
    },
    {
      key: "/planets",
      label: "Planetas",
    },
    {
      key: "/species",
      label: "Espécies",
    },
    {
      key: "/starships",
      label: "Naves",
    },
    {
      key: "/vehicles",
      label: "Veículos",
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
    if (isMobile) {
      setVisible(false);
    }
  };

  const renderMenu = () => (
    <Menu
      theme="dark"
      mode={isMobile ? "vertical" : "inline"}
      defaultSelectedKeys={["1"]}
      style={{
        background: theme.colorPrimary,
        color: theme.colorTextSecondaryTitle,
      }}
      onClick={({ key }) => handleMenuClick(key)}
      items={menuItems.map((item) => ({
        key: item.key,
        label: (
          <span style={{ color: theme.colorTextSecondaryTitle }}>
            {item.label}
          </span>
        ),
      }))}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          padding: "0 16px",
          background: theme.colorPrimary,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          type="text"
          icon={visible ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setVisible(!visible)}
          style={{
            color: theme.colorTextSecondaryTitle,
            fontSize: "16px",
          }}
        />
        {headerComponent}
      </Header>

      <Layout>
        {isMobile ? (
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setVisible(false)}
            open={visible}
            bodyStyle={{ padding: 0, background: theme.colorPrimary }}
            width={200}
          >
            {renderMenu()}
          </Drawer>
        ) : (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              background: theme.colorPrimary,
            }}
          >
            {renderMenu()}
          </Sider>
        )}

        <Content
          style={{
            padding: isMobile ? "16px" : "30px",
            minHeight: 280,
            background: theme.colorBgContainer,
          }}
        >
          {contentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};
