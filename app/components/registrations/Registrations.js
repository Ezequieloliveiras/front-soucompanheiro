import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ProfilePhoto from '../profile/ProfilePhoto'
import StyledButton from '../buttons/Button'

const data = [
  {
    id: 1,
    vaga: "Pedreiro",
    divulgador: "Joao da Silva",
    local: "Ibatiba-ES",
    quantidadeVagas: 5,
    inscritos: 3,
    tag: 'inscrito',
    descrição: "Estamos em busca de um pedreiro experiente que já tenha trabalhado no campo. O candidato deve ser maior de idade e possuir habilidades práticas em construção, reparo e manutenção de estruturas. É essencial ter conhecimento em técnicas de alvenaria, leitura de plantas e segurança no trabalho. Procuramos alguém comprometido, com boa capacidade de trabalho em equipe e disposição para enfrentar os desafios do dia a dia na construção civil rural."
  },
  {
    id: 2,
    vaga: "Colhedor de Café",
    divulgador: "Maria da Silva",
    local: "Venda Nova do Imigrante-ES",
    quantidadeVagas: 2,
    inscritos: 1,
    tag: 'Não inscrito',
    descrição: "Procuramos colhedores de café dedicados e trabalhadores para se juntar à nossa equipe durante a safra. O candidato ideal deve ter experiência na colheita de café, ser ágil e cuidadoso na coleta dos grãos para garantir a qualidade do produto. Esperamos que os candidatos sejam pontuais, tenham boa condição física e disposição para trabalhar ao ar livre em diferentes condições climáticas. Oferecemos um ambiente de trabalho colaborativo e possibilidade de ganhos adicionais conforme a produtividade."
  },
  {
    id: 3,
    vaga: "Capinador",
    divulgador: "Jose da Silva",
    local: "Paraju-ES",
    quantidadeVagas: 8,
    inscritos: 5,
    descrição: "Estamos contratando capinadores para realizar o controle de ervas daninhas em nossas plantações. O candidato deve ser capaz de utilizar ferramentas manuais e mecânicas para capinar, além de seguir as orientações de manejo sustentável das culturas. Valorizamos a experiência anterior na função, boa resistência física e capacidade de trabalhar de forma independente. A pontualidade e o comprometimento com as tarefas diárias são essenciais para esta vaga."
  },
  {
    id: 4,
    vaga: "Roçador",
    divulgador: "Pedro da Silva",
    local: "Perobas-ES",
    quantidadeVagas: 2,
    inscritos: 1,
    descrição: "Estamos em busca de roçadores para integrar nossa equipe agrícola. O candidato ideal deve ter experiência na operação de roçadeiras manuais ou motorizadas, sendo responsável pelo corte e limpeza de áreas cultivadas e terrenos. É necessário ter atenção às normas de segurança, capacidade física para o trabalho árduo e disponibilidade para atuar em diferentes tipos de terreno. Procuramos indivíduos dedicados, com bom senso de organização e trabalho em equipe."
  },
  {
    id: 5,
    vaga: "Mecânico",
    divulgador: "Carlos da Silva",
    local: "Belo Horizonte-MG",
    quantidadeVagas: 3,
    inscritos: 2,
    descrição: "Estamos contratando um mecânico qualificado para manutenção e reparo de máquinas agrícolas. O candidato deve possuir conhecimento em mecânica de tratores, colheitadeiras e outros equipamentos utilizados no campo. É imprescindível ter habilidades técnicas, capacidade de diagnosticar problemas e realizar reparos eficientes. Valorizamos a experiência anterior na função, a capacidade de trabalhar sob pressão e o compromisso com a manutenção preventiva dos equipamentos para garantir o bom funcionamento das operações agrícolas."
  },
  {
    id: 6,
    vaga: "Plantador de Café",
    divulgador: "Ana da Silva",
    local: "Irupi-MG",
    quantidadeVagas: 1,
    inscritos: 0,
    descrição: "Procuramos plantadores de café para colaborar com nosso processo de plantio. O candidato deve ter experiência na preparação do solo, plantio e cuidados iniciais com as mudas de café. Buscamos pessoas com conhecimento em técnicas agrícolas sustentáveis, que sejam proativas e tenham disposição para trabalhar ao ar livre. É importante ter boa resistência física, atenção aos detalhes e capacidade de seguir instruções específicas para garantir a qualidade do plantio e o desenvolvimento saudável das plantas."
  }
]

const FlatListBasics = ({ navigation }) => {
  const [visibleItems, setVisibleItems] = useState({})

  const handleClick = (id) => {
    setVisibleItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const filteredData = data.filter(item => item.tag === 'inscrito')

  return (
    <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <ScrollView style={styles.container}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <TouchableOpacity
              onPress={() => handleClick(item.id)}
              key={item.id}
              style={styles.touchableItem}
            >
              <View style={styles.itemView}>
                <ProfilePhoto />
                <View style={styles.itemInfo}>
                  <Text style={styles.vagaText}>Função: {item.vaga}</Text>
                  <View style={styles.details}>
                    <Text style={styles.greyText}>Divulgador: {item.divulgador}</Text>
                    <Text style={styles.greyText}>Local: {item.local}</Text>
                  </View>

                  <Text style={styles.alreadyInscrito}>Já inscrito</Text>
                </View>
              </View>
              <View>
                {visibleItems[item.id] && (
                  <View style={styles.descriptionView}>
                    <StyledButton
                      marginTop={15}
                      title={'Desistir'}
                      height={30}
                      backgroundColor={'red'}
                      width={110}
                    />
                    <Text style={styles.descriptionText}>{item.descrição}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.errorText}>Nenhuma vaga como "inscrito" disponível.</Text>
        )}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableItem: {
    height: 'auto',
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    padding: 10,
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
  },
  itemView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 5,
  },
  itemInfo: {
    marginLeft: 10,
  },
  vagaText: {
    fontWeight: 'bold',
    color: '#0094FF',
    marginTop: 5,
  },
  details: {
    marginTop: 10,
    marginBottom: 10,
  },
  greyText: {
    color: 'grey',
  },
  greenText: {
    fontWeight: 'bold',
    color: 'green',
  },
  alreadyInscrito: {
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  descriptionView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  descriptionText: {
    textAlign: 'justify',
    color: 'grey',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  }
})

export default FlatListBasics
