import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, Portal, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { MD3Colors } from 'react-native-paper'

export default function ListaAlunos({ navigation, route }) {
  const [alunos, setAlunos] = useState([
    {
      nome: 'Jaciara Araujo',
      matricula: '2021001',
      turno: 'Noite',
      curso: 'Farmacia'
    },
    {
      nome: 'Guilherme e Silva Souza',
      matricula: '2021002',
      turno: 'Noite',
      curso: 'ADS'
    }
  ])
  const [showModalExcluirAluno, setShowModalExcluirAluno] = useState(false)
  const [alunoASerExcluido, setAlunoASerExcluido] = useState(null)

  const showModal = () => setShowModalExcluirAluno(true)
  const hideModal = () => setShowModalExcluirAluno(false)

  function adicionarAluno(aluno) {
    let novaListaAlunos = [...alunos, aluno]
    setAlunos(novaListaAlunos)
  }

  function editarAluno(alunoAntigo, novosDados) {
    const novaListaAlunos = alunos.map((aluno) => {
      if (aluno === alunoAntigo) {
        return novosDados
      } else {
        return aluno
      }
    })
    setAlunos(novaListaAlunos)
  }

  function excluirAluno(aluno) {
    const novaListaAlunos = alunos.filter((a) => a !== aluno)
    setAlunos(novaListaAlunos)
    Toast.show({
      type: 'success',
      text1: 'Aluno excluído com sucesso!'
    })
  }

  function handleExcluirAluno() {
    excluirAluno(alunoASerExcluido)
    setAlunoASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Lista de Alunos
      </Text>

      <FlatList
        style={styles.list}
        data={alunos}
        renderItem={({ item }) => (
          <Card mode="outlined" style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">{item?.nome}</Text>
                <Text variant="bodyLarge">Matrícula: {item?.matricula}</Text>
                <Text variant="bodyLarge">Turno: {item?.turno}</Text>
                <Text variant="bodyLarge">Curso: {item?.curso}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() =>
                  navigation.push('FormAlunos', { acao: editarAluno, aluno: item })
                }
              >
                Editar
              </Button>
              <Button
                onPress={() => {
                  setAlunoASerExcluido(item)
                  showModal()
                }}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

     
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormAlunos', { acao: adicionarAluno })}
      />

      
      <Portal>
        <Dialog visible={showModalExcluirAluno} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este aluno?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExcluirAluno}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  list: {
    width: '90%'
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})
