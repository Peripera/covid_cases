import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.warn('Error: Timeout al conectar con la API.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;

