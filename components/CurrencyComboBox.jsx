import React, { useState } from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CurrencyComboBox = ({ currencies, onSelectCurrency }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(Object.keys(currencies)[0]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onSelectCurrency(currency);
  };

  return (
    <View style={styles.comboBox}>
    <RNPickerSelect
      onValueChange={handleCurrencyChange}
      items={Object.keys(currencies).map((currencyCode) => {
        return {
          label: `${currencies[currencyCode].emoji} ${currencies[currencyCode].name}`,
          value: currencyCode
        }
      })}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  comboBox: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderColor: '#e3771d', // Borde naranja
    borderWidth: 2, // Grosor del borde
    borderRadius: 10, // Bordes redondeados
    width: '100%', // O el ancho específico que necesites
    overflow: 'hidden', // Asegura que el contenido interno no sobresalga
  },
  // Puedes necesitar ajustar el estilo del Picker según la plataforma
});

export default CurrencyComboBox;
