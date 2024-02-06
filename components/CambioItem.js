import { StyleSheet, View, Text, Pressable,Image,TouchableOpacity } from "react-native";

export default function CambioItem({ cambio, onDeleteGoal }) {
  return (
    //aqui ya representa el cambio, el numero puesto las banderas...
      <View style={styles.exItem} >
          <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onDeleteGoal(cambio.id)} style={styles.button}>
                    <Image source={require("../assets/menos.png")} style={styles.menosImg}/>
                    </TouchableOpacity>
          </View>
          <View style={styles.container} >
            <View style={styles.centrar}>
                <Text style={styles.cambioFlag}>{cambio.origen}</Text>
                <Text style={styles.cambioText}>{cambio.original} {cambio.nombreorigen}</Text>
            </View>
            <Image
              source={require("../assets/flechad.png")}
              style={styles.cambioImg}
            />
            <View style={styles.centrar}>
                <Text style={styles.cambioFlag}>{cambio.destino}</Text>
                <Text style={styles.cambioText}>{cambio.text} {cambio.nombredestino}</Text>
            </View>
          </View>
      </View>
  )
}

const styles = new StyleSheet.create({
  exItem: {
    padding:0,
    marginBottom:15,
    borderRadius: 12,
    backgroundColor: "#d0e09f"
  },
  container:{
    flex: 1,
    flexDirection: 'row', // Alinea elementos horizontalmente
    alignItems: 'center', // Alinea elementos verticalmente en el centro
    justifyContent: 'space-between', // Distribuye espacio entre elementos
    padding: 20,
    paddingTop: 0,
    marginBottom: 10,
  },
  cambioText: {
    fontSize: 16,   // Tamaño del texto
  },
  cambioFlag: {
    fontSize: 40,   // Tamaño del texto
    paddingBottom:5,
  },
  cambioImg: {
    width: 90,
    height: 40,
  },
  pressedItem: {
    opacity: 0.5,
  },
  centrar: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'flex-end', // Alinea el botón a la derecha
    marginTop:10,
    marginRight: 10,       // Margen derecho para separar el botón del borde de la pantalla
  },
  menosImg: {
    width: 35,
    height: 35,
  },

})
