import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";

const StatesAndCityAPI = () => {
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [cidadesDoEstado, setCidadesDoEstado] = useState([]);

  useEffect(() => {
    fetchIbgeUF();
  }, []);

  const fetchIbgeUF = async () => {
    try {
      const res = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      setEstados(res.data);
    } catch (error) {
      console.log("Erro ao buscar estados:", error.message);
    }
  };

  const fetchCidades = async (estadoSigla) => {
    try {
      const res = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`
      );
      setCidadesDoEstado(res.data);
    } catch (error) {
      console.log("Erro ao buscar cidades:", error.message);
    }
  };

  const handleEstadoClick = (estado) => {
    setEstadoSelecionado(estado);
    fetchCidades(estado.sigla);
  };

  const handleVoltar = () => {
    setEstadoSelecionado(null);
    setCidadesDoEstado([]);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {!estadoSelecionado ? (
        <>
          <Text>Selecione um estado para ver as cidades:</Text>
          <FlatList
            style={{ marginTop: 10 }}
            data={estados}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEstadoClick(item)}>
                <Text>{item.nome} ({item.sigla})</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      ) : (
        <>
          <Button title="Voltar para selecionar outro estado" onPress={handleVoltar} />
          <Text style={{ marginTop: 10 }}>Cidades do estado {estadoSelecionado.nome}:</Text>
          <FlatList
            style={{ marginTop: 10 }}
            data={cidadesDoEstado}
            renderItem={({ item }) => (
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text>{item.nome}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

export default StatesAndCityAPI;
