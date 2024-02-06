import { View, TextInput, Button, Text, StyleSheet, FlatList ,Image,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import CambioInput from './components/CambioInput';
import CambioItem from './components/CambioItem';
import { StatusBar } from 'expo-status-bar';




export default function App() {
  const [myCambios, setMyCambio] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function addCambioHandler(newGoalText,numero,fromCurrency,toCurrency,NombreOrigen,NombreDestino) {
    setMyCambio(myCurrentGoals => [{ // aqui pillas las cosas enviadas del CambioInput y se las envio a CambioItem para k lo represente
      id: Date.now(),
      text: newGoalText,
      original: numero,
      origen: fromCurrency,
      destino: toCurrency,
      nombreorigen:NombreOrigen,
      nombredestino:NombreDestino,
    }, ...myCurrentGoals
    ]);
    setModalVisible(false);
  }

  function onDeleteCambio(id) { // esto es para borrar
    setMyCambio((myCurrentGoals) => myCurrentGoals.filter((cambio) => cambio.id != id));
  }

  // vista
  return (
    <>
      <StatusBar style='light' />
      
      <View style={styles.container}>
       
      <View style={styles.flexx}> 
        <Image source={require('./assets/img-portada.png')} style={{flex: 1, resizeMode: 'contain'}} />
        <Text style={[styles.header, {flex: 1}]}>Current Exchange</Text>
      </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} >
            <Image source={require('./assets/mas.png')} style={styles.masImg} />

          </TouchableOpacity>
        </View>

        <CambioInput
          onNewCambio={addCambioHandler}
          onCancel={() => setModalVisible(false)}
          visible={modalVisible}
        />

        <View style={styles.CambiosContainer}>
          <FlatList
            data={myCambios}
            renderItem={(dataItem) => (
              <CambioItem
                key={dataItem.item.id}
                cambio={dataItem.item}
                onDeleteGoal={onDeleteCambio}
              />
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffee1",
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  CambiosContainer: {
    paddingTop:10,
    flex: 5,
  },
  flexx: {
    flex: 2,
    flexDirection: 'row', // Alinea elementos horizontalmente
    alignItems: 'center', // Alinea elementos verticalmente en el centro
    justifyContent: 'space-between', // Distribuye espacio entre elementos
  },
  header: {
    marginLeft: 15,
    fontWeight: 'bold', // Hace el texto en negrita
    fontSize: 30, 
    // Añade los estilos que necesites para el texto aquí
  },
  buttonContainer: {
    alignItems: 'flex-end', // Alinea el botón a la derecha
    marginRight: 15,       // Margen derecho para separar el botón del borde de la pantalla
  },
  button: {
    backgroundColor: '#e3771d', // Color de fondo del botón
    paddingHorizontal: 12,      // Padding horizontal para controlar el ancho del botón
    paddingVertical: 6,         // Padding vertical para controlar la altura del botón
    borderRadius: 10,           // Redondea las esquinas del botón
  },
  buttonText: {
    color: 'white', // Color del texto
    fontSize: 16,   // Tamaño del texto
    fontWeight: 'bold', // Negrita para el texto
  },
  masImg: {
    width: 40,
    height: 40,
  },
});

