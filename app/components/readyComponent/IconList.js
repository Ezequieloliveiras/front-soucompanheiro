import {
    useState,
    useEffect
} from 'react'
import {
    View,
    Text
} from 'react-native'
import {
    Picker,
    TextInput,
    List
} from 'react-native-paper'
import axios from 'axios'

const StatesAndCityAPI = () => {
    const [estados, setEstados] = useState([])
    const [estadoSelecionado, setEstadoSelecionado] = useState(null)
    const [cidadesDoEstado, setCidadesDoEstado] = useState([])

    useEffect(() => {
        fetchIbgeUF()
    }, [])

    const fetchIbgeUF = async () => {
        try {
            const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            setEstados(res.data)
        } catch (error) {
            console.log('Erro ao buscar estados:', error.message)
        }
    }

    const fetchCidades = async (estadoSigla) => {
        try {
            const res = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`)
            setCidadesDoEstado(res.data)
        } catch (error) {
            console.log('Erro ao buscar cidades:', error.message)
        }
    }

    const handleEstadoChange = (estado) => {
        setEstadoSelecionado(estado)
        fetchCidades(estado.sigla)
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Selecione um estado:</Text>
            <Picker
                selectedValue={estadoSelecionado}
                onValueChange={(itemValue) => handleEstadoChange(itemValue)}
                style={{ height: 50, width: 200 }}
            >
                <Picker.Item label="Selecione um estado" value={null} />
                {estados.map((estado) => (
                    <Picker.Item key={estado.id} label={`${estado.nome} (${estado.sigla})`} value={estado} />
                ))}
            </Picker>

            {estadoSelecionado && (
                <View style={{ marginTop: 20 }}>
                    <Text>Cidade selecionada:</Text>
                    <TextInput
                        mode="outlined"
                        value={estadoSelecionado.nome}
                        disabled
                        style={{ marginTop: 10 }}
                    />
                </View>
            )}

            {estadoSelecionado && (
                <View style={{ marginTop: 20 }}>
                    <List.Accordion
                        title={`Cidades do estado ${estadoSelecionado.nome}`}
                        expanded={true}
                        style={{ backgroundColor: '#f0f0f0' }}
                    >
                        {cidadesDoEstado.map((cidade) => (
                            <List.Item
                                key={cidade.id}
                                title={cidade.nome}
                                onPress={() => { }}
                            />
                        ))}
                    </List.Accordion>
                </View>
            )}
        </View>
    )
}

export default StatesAndCityAPI
