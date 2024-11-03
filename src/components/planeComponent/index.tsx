import React, { useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { Card, Descriptions, Input, Spin, Modal, Button } from "antd";
import { IPlanet } from "../../types/planets";

export const PlanetComponent: React.FC = () => {
  const {
    data: planets,
    loading,
    searchQuery,
    handleSearch,
  } = useFetchPaginate("planets");

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
            value={searchQuery}
            style={{ marginBottom: 16 }}
            onSearch={handleSearch}
            defaultValue={searchQuery}
            allowClear
          />
          <Card title="Planets" style={{ width: "100%" }} bordered={false}>
            {planets.map((planet: IPlanet) => (
              <React.Fragment key={planet.url}>
                <Descriptions column={1} bordered style={{ marginBottom: 16 }}>
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
                  <Descriptions.Item label="Recursos">
                    <Button
                      type="link"
                      onClick={() =>
                        handleOpenModal("Residentes", planet.residents)
                      }
                    >
                      Residentes
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Filmes", planet.films)}
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
