import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { fetchCountries } from '../src/controllers/covidController';
import CountryCard from '../src/view/components/countryCart';

//Country type 
type Country = {
  name: string;
  flag: string;
  cases: number;
  recovered: number;
  deaths: number;
};

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]); //
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error al cargar países:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0088cc" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
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
  container: { flex: 1, backgroundColor: '#fff' },
});
