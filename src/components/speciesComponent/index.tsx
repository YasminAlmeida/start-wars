import React, { useState } from "react";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";
import { ISpecies } from "../../types/species";
import { Card, Descriptions, Input, Spin, Modal, Button } from "antd";

export const SpeciesComponent: React.FC = () => {
  const {
    data: species,
    loading,
    searchQuery,
    handleSearch,
  } = useFetchPaginate("species");

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
            title={"Informações das Especies da Saga Star Wars"}
            bordered={false}
            style={{ width: "100%" }}
          >
            {species.map((species: ISpecies) => (
              <React.Fragment key={species.name}>
                <Descriptions
                  column={1}
                  bordered
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Descriptions.Item label="Nome">
                    {species.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Designação">
                    {species.designation}
                  </Descriptions.Item>
                  <Descriptions.Item label="Classificação">
                    s{species.classification}
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
                  <Descriptions.Item label="Recursos">
                    <Button
                      type="link"
                      onClick={() =>
                        handleOpenModal("Personagens", species.people)
                      }
                    >
                      Personagens
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Filmes", species.films)}
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
