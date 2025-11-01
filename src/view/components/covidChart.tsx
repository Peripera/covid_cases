import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

type Props = {
  data: { date: string; cases: number; deaths?: number; recovered?: number }[];
};

export default function CovidChart({ data }: Props) {
  if (!data || data.length === 0) return null;

  // +Las seven days
  const lastDays = data.slice(-7);
  const labels = lastDays.map((item) => item.date);
  const cases = lastDays.map((item) => item.cases);

  return (
    <View>
      <LineChart
        data={{
          labels,
          datasets: [{ data: cases }],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 8 },
        }}
        bezier
      />
    </View>
  );
}
