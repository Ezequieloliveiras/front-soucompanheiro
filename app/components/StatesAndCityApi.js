import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import client from "../api/client";

const StatesAndCityAPI = () => {
    const [estados, setEstados] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [cidadesDoEstado, setCidadesDoEstado] = useState([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
    const [listaExpandida, setListaExpandida] = useState(false);

    useEffect(() => {
        fetchIbgeUF();
    }, []);

    const fetchIbgeUF = async () => {
        try {
            const res = await axios.get(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            );
            const sortedEstados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
            setEstados(sortedEstados);
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
        setCidadeSelecionada(null);
        fetchCidades(estado.sigla);
    };

    const handleCidadeClick = (cidade) => {
        setCidadeSelecionada(cidade);
    };

    const handleVoltar = () => {
        setEstadoSelecionado(null);
        setCidadesDoEstado([]);
        setCidadeSelecionada(null);
        setListaExpandida(false);
    };

    const handleEnviarParaBanco = async () => {
        try {
            const res = await client.post('/users/associate-state-city', {
                cidade: cidadeSelecionada.nome,
                estado: estadoSelecionado.nome,
                userId: '666c6c4777a32f5ebdf227b1'
            });
    
            console.log(res.data);
            Alert.alert("Enviado", `Estado ${estadoSelecionado.nome} e cidade ${cidadeSelecionada.nome} foram associados ao usuário.`);
        } catch (error) {
            console.error('Erro ao enviar para o banco:', error.message);
            Alert.alert('Erro', 'Não foi possível associar estado e cidade ao usuário.');
        }
    };
    

    const toggleListaExpandida = () => {
        setListaExpandida(!listaExpandida);
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            {!estadoSelecionado ? (
                <>
                    <TouchableOpacity style={styles.titleContainer} onPress={toggleListaExpandida}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Selecione seu Estado</Text>
                        <Icon style={{ width: 200 }} name={listaExpandida ? "expand-less" : "expand-more"} size={24} color="black" />
                    </TouchableOpacity>
                    {listaExpandida && (
                        <FlatList
                            style={{ marginTop: 10}}
                            data={estados}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleEstadoClick(item)}>
                                    <Text style={{fontSize:16, marginTop:20}}>{item.nome} ({item.sigla})</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    )}
                </>
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={handleVoltar}>
                        <Text style={styles.buttonText}>Voltar para selecionar outro estado</Text>
                    </TouchableOpacity>
                    {cidadeSelecionada && (
                        <TouchableOpacity style={styles.button} onPress={handleEnviarParaBanco}>
                            <Text style={styles.buttonText}>Selecionado {estadoSelecionado.nome} - {cidadeSelecionada.nome}</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={{ marginTop: 10, fontWeight:'bold', fontSize: 16 }}>Selecione a sua Cidade:</Text>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={cidadesDoEstado}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleCidadeClick(item)}>
                                <Text style={{ marginLeft: 10, marginTop: 15, marginBottom: 10, color: cidadeSelecionada === item ? 'blue' : 'black', fontSize: 16 }}>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StatesAndCityAPI;
