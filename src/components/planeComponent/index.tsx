import React, { useCallback, useEffect, useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { Card, Descriptions, Input, List, Spin, Tabs } from "antd";
import { IPlanet } from "../../types/planets";
import TabPane from "antd/es/tabs/TabPane";

export const PlanetComponent: React.FC = () => {
  const {
    data: planets,
    loading,
    totalData,
    searchQuery,
    selectedData,
    handleSearch,
    handleRowClick,
    handleModalClose,
    fetchDataById,
  } = useFetchPaginate("planets");

  const [activeTab, setActiveTab] = useState<{ [planetId: string]: string }>(
    {}
  );
  const [itemNames, setItemNames] = useState<{
    [planetId: string]: { [url: string]: string };
  }>({});

  const fetchDataForTab = useCallback(
    async (planetId: string, dataType: string, urls: string[]) => {
      const names: { [url: string]: string } = { ...itemNames[planetId] };
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

      setItemNames((prev) => ({ ...prev, [planetId]: names }));
    },
    [fetchDataById, itemNames]
  );

  const handleTabChange = (planetId: string, key: string) => {
    const tabMapping: { [key: string]: string } = {
      "1": "residents",
      "2": "films",
    };
    const dataType = tabMapping[key];
    setActiveTab((prev) => ({ ...prev, [planetId]: dataType }));

    const urls = planets.find(
      (planet: IPlanet) => planet.url.toString() === planetId
    )?.[dataType as keyof (typeof planets)[0]] as unknown as string[];

    if (urls) {
      fetchDataForTab(
        planetId,
        dataType === "residents" ? "people" : dataType,
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
            value={searchQuery}
            style={{ marginBottom: 16 }}
            onSearch={handleSearch}
            defaultValue={searchQuery}
            allowClear
          />
          <Card title="Planets" style={{ width: "100%" }} bordered={false}>
            {planets.map((planet: IPlanet) => (
              <React.Fragment key={planet.url}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Name">
                    {planet.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Diameter">
                    {planet.diameter}
                  </Descriptions.Item>
                  <Descriptions.Item label="Climate">
                    {planet.climate}
                  </Descriptions.Item>
                  <Descriptions.Item label="Terrain">
                    {planet.terrain}
                  </Descriptions.Item>
                  <Descriptions.Item label="Population">
                    {planet.population}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gravity">
                    {planet.gravity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Surface Water">
                    {planet.surface_water}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rotation Period">
                    {planet.rotation_period}
                  </Descriptions.Item>
                  <Descriptions.Item label="Orbital Period">
                    {planet.orbital_period}
                  </Descriptions.Item>
                </Descriptions>
                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: 16, marginBottom: 16 }}
                  onChange={(key) =>
                    handleTabChange(planet.url.toString(), key)
                  }
                >
                  {[
                    { type: "residents", key: "1" },
                    { type: "films", key: "2" },
                  ].map((tab) => (
                    <TabPane tab={tab.type} key={tab.key}>
                      <List
                        header={<div>{tab.type}</div>}
                        bordered
                        dataSource={
                          planet[tab.type as keyof typeof planet] as string[]
                        }
                        renderItem={(item) => (
                          <List.Item
                            onClick={() => handleRowClick(item)}
                            style={{ cursor: "pointer" }}
                          >
                            {itemNames[planet.url]?.[item] || item}
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
