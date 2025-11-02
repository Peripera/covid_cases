import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchCountries, fetchGlobalStats } from '../src/controllers/covidController';
import CountryCard from '../src/view/components/countryCart';

//Country type 
type Country = {
  name: string;
  flag: string;
  cases: number;
  recovered: number;
  deaths: number;
};

type GlobalStats = {
  cases: number;
  deaths: number;
  recovered: number;
  updated: number;
};

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [countriesData, globalData] = await Promise.all([
          fetchCountries(),
          fetchGlobalStats(),
        ]);
        setCountries(countriesData);
        setGlobalStats(globalData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0088cc" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {globalStats && (
        <View style={styles.globalCard}>
          <Text style={styles.globalTitle}>Situación Global COVID-19</Text>
          <Text>Total de casos: {globalStats.cases.toLocaleString()}</Text>
          <Text>Recuperados: {globalStats.recovered.toLocaleString()}</Text>
          <Text>Fallecidos: {globalStats.deaths.toLocaleString()}</Text>
        </View>
      )}

      <FlatList
        data={countries}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/country',
              params: {
                name: item.name,
                flag: item.flag,
                cases: item.cases,
                recovered: item.recovered,
                deaths: item.deaths,
              },
            }}
            asChild
          >
            <CountryCard country={item} onPress={() => {}} />
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  globalCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    elevation: 2,
  },
  globalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});