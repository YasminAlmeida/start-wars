import React, { useState } from "react";
import { IFilm } from "../../types/films";
import {
  Card,
  Descriptions,
  Input,
  Modal,
  Spin,
  Typography,
  Button,
} from "antd";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";

export const FilmsComponent: React.FC = () => {
  const {
    data: films,
    loading,
    searchQuery,
    handleSearch,
  } = useFetchPaginate("films");

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

  // Fechar o modal e limpar os dados
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
                <Descriptions
                  style={{
                    marginBottom: 16,
                  }}
                  column={1}
                  bordered
                >
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
                  <Descriptions.Item label="Recursos">
                    <Button
                      type="link"
                      onClick={() =>
                        handleOpenModal("Personagens", film.characters)
                      }
                    >
                      Personagens
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Planetas", film.planets)}
                    >
                      Planetas
                    </Button>
                    <Button
                      type="link"
                      onClick={() =>
                        handleOpenModal("Naves Estelares", film.starships)
                      }
                    >
                      Naves Estelares
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Veículos", film.vehicles)}
                    >
                      Veículos
                    </Button>
                    <Button
                      type="link"
                      onClick={() => handleOpenModal("Espécies", film.species)}
                    >
                      Espécies
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
