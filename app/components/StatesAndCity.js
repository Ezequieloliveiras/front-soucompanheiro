// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { ScrollView } from 'react-native';
// import axios from 'axios';

// const StatesAndCity = ({ onSelectionChange }) => {
//     const [estados, setEstados] = useState([]);
//     const [estadoSelecionado, setEstadoSelecionado] = useState(null);
//     const [cidadesDoEstado, setCidadesDoEstado] = useState([]);
//     const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
//     const [listaExpandida, setListaExpandida] = useState(false);
//     const [listaCidadesExpandida, setListaCidadesExpandida] = useState(false);

//     useEffect(() => {
//         fetchIbgeUF();
//     }, []);

//     const fetchIbgeUF = async () => {
//         try {
//             const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
//             const sortedEstados = res.data.sort((a, b) => a.nome.localeCompare(b.nome));
//             setEstados(sortedEstados);
//         } catch (error) {
//             console.log('Erro ao buscar estados:', error.message);
//         }
//     };

//     const fetchCidades = async (estadoSigla) => {
//         try {
//             const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`);
//             setCidadesDoEstado(res.data);
//         } catch (error) {
//             console.log('Erro ao buscar cidades:', error.message);
//         }
//     };

//     const handleEstadoClick = (estado) => {
//         setEstadoSelecionado(estado);
//         setCidadeSelecionada(null);
//         fetchCidades(estado.sigla);
//         setListaCidadesExpandida(true);
//         onSelectionChange({ estado, cidade: null });
//     };

//     const handleCidadeClick = (cidade) => {
//         setCidadeSelecionada(cidade);
//         setListaCidadesExpandida(false);
//         onSelectionChange({ estado: estadoSelecionado, cidade });
//     };

//     const handleVoltar = () => {
//         setEstadoSelecionado(null);
//         setCidadesDoEstado([]);
//         setCidadeSelecionada(null);
//         setListaExpandida(false);
//         setListaCidadesExpandida(false);
//         onSelectionChange({ estado: null, cidade: null });
//     };

//     const toggleListaExpandida = () => {
//         setListaExpandida(!listaExpandida);
//     };

//     const toggleListaCidadesExpandida = () => {
//         setListaCidadesExpandida(!listaCidadesExpandida);
//     };

//     return (
//         <ScrollView style={{ flex: 1, padding: 20 }}>
//             {!estadoSelecionado ? (
//                 <>
//                     <TouchableOpacity style={styles.titleContainer} onPress={toggleListaExpandida}>
//                         <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Selecione seu Estado</Text>
//                         <Icon name={listaExpandida ? 'expand-less' : 'expand-more'} size={24} color="black" />
//                     </TouchableOpacity>
//                     {listaExpandida && (
//                         <FlatList
//                             style={{ marginTop: 10 }}
//                             data={estados}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity onPress={() => handleEstadoClick(item)}>
//                                     <Text style={{ fontSize: 16 }}>{item.nome} ({item.sigla})</Text>
//                                 </TouchableOpacity>
//                             )}
//                             keyExtractor={(item) => item.id.toString()}
//                         />
//                     )}
//                 </>
//             ) : (
//                 <>
//                     <TouchableOpacity style={styles.button} onPress={handleVoltar}>
//                         <Text style={styles.buttonText}>Voltar para selecionar outro estado</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.titleContainer} onPress={toggleListaCidadesExpandida}>
//                         <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Selecione a sua Cidade</Text>
//                         <Icon name={listaCidadesExpandida ? 'expand-less' : 'expand-more'} size={24} color="black" />
//                     </TouchableOpacity>
//                     {listaCidadesExpandida && (
//                         <FlatList
//                             style={{ marginTop: 10 }}
//                             data={cidadesDoEstado}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity onPress={() => handleCidadeClick(item)}>
//                                     <Text style={{
//                                         marginLeft: 10,
//                                         marginTop: 15,
//                                         marginBottom: 10,
//                                         color: cidadeSelecionada === item ? 'blue' : 'black',
//                                         fontSize: 16
//                                     }}>{item.nome}</Text>
//                                 </TouchableOpacity>
//                             )}
//                             keyExtractor={(item) => item.id.toString()}
//                         />
//                     )}
//                 </>
//             )}
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     titleContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginVertical: 10,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default StatesAndCity;
