import React, { useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { IStarship } from "../../types/starships";
import { Card, Descriptions, Input, Spin, Modal, Button } from "antd";

export const StarshipsComponent: React.FC = () => {
  const {
    data: starships,
    loading,
    searchQuery,
    handleSearch,
  } = useFetchPaginate("starships");

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
            placeholder="Pesquisar"
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
            allowClear
            defaultValue={searchQuery}
          />

          <Card
            title="Naves Estelares"
            bordered={false}
            style={{ width: "100%" }}
          >
            {starships.map((starship: IStarship) => (
              <React.Fragment key={starship.url}>
                <Descriptions column={1} bordered style={{ marginBottom: 16 }}>
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
                  <Descriptions.Item label="Custo em créditos">
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
                  <Descriptions.Item label="Recursos">
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Filmes", starship.films)}
                    >
                      Filmes
                    </Button>
                    {starship.pilots.length > 0 && (
                      <Button
                        type="link"
                        onClick={() =>
                          // @ts-ignore
                          handleOpenModal("Pilotos", starship.pilots)
                        }
                      >
                        Pilotos
                      </Button>
                    )}
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
