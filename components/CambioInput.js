import { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Modal, Image ,Text} from 'react-native';
import CurrencyComboBox from './CurrencyComboBox';

const currencies = {
  "USD": {
    "emoji": "🇺🇸",
    "exchangeRate": 1,
    "name": "US Dollar"
  },
  "EUR": {
    "emoji": "🇪🇺",
    "exchangeRate": 0.89,
    "name": "Euro"
  },
  "JPY": {
    "emoji": "🇯🇵",
    "exchangeRate": 114.42,
    "name": "Japanese Yen"
  },
  "GBP": {
    "emoji": "🇬🇧",
    "exchangeRate": 0.75,
    "name": "British Pound"
  },
  "AUD": {
    "emoji": "🇦🇺",
    "exchangeRate": 1.35,
    "name": "Australian Dollar"
  },
  "CAD": {
    "emoji": "🇨🇦",
    "exchangeRate": 1.28,
    "name": "Canadian Dollar"
  },
  "CHF": {
    "emoji": "🇨🇭",
    "exchangeRate": 0.93,
    "name": "Swiss Franc"
  },
  "CNY": {
    "emoji": "🇨🇳",
    "exchangeRate": 6.36,
    "name": "Chinese Yuan"
  },
  "SEK": {
    "emoji": "🇸🇪",
    "exchangeRate": 8.51,
    "name": "Swedish Krona"
  },
  "NZD": {
    "emoji": "🇳🇿",
    "exchangeRate": 1.49,
    "name": "New Zealand Dollar"
  },
  "INR": {
    "emoji": "🇮🇳",
    "exchangeRate": 74.57,
    "name": "Indian Rupee"
  },
  "BRL": {
    "emoji": "🇧🇷",
    "exchangeRate": 5.22,
    "name": "Brazilian Real"
  },
  "RUB": {
    "emoji": "🇷🇺",
    "exchangeRate": 73.96,
    "name": "Russian Ruble"
  },
  "ZAR": {
    "emoji": "🇿🇦",
    "exchangeRate": 16.96,
    "name": "South African Rand"
  },
  "MXN": {
    "emoji": "🇲🇽",
    "exchangeRate": 20.45,
    "name": "Mexican Peso"
  }
  // Puedes agregar más códigos de moneda, emojis de banderas y nombres de moneda según tus necesidades
}




export default function CambioInput({ onNewCambio, visible, onCancel }) {
  const [newCambio, setNewCambio] = useState(""); // para el numero que pones la Cantidad:
  const [selectedCurrency, setSelectedCurrency] = useState(null); //lista banderas1
  const [selectedCurrency2, setSelectedCurrency2] = useState(null);//lista banderas2

  const [amount, setAmount] = useState(''); // contantes para los cambios abajo se usa para calcular el cmabio
  const [fromCurrency, setFromCurrency] = useState(''); // variable para lista 1 de donde es:
  const [toCurrency, setToCurrency] = useState('');// variable para lista 2 a donde lo quieres comvertir

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    setFromCurrency(currency);
    // Acciones adicionales si son necesarias
  };

  const handleSelectCurrency2 = (currency) => {
    setSelectedCurrency2(currency);
    setToCurrency(currency);
    // Acciones adicionales si son necesarias
  };


  function textChangeHandler(enteredText) {
    setNewCambio(enteredText);
    setAmount(enteredText);
    //El Cambio k pones con numeros
  }

  function onPressHandler() { // aqui le envio a App todo la cantidad calculada el numero puesto las banderas...
    if (newCambio) {
      const result = calcularCambio(Number(amount), fromCurrency, toCurrency);
      onNewCambio(result,Number(amount),currencies[fromCurrency].emoji,currencies[toCurrency].emoji,fromCurrency,toCurrency);
    }
    setNewCambio("");
  }
  //vista de la segunda pantalla
  return (
    <Modal
      visible={visible}
      animationType='slide'
    >
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/dollar.png")}
          style={styles.goalImg}
        />

        <View style={styles.fullWidthContainer}>
          <Text style={styles.fullWidthText}>Moneda Origen: {selectedCurrency ? selectedCurrency : 'Seleccione una moneda'}</Text>
          <CurrencyComboBox currencies={currencies} onSelectCurrency={handleSelectCurrency} />
        </View>
        <View style={styles.fullWidthContainer}>
        <Text style={styles.fullWidthText}>Cantidad: </Text>
        <TextInput
          onChangeText={textChangeHandler}
          style={styles.textInput}
          value={newCambio}
          placeholder='Cantidad'
          keyboardType="numeric"
        />
        </View>
        <Image
          source={require("../assets/flecha.png")}
          style={styles.goalImg}
        />
        <View style={styles.fullWidthContainer}>
          <Text style={styles.fullWidthText}>Moneda Destino: {selectedCurrency2 ? selectedCurrency2 : 'Seleccione una moneda'}</Text>
          <CurrencyComboBox currencies={currencies} onSelectCurrency={handleSelectCurrency2} />
        </View>
        <View style={styles.buttonContainer}>

          <View style={styles.button}>
            <Button
              color="#e3771d"
              title='Cancel'
              onPress={() => onCancel()}
            />
          </View>

          <View style={styles.button}>
            <Button
              title='Add'
              onPress={onPressHandler}
              color="#e3771d"
            />
          </View>

        </View>

      </View>
    </Modal>
    
  )
}


function calcularCambio(amount, fromCurrency, toCurrency) {
  // Verifica que both monedas existan en el objeto currencies
  if (currencies[fromCurrency] && currencies[toCurrency]) {
    const fromRate = currencies[fromCurrency].exchangeRate;
    const toRate = currencies[toCurrency].exchangeRate;

    // Calcula la moneda  de destino
    const amountInToCurrency = (amount / fromRate) * toRate;

    return parseFloat(amountInToCurrency.toFixed(1)); // lo retorno
  } else {
    // Si alguna de las monedas no existe, retorna un mensaje de error o null
    console.error("Una o ambas monedas no son válidas.");
    return null;
  }
}


const styles = new StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    alignItems: 'center',
    backgroundColor: "#fffee1"
  },
  textInput: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderColor: '#e3771d', // Borde naranja
    borderWidth: 2, // Grosor del borde
    borderRadius: 10, // Bordes redondeados
    width: '100%', // O el ancho específico que necesites
    overflow: 'hidden', // Asegura que el contenido interno no sobresalga
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    textAlign:'center',
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginLeft:10,
    marginRight:10,
    width: '40%'
  },
  goalImg: {
    width: 120,
    height: 120,
    margin: 20
  },
  CurrencyComboBox: {
    width: '100%',
  },
  fullWidthContainer: {
    paddingTop:10,
    width: '80%', // Esto hace que el contenedor ocupe el 100% del ancho
    alignItems: 'center', // Centra los elementos horizontalmente
    paddingHorizontal: 10, // Añade un poco de espacio a los lados si lo necesitas
  },
  fullWidthText: {
    width: '100%', // Asegura que el texto también ocupe el 100%
    textAlign: 'left', // Centra el texto si es necesario
  },

});
