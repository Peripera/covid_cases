export default class CovidCountry {
  constructor({ country, cases, recovered, deaths, countryInfo }) {
    this.name = country;
    this.cases = cases;
    this.recovered = recovered;
    this.deaths = deaths;
    this.flag = countryInfo.flag;
  }
}