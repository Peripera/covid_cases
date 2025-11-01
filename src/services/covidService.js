import apiClient from './api';

export const CovidService = {
  getAllCountries: async () => {
    const { data } = await apiClient.get('/countries');
    return data;
  },
  getCountryHistorical: async (country) => {
    const { data } = await apiClient.get(`/historical/${country}?lastdays=30`);
    return data;
  },
};
