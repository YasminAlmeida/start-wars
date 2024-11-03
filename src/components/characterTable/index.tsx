import React, { useState } from "react";
import { Table, Modal, Button, Input } from "antd";
import { IPeople } from "../../types/people";
import { useFetchPaginate } from "../../hooks/useFetchPaginate";

const CharacterTable: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<IPeople>(
    {} as IPeople
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data, loading, searchQuery, handleSearch } =
    useFetchPaginate("people");

  const handleModalOpen = (character: IPeople) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
    console.log("character", character);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCharacter({} as IPeople);
  };

  return (
    <>
      <Input.Search
        placeholder="Buscar personagens"
        style={{ marginBottom: 16 }}
        allowClear
        defaultValue={searchQuery}
        onSearch={handleSearch}
      />
      <Table
        dataSource={data as IPeople[]}
        loading={loading}
        rowKey="name"
        pagination={{ pageSize: 5 }}
        columns={[
          { title: "Nome", dataIndex: "name", key: "name" },
          { title: "Altura", dataIndex: "height", key: "height" },
          { title: "Massa", dataIndex: "mass", key: "mass" },
          { title: "Gênero", dataIndex: "gender", key: "gender" },
          {
            title: "Ações",
            render: (record) => (
              <Button type="primary" onClick={() => handleModalOpen(record)}>
                Ver Detalhes
              </Button>
            ),
          },
        ]}
      />
      <Modal
        title="Detalhes do Personagem"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={<Button onClick={handleModalClose}>Fechar</Button>}
      >
        {selectedCharacter && (
          <div>
            <p>Nome: {selectedCharacter.name}</p>
            <p>Altura: {selectedCharacter.height}</p>
            <p>Peso: {selectedCharacter.mass}</p>
            <p>Gênero: {selectedCharacter.gender}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CharacterTable;
