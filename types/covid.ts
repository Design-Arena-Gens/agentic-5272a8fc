export interface CovidData {
  country: string;
  state?: string;
  date: string;
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  vaccinated: number;
  population: number;
  lat: number;
  lng: number;
}

export interface CountryData {
  country: string;
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  vaccinated: number;
  population: number;
  lat: number;
  lng: number;
  states?: StateData[];
  trend: number;
}

export interface StateData {
  state: string;
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  vaccinated: number;
  population: number;
  lat: number;
  lng: number;
  trend: number;
}

export interface TimeSeriesData {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
  vaccinated: number;
}

export interface PredictionData {
  date: string;
  predictedCases: number;
  predictedDeaths: number;
  predictedVaccinated: number;
  lowerBound: number;
  upperBound: number;
}

export interface DashboardStats {
  totalCases: number;
  activeCases: number;
  recovered: number;
  deaths: number;
  vaccinationRate: number;
  casesTrend: number;
  deathsTrend: number;
  recoveredTrend: number;
  vaccinationTrend: number;
}
