import React, { useCallback, useEffect, useState } from "react";
import { IFilm } from "../../types/films";
import { Card, Descriptions, Input, List, Spin, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { useNavigate } from "react-router-dom";

export const FilmsComponent: React.FC = () => {
  const {
    data: films,
    loading,
    totalData,
    searchQuery,
    selectedData,
    handleSearch,
    handleRowClick,
    handleModalClose,
    fetchDataById,
  } = useFetchPaginate("films");

  const [activeTab, setActiveTab] = useState<{ [filmId: string]: string }>({});
  const [itemNames, setItemNames] = useState<{
    [filmId: string]: { [url: string]: string };
  }>({});

  const fetchDataForTab = useCallback(
    async (filmId: string, dataType: string, urls: string[]) => {
      const names: { [url: string]: string } = { ...itemNames[filmId] };
      await Promise.all(
        urls.map(async (itemUrl) => {
          const idMatch = itemUrl.match(/\/(\d+)\/$/);
          const id = idMatch ? idMatch[1] : null;
          if (id && !names[itemUrl]) {
            const itemData = await fetchDataById(dataType, id);
            if (itemData && itemData.name) {
              names[itemUrl] = itemData.name;
            }
          }
        })
      );

      setItemNames((prev) => ({ ...prev, [filmId]: names }));
    },
    [fetchDataById, itemNames]
  );

  const handleTabChange = (filmId: string, key: string) => {
    const tabMapping: { [key: string]: string } = {
      "1": "characters",
      "2": "planets",
      "3": "species",
      "4": "starships",
      "5": "vehicles",
    };
    const dataType = tabMapping[key];
    setActiveTab((prev) => ({ ...prev, [filmId]: dataType }));

    const urls = films.find(
      (film: IFilm) => film.episode_id.toString() === filmId
    )?.[dataType as keyof (typeof films)[0]] as unknown as string[];

    if (urls) {
      fetchDataForTab(
        filmId,
        dataType === "characters" ? "people" : dataType,
        urls
      );
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (films.length > 0) {
      films.forEach((film: IFilm) => {
        handleTabChange(film.episode_id.toString(), "1");
      });
    }
  }, [films]);

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Input.Search
            allowClear
            placeholder="Buscar filmes"
            style={{ marginBottom: 16 }}
            onSearch={handleSearch}
            defaultValue={searchQuery}
          />
          <Card
            title="Informações dos Filmes da Saga Star Wars"
            bordered={false}
            style={{ width: "100%" }}
          >
            {films.map((film: IFilm) => (
              <React.Fragment key={film.episode_id}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Título">
                    {film.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="Diretor">
                    {film.director}
                  </Descriptions.Item>
                  <Descriptions.Item label="Produtores">
                    {film.producer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Data de Lançamento">
                    {film.release_date}
                  </Descriptions.Item>
                  <Descriptions.Item label="Episódio">
                    {film.episode_id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Abertura">
                    <Typography.Paragraph>
                      {film.opening_crawl}
                    </Typography.Paragraph>
                  </Descriptions.Item>
                </Descriptions>
                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: 16, marginBottom: 16 }}
                  onChange={(key) =>
                    handleTabChange(film.episode_id.toString(), key)
                  }
                >
                  {[
                    { type: "characters", key: "1" },
                    { type: "planets", key: "2" },
                    { type: "species", key: "3" },
                    { type: "starships", key: "4" },
                    { type: "vehicles", key: "5" },
                  ].map(({ type, key }) => (
                    <TabPane
                      tab={type.charAt(0).toUpperCase() + type.slice(1)}
                      key={key}
                    >
                      <List
                        dataSource={
                          Array.isArray(film[type as keyof typeof film])
                            ? (film[type as keyof typeof film] as string[])
                            : []
                        }
                        renderItem={(itemUrl) => (
                          <List.Item>
                            <Typography.Link>
                              {itemNames[film.episode_id]?.[itemUrl] ||
                                "Carregando..."}
                            </Typography.Link>
                          </List.Item>
                        )}
                      />
                    </TabPane>
                  ))}
                </Tabs>
              </React.Fragment>
            ))}
          </Card>
        </>
      )}
    </>
  );
};
