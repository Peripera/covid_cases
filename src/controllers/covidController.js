import CovidCountry from '../models/covidModel';
import { CovidService } from '../services/covidService';

export const fetchCountries = async () => {
  try {
    const rawData = await CovidService.getAllCountries();
    const sortedData = rawData.sort((a, b) => b.cases - a.cases).slice(0, 20);
    return sortedData.map((item) => new CovidCountry(item));
  } catch (error) {
    console.error('Error al obtener países:', error);
    throw error;
  }
};

export const fetchCountryHistorical = async (country) => {
  try {
    const data = await CovidService.getCountryHistorical(country);
    const dates = Object.keys(data.timeline.cases);
    const formatted = dates.map((date) => ({
      date,
      cases: data.timeline.cases[date],
      deaths: data.timeline.deaths[date],
      recovered: data.timeline.recovered[date],
    }));
    return formatted.sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error('Error al obtener histórico:', error);
    throw error;
  }
};
