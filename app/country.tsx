import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, ScrollView, StyleSheet, Text } from 'react-native';
import { fetchCountryHistorical } from '../src/controllers/covidController';
import CovidChart from '../src/view/components/covidChart';

// Tipo del histórico
type HistoricalEntry = {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
};

export default function CountryDetail() {
  const { name, flag, cases, recovered, deaths } = useLocalSearchParams<{
    name: string;
    flag: string;
    cases: string;
    recovered: string;
    deaths: string;
  }>();

  const [historical, setHistorical] = useState<HistoricalEntry[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  const router= useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCountryHistorical(name);
        setHistorical(data);
      } catch (error) {
        console.error('Error al cargar histórico:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Image source={{ uri: flag }} style={styles.flag} />
      <Text>Casos: {cases}</Text>
      <Text>Recuperados: {recovered}</Text>
      <Text>Decesos: {deaths}</Text>
      <CovidChart data={historical} />
       <Button title="Volver" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    flag: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
});
