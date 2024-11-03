import React, { useCallback, useEffect, useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { IVehicles } from "../../types/vehicles";
import { Card, Descriptions, Input, List, Spin, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";

export const VehiclesComponent: React.FC = () => {
  const {
    data: vehicles,
    loading,
    searchQuery,
    handleSearch,
    handleRowClick,
    fetchDataById,
  } = useFetchPaginate("vehicles");

  const [activeTab, setActiveTab] = useState<{ [vehiclesId: string]: string }>(
    {}
  );
  const [itemNames, setItemNames] = useState<{
    [vehiclesId: string]: { [url: string]: string };
  }>({});

  const fetchDataForTab = useCallback(
    async (vehiclesId: string, dataType: string, urls: string[]) => {
      const names: { [url: string]: string } = { ...itemNames[vehiclesId] };
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

      setItemNames((prev) => ({ ...prev, [vehiclesId]: names }));
    },
    [fetchDataById, itemNames]
  );

  const handleTabChange = (vehiclesId: string, key: string) => {
    const tabMapping: { [key: string]: string } = {
      "1": "pilots",
      "2": "films",
    };
    const dataType = tabMapping[key];
    setActiveTab((prev) => ({ ...prev, [vehiclesId]: dataType }));

    const urls = vehicles.find(
      (vehicles: IVehicles) => vehicles.url.toString() === vehiclesId
    )?.[dataType as keyof (typeof vehicles)[0]] as unknown as string[];

    if (urls) {
      fetchDataForTab(
        vehiclesId,
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
            allowClear
            placeholder="Pesquisar"
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
            defaultValue={searchQuery}
          />
          <Card
            title={"Informações dos Veiculos da Saga Star Wars"}
            bordered={false}
            style={{ width: "100%" }}
          >
            {vehicles.map((vehicle: IVehicles) => (
              <React.Fragment key={vehicle.url}>
                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Name">
                    {vehicle.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Capacidade de Carga">
                    {vehicle.cargo_capacity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Consumíveis">
                    {vehicle.consumables}
                  </Descriptions.Item>
                  <Descriptions.Item label="Custo em Créditos">
                    {vehicle.cost_in_credits}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tripulação">
                    {vehicle.crew}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tamanho do Veiculo">
                    {vehicle.length}
                  </Descriptions.Item>
                  <Descriptions.Item label="Manufatura">
                    {vehicle.manufacturer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Maxima Velocidade Atmosferica">
                    {vehicle.max_atmosphering_speed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Modelo">
                    {vehicle.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Passageiros">
                    {vehicle.passengers}
                  </Descriptions.Item>
                  <Descriptions.Item label="Classe de Veiculo">
                    {vehicle.vehicle_class}
                  </Descriptions.Item>
                </Descriptions>

                <Tabs
                  defaultActiveKey="1"
                  style={{ marginTop: 16, marginBottom: 16 }}
                  onChange={(key) =>
                    handleTabChange(vehicle.url.toString(), key)
                  }
                >
                  {[
                    { type: "pilots", key: "1" },
                    { type: "films", key: "2" },
                  ].map((type, key) => (
                    <TabPane
                      tab={
                        type.type.charAt(0).toUpperCase() + type.type.slice(1)
                      }
                      key={key}
                    >
                      <List
                        dataSource={
                          Array.isArray(
                            vehicle[type.type as keyof typeof vehicle]
                          )
                            ? (vehicle[
                                type.type as keyof typeof vehicle
                              ] as string[])
                            : []
                        }
                        renderItem={(itemUrl) => (
                          <List.Item>
                            <Typography.Link
                              onClick={() => handleRowClick(itemUrl)}
                            >
                              {itemNames[vehicle.url.toString()]?.[itemUrl] ||
                                itemUrl}
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
