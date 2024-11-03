import React, { useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { IVehicles } from "../../types/vehicles";
import { Card, Descriptions, Input, Spin, Modal, Button } from "antd";

export const VehiclesComponent: React.FC = () => {
  const {
    data: vehicles,
    loading,
    searchQuery,
    handleSearch,
  } = useFetchPaginate("vehicles");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [resourceData, setResourceData] = useState<any[]>([]);
  const [fetchingResource, setFetchingResource] = useState(false);

  const handleOpenModal = async (title: string, urls: string[]) => {
    setModalVisible(true);
    setModalTitle(title);
    setFetchingResource(true);
    try {
      const resourcePromises = urls.map((url) =>
        fetch(url).then((response) => response.json())
      );
      const data = await Promise.all(resourcePromises);
      setResourceData(data);
    } catch (error) {
      console.error("Erro ao buscar dados do recurso:", error);
      setResourceData([]);
    } finally {
      setFetchingResource(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setResourceData([]);
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
            title="Informações dos Veículos da Saga Star Wars"
            bordered={false}
            style={{ width: "100%" }}
          >
            {vehicles.map((vehicle: IVehicles) => (
              <React.Fragment key={vehicle.url}>
                <Descriptions column={1} bordered style={{ marginBottom: 16 }}>
                  <Descriptions.Item label="Nome">
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
                  <Descriptions.Item label="Tamanho do Veículo">
                    {vehicle.length}
                  </Descriptions.Item>
                  <Descriptions.Item label="Manufatura">
                    {vehicle.manufacturer}
                  </Descriptions.Item>
                  <Descriptions.Item label="Máxima Velocidade Atmosférica">
                    {vehicle.max_atmosphering_speed}
                  </Descriptions.Item>
                  <Descriptions.Item label="Modelo">
                    {vehicle.model}
                  </Descriptions.Item>
                  <Descriptions.Item label="Passageiros">
                    {vehicle.passengers}
                  </Descriptions.Item>
                  <Descriptions.Item label="Classe de Veículo">
                    {vehicle.vehicle_class}
                  </Descriptions.Item>
                  <Descriptions.Item label="Recursos">
                    {vehicle.pilots.length > 0 && (
                      <Button
                        type="link"
                        onClick={() =>
                          // @ts-ignore
                          handleOpenModal("Pilotos", vehicle.pilots)
                        }
                      >
                        Pilotos
                      </Button>
                    )}
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Filmes", vehicle.films)}
                    >
                      Filmes
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
              </React.Fragment>
            ))}
          </Card>

          <Modal
            title={modalTitle}
            visible={modalVisible}
            onCancel={handleCloseModal}
            footer={null}
          >
            {fetchingResource ? (
              <Spin
                size="large"
                style={{ display: "flex", justifyContent: "center" }}
              />
            ) : (
              <Descriptions column={1} bordered>
                {resourceData.map((resource, index) => (
                  <Descriptions.Item
                    key={index}
                    label={resource.name || "Detalhe"}
                  >
                    {Object.entries(resource).map(([key, value]) => (
                      <p key={key}>
                        <strong>{key}:</strong>{" "}
                        {typeof value === "string"
                          ? value
                          : JSON.stringify(value)}
                      </p>
                    ))}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            )}
          </Modal>
        </>
      )}
    </>
  );
};
