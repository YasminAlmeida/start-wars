import React, { useCallback, useEffect, useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { ISpecies } from "../../types/species";
import { Card, Descriptions, Input, List, Spin, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

export const SpeciesComponent: React.FC = () => {
  const {
    data: species,
    loading,
    totalData,
    searchQuery,
    selectedData,
    handleSearch,
    handleRowClick,
    handleModalClose,
    fetchDataById,
  } = useFetchPaginate("species");

  const [activeTab, setActiveTab] = useState<{ [filmId: string]: string }>({});
  const [itemNames, setItemNames] = useState<{
    [speciesId: string]: { [url: string]: string };
  }>({});

  const fetchDataForTab = useCallback(
    async (speciesId: string, dataType: string, urls: string[]) => {
      const names: { [url: string]: string } = { ...itemNames[speciesId] };
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

      setItemNames((prev) => ({ ...prev, [speciesId]: names }));
    },
    [fetchDataById, itemNames]
  );

  const handleTabChange = (speciesId: string, key: string) => {
    const tabMapping: { [key: string]: string } = {
      "1": "people",
      "2": "films",
    };
    const dataType = tabMapping[key];
    setActiveTab((prev) => ({ ...prev, [speciesId]: dataType }));

    const urls = species.find(
      (species: ISpecies) => species.name.toString() === speciesId
    )?.[dataType as keyof (typeof species)[0]] as unknown as string[];

    if (urls) {
      fetchDataForTab(speciesId, dataType, urls);
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
          <Card
            title={"Informações das Especies da Saga Star Wars"}
            bordered={false}
            style={{ width: "100%" }}
          >
            {species.map((species: ISpecies) => (
              <React.Fragment key={species.name}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Nome">
                    {species.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Designação">
                    {species.designation}
                  </Descriptions.Item>
                  <Descriptions.Item label="Classificação">
                    {species.classification}
                  </Descriptions.Item>
                  <Descriptions.Item label="Altura Média">
                    {species.average_height}
                  </Descriptions.Item>
                  <Descriptions.Item label="Atura">
                    {species.average_height}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor dos olhos">
                    {species.eye_colors}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor do cabelo">
                    {species.hair_colors}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cor da pele">
                    {species.skin_colors}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lingua">
                    {species.language}
                  </Descriptions.Item>
                  <Descriptions.Item label="Planeta Natal">
                    {species.homeworld}
                  </Descriptions.Item>
                </Descriptions>

                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: 16, marginBottom: 16 }}
                  onChange={(key) =>
                    handleTabChange(species.name.toString(), key)
                  }
                >
                  {[
                    { type: "people", key: "1" },
                    { type: "films", key: "2" },
                  ].map((tab) => (
                    <TabPane tab={tab.type} key={tab.key}>
                      <List
                        header={<div>{tab.type}</div>}
                        bordered
                        dataSource={
                          species[tab.type as keyof ISpecies] as string[]
                        }
                        renderItem={(item: string) => (
                          <List.Item>
                            <a
                              onClick={() => handleRowClick(item)}
                              style={{ cursor: "pointer" }}
                            >
                              {itemNames[species.name]?.[item] || item}
                            </a>
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
