import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Input,
  Modal,
  Pagination,
  ConfigProvider,
  Tooltip,
  FloatButton,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { themes, ThemeType } from "./theme";
import { Header } from "./components/header";
import { useFetchPaginate } from "./hooks/useFetchPaginate";
import { ThemeProvider, useTheme } from "./context/themeContext";
import CharacterTable from "./components/characterTable";
import { SideBar } from "./components/sideBar";
import { Content } from "antd/es/layout/layout";
import AppRoutes from "./routes";
import SunOutlined from "@ant-design/icons/SunOutlined";

const { Search } = Input;

interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
}

const App: React.FC = () => {
  const [optionSelected, setOptionSelected] = useState<string>("");

  const {
    data,
    loading,
    totalData,
    searchQuery,
    selectedData,
    handleSearch,
    handleRowClick,
    handleModalClose,
  } = useFetchPaginate(optionSelected);

  const { theme, toggleTheme } = useTheme();

  const [position, setPosition] = useState<"start" | "end">("end");

  return (
    <div
      style={{
        backgroundColor: themes[theme].token.colorBgContainer,
        height: "100%",
      }}
    >
      <SideBar
        contentComponent={
          <Content
            style={{
              height: "100%",
              minHeight: "100vh",
            }}
          >
            <AppRoutes theme={themes[theme].token} />
          </Content>
        }
        headerComponent={<Header theme={theme} />}
        theme={themes[theme].token}
      />
      <FloatButton
        onClick={() => toggleTheme()}
        icon={<SunOutlined />}
        tooltip={<div>Mudar o tema</div>}
      />
    </div>
  );
};

export default App;
