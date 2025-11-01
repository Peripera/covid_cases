export type RootStackParamList = {
  Home: undefined;
  CountryDetail: {
    country: {
      name: string;
      flag: string;
      cases: number;
      recovered: number;
      deaths: number;
    };
  };
};