import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CountryCard({ country, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: country.flag }} style={styles.flag} />
      <View style={styles.info}>
        <Text style={styles.name}>{country.name}</Text>
        <Text>Casos: {country.cases.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  flag: { width: 50, height: 30, marginRight: 10 },
  info: { justifyContent: 'center' },
  name: { fontWeight: 'bold', fontSize: 16 },
});
