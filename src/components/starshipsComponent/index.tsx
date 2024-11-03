import React, { useCallback, useEffect, useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { IStarship } from "../../types/starships";
import { Card, Descriptions, Input, Spin, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { List } from "antd/lib";

export const StarshipsComponent: React.FC = () => {
  const {
    data: starships,
    loading,
    totalData,
    searchQuery,
    selectedData,
    handleSearch,
    handleRowClick,
    handleModalClose,
    fetchDataById,
  } = useFetchPaginate("starships");

  const [activeTab, setActiveTab] = useState<{ [starshipId: string]: string }>(
    {}
  );
  const [itemNames, setItemNames] = useState<{
    [starshipId: string]: { [url: string]: string };
  }>({});

  const fetchDataForTab = useCallback(
    async (starshipId: string, dataType: string, urls: string[]) => {
      const names: { [url: string]: string } = { ...itemNames[starshipId] };
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

      setItemNames((prev) => ({ ...prev, [starshipId]: names }));
    },
    [fetchDataById, itemNames]
  );

  const handleTabChange = (starshipId: string, key: string) => {
    const tabMapping: { [key: string]: string } = {
      "1": "films",
      "2": "pilots",
    };
    const dataType = tabMapping[key];
    setActiveTab((prev) => ({ ...prev, [starshipId]: dataType }));

    const urls = starships.find(
      (starship: IStarship) => starship.name.toString() === starshipId
    )?.[dataType as keyof (typeof starships)[0]] as unknown as string[];

    if (urls) {
      fetchDataForTab(
        starshipId,
        dataType === "pilots" ? "people" : dataType,
        urls
      );
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Input.Search
            placeholder="Pesquisar"
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
            allowClear
            defaultValue={searchQuery}
          />

          <Card title="Starships" bordered={false} style={{ width: "100%" }}>
            {starships.map((starship: IStarship) => (
              <React.Fragment key={starship.url}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Nome">
                    {starship.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Passageios">
                    {starship.passengers}
                  </Descriptions.Item>
                  <Descriptions.Item label="MGLT">
                    {starship.MGLT}
                  </Descriptions.Item>
                  <Descriptions.Item label="Capacidade de Carga">
                    {starship.cargo_capacity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consumiveis">
                    {starship.consumables}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost in credits">
                    {starship.cost_in_credits}
                  </Descriptions.Item>
                  <Descriptions.Item label="Criado">
                    {starship.created}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tripulação">
                    {starship.crew}
                  </Descriptions.Item>
                  <Descriptions.Item label="Pontos de Hiperespaço">
                    {starship.hyperdrive_rating}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tamanho">
                    {starship.length}
                  </Descriptions.Item>
                  <Descriptions.Item label="Fabricante">
                    {starship.manufacturer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Velocidade Máxima Atmosférica">
                    {starship.max_atmosphering_speed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Modelo">
                    {starship.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Classe">
                    {starship.starship_class}
                  </Descriptions.Item>
                </Descriptions>
                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: 16, marginBottom: 16 }}
                  onChange={(key) =>
                    handleTabChange(starship.name.toString(), key)
                  }
                >
                  {[
                    { type: "films", key: "1" },
                    { type: "pilots", key: "2" },
                  ].map((tab) => (
                    <TabPane tab={tab.type} key={tab.key}>
                      <List
                        header={<div>{tab.type}</div>}
                        bordered
                        dataSource={
                          starship[
                            tab.type as keyof typeof starship
                          ] as string[]
                        }
                        renderItem={(item) => (
                          <List.Item
                            onClick={() => handleRowClick(item)}
                            style={{ cursor: "pointer" }}
                          >
                            {itemNames[starship.name]?.[item] || item}
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
