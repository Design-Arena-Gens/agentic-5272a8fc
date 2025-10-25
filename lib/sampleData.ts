import { CountryData, TimeSeriesData, PredictionData } from '@/types/covid';

export const sampleCountries: CountryData[] = [
  {
    country: 'United States',
    totalCases: 103436829,
    activeCases: 1523442,
    recovered: 99913387,
    deaths: 1123567,
    vaccinated: 270000000,
    population: 331900000,
    lat: 37.0902,
    lng: -95.7129,
    trend: -2.3
  },
  {
    country: 'India',
    totalCases: 44690738,
    activeCases: 234567,
    recovered: 43930171,
    deaths: 530000,
    vaccinated: 1020000000,
    population: 1380000000,
    lat: 20.5937,
    lng: 78.9629,
    trend: 1.2
  },
  {
    country: 'Brazil',
    totalCases: 37076053,
    activeCases: 445678,
    recovered: 35942375,
    deaths: 689000,
    vaccinated: 185000000,
    population: 212600000,
    lat: -14.2350,
    lng: -51.9253,
    trend: -0.8
  },
  {
    country: 'France',
    totalCases: 38997490,
    activeCases: 123456,
    recovered: 38717034,
    deaths: 157000,
    vaccinated: 54000000,
    population: 67390000,
    lat: 46.2276,
    lng: 2.2137,
    trend: -1.5
  },
  {
    country: 'Germany',
    totalCases: 38437756,
    activeCases: 234567,
    recovered: 37987189,
    deaths: 216000,
    vaccinated: 64000000,
    population: 83240000,
    lat: 51.1657,
    lng: 10.4515,
    trend: -0.5
  },
  {
    country: 'United Kingdom',
    totalCases: 24658705,
    activeCases: 178901,
    recovered: 24290804,
    deaths: 189000,
    vaccinated: 53000000,
    population: 67220000,
    lat: 55.3781,
    lng: -3.4360,
    trend: -1.8
  },
  {
    country: 'Russia',
    totalCases: 22075858,
    activeCases: 567890,
    recovered: 21120968,
    deaths: 387000,
    vaccinated: 89000000,
    population: 145930000,
    lat: 61.5240,
    lng: 105.3188,
    trend: 0.3
  },
  {
    country: 'Italy',
    totalCases: 25603510,
    activeCases: 89012,
    recovered: 24943498,
    deaths: 191000,
    vaccinated: 50000000,
    population: 60360000,
    lat: 41.8719,
    lng: 12.5674,
    trend: -2.1
  },
  {
    country: 'Japan',
    totalCases: 33320438,
    activeCases: 456789,
    recovered: 32789649,
    deaths: 74000,
    vaccinated: 104000000,
    population: 125800000,
    lat: 36.2048,
    lng: 138.2529,
    trend: 0.7
  },
  {
    country: 'Spain',
    totalCases: 13978272,
    activeCases: 67890,
    recovered: 13797382,
    deaths: 113000,
    vaccinated: 42000000,
    population: 47350000,
    lat: 40.4637,
    lng: -3.7492,
    trend: -1.2
  },
  {
    country: 'South Korea',
    totalCases: 30615522,
    activeCases: 345678,
    recovered: 30245844,
    deaths: 24000,
    vaccinated: 44000000,
    population: 51780000,
    lat: 35.9078,
    lng: 127.7669,
    trend: 1.5
  },
  {
    country: 'Australia',
    totalCases: 11399460,
    activeCases: 123456,
    recovered: 11261004,
    deaths: 15000,
    vaccinated: 21000000,
    population: 25690000,
    lat: -25.2744,
    lng: 133.7751,
    trend: -0.9
  },
  {
    country: 'Canada',
    totalCases: 4648228,
    activeCases: 78901,
    recovered: 4517327,
    deaths: 52000,
    vaccinated: 32000000,
    population: 38010000,
    lat: 56.1304,
    lng: -106.3468,
    trend: -1.6
  },
  {
    country: 'Mexico',
    totalCases: 7633355,
    activeCases: 234567,
    recovered: 7066788,
    deaths: 332000,
    vaccinated: 91000000,
    population: 128900000,
    lat: 23.6345,
    lng: -102.5528,
    trend: 0.4
  },
  {
    country: 'Indonesia',
    totalCases: 6734836,
    activeCases: 156789,
    recovered: 6569047,
    deaths: 9000,
    vaccinated: 203000000,
    population: 273500000,
    lat: -0.7893,
    lng: 113.9213,
    trend: 0.8
  },
  {
    country: 'China',
    totalCases: 99303000,
    activeCases: 789012,
    recovered: 98509000,
    deaths: 5000,
    vaccinated: 1320000000,
    population: 1410000000,
    lat: 35.8617,
    lng: 104.1954,
    trend: 2.1
  },
  {
    country: 'Turkey',
    totalCases: 17004677,
    activeCases: 234567,
    recovered: 16770110,
    deaths: 101000,
    vaccinated: 58000000,
    population: 84340000,
    lat: 38.9637,
    lng: 35.2433,
    trend: -0.7
  },
  {
    country: 'Poland',
    totalCases: 6379463,
    activeCases: 89012,
    recovered: 6195451,
    deaths: 85000,
    vaccinated: 22000000,
    population: 37970000,
    lat: 51.9194,
    lng: 19.1451,
    trend: -1.3
  },
  {
    country: 'Argentina',
    totalCases: 10044957,
    activeCases: 123456,
    recovered: 9914501,
    deaths: 130000,
    vaccinated: 38000000,
    population: 45380000,
    lat: -38.4161,
    lng: -63.6167,
    trend: -0.6
  },
  {
    country: 'South Africa',
    totalCases: 4063327,
    activeCases: 67890,
    recovered: 3891437,
    deaths: 104000,
    vaccinated: 19000000,
    population: 59310000,
    lat: -30.5595,
    lng: 22.9375,
    trend: 0.2
  }
];

export const sampleTimeSeries: TimeSeriesData[] = [
  { date: '2024-10-01', cases: 95234567, deaths: 2123456, recovered: 89234567, vaccinated: 5200000000 },
  { date: '2024-10-08', cases: 95456789, deaths: 2134567, recovered: 89456789, vaccinated: 5220000000 },
  { date: '2024-10-15', cases: 95678901, deaths: 2145678, recovered: 89678901, vaccinated: 5240000000 },
  { date: '2024-10-22', cases: 95901234, deaths: 2156789, recovered: 89901234, vaccinated: 5260000000 },
  { date: '2024-10-29', cases: 96123456, deaths: 2167890, recovered: 90123456, vaccinated: 5280000000 },
  { date: '2024-11-05', cases: 96345678, deaths: 2178901, recovered: 90345678, vaccinated: 5300000000 },
  { date: '2024-11-12', cases: 96567890, deaths: 2189012, recovered: 90567890, vaccinated: 5320000000 },
  { date: '2024-11-19', cases: 96790123, deaths: 2200123, recovered: 90790123, vaccinated: 5340000000 },
  { date: '2024-11-26', cases: 97012345, deaths: 2211234, recovered: 91012345, vaccinated: 5360000000 },
  { date: '2024-12-03', cases: 97234567, deaths: 2222345, recovered: 91234567, vaccinated: 5380000000 },
  { date: '2024-12-10', cases: 97456789, deaths: 2233456, recovered: 91456789, vaccinated: 5400000000 },
  { date: '2024-12-17', cases: 97678901, deaths: 2244567, recovered: 91678901, vaccinated: 5420000000 },
  { date: '2024-12-24', cases: 97901234, deaths: 2255678, recovered: 91901234, vaccinated: 5440000000 },
  { date: '2024-12-31', cases: 98123456, deaths: 2266789, recovered: 92123456, vaccinated: 5460000000 },
  { date: '2025-01-07', cases: 98345678, deaths: 2277890, recovered: 92345678, vaccinated: 5480000000 },
  { date: '2025-01-14', cases: 98567890, deaths: 2288901, recovered: 92567890, vaccinated: 5500000000 },
  { date: '2025-01-21', cases: 98790123, deaths: 2300012, recovered: 92790123, vaccinated: 5520000000 },
  { date: '2025-01-28', cases: 99012345, deaths: 2311123, recovered: 93012345, vaccinated: 5540000000 },
  { date: '2025-02-04', cases: 99234567, deaths: 2322234, recovered: 93234567, vaccinated: 5560000000 },
  { date: '2025-02-11', cases: 99456789, deaths: 2333345, recovered: 93456789, vaccinated: 5580000000 },
  { date: '2025-02-18', cases: 99678901, deaths: 2344456, recovered: 93678901, vaccinated: 5600000000 },
  { date: '2025-02-25', cases: 99901234, deaths: 2355567, recovered: 93901234, vaccinated: 5620000000 },
  { date: '2025-03-04', cases: 100123456, deaths: 2366678, recovered: 94123456, vaccinated: 5640000000 },
  { date: '2025-03-11', cases: 100345678, deaths: 2377789, recovered: 94345678, vaccinated: 5660000000 }
];

export const samplePredictions: PredictionData[] = [
  { date: '2025-03-18', predictedCases: 100567890, predictedDeaths: 2388900, predictedVaccinated: 5680000000, lowerBound: 100400000, upperBound: 100700000 },
  { date: '2025-03-25', predictedCases: 100790123, predictedDeaths: 2400011, predictedVaccinated: 5700000000, lowerBound: 100600000, upperBound: 100900000 },
  { date: '2025-04-01', predictedCases: 101012345, predictedDeaths: 2411122, predictedVaccinated: 5720000000, lowerBound: 100800000, upperBound: 101200000 },
  { date: '2025-04-08', predictedCases: 101234567, predictedDeaths: 2422233, predictedVaccinated: 5740000000, lowerBound: 101000000, upperBound: 101400000 },
  { date: '2025-04-15', predictedCases: 101456789, predictedDeaths: 2433344, predictedVaccinated: 5760000000, lowerBound: 101200000, upperBound: 101600000 },
  { date: '2025-04-22', predictedCases: 101678901, predictedDeaths: 2444455, predictedVaccinated: 5780000000, lowerBound: 101400000, upperBound: 101800000 },
  { date: '2025-04-29', predictedCases: 101901234, predictedDeaths: 2455566, predictedVaccinated: 5800000000, lowerBound: 101600000, upperBound: 102000000 },
  { date: '2025-05-06', predictedCases: 102123456, predictedDeaths: 2466677, predictedVaccinated: 5820000000, lowerBound: 101800000, upperBound: 102300000 },
  { date: '2025-05-13', predictedCases: 102345678, predictedDeaths: 2477788, predictedVaccinated: 5840000000, lowerBound: 102000000, upperBound: 102500000 },
  { date: '2025-05-20', predictedCases: 102567890, predictedDeaths: 2488899, predictedVaccinated: 5860000000, lowerBound: 102200000, upperBound: 102800000 },
  { date: '2025-05-27', predictedCases: 102790123, predictedDeaths: 2500010, predictedVaccinated: 5880000000, lowerBound: 102400000, upperBound: 103000000 },
  { date: '2025-06-03', predictedCases: 103012345, predictedDeaths: 2511121, predictedVaccinated: 5900000000, lowerBound: 102600000, upperBound: 103300000 }
];

export const usStates = [
  { state: 'California', totalCases: 12089012, activeCases: 234567, recovered: 11764445, deaths: 90000, vaccinated: 32000000, population: 39510000, lat: 36.7783, lng: -119.4179, trend: -1.5 },
  { state: 'Texas', totalCases: 7234567, activeCases: 123456, recovered: 7051111, deaths: 60000, vaccinated: 21000000, population: 29000000, lat: 31.9686, lng: -99.9018, trend: 0.8 },
  { state: 'Florida', totalCases: 7567890, activeCases: 156789, recovered: 7329101, deaths: 82000, vaccinated: 17000000, population: 21480000, lat: 27.6648, lng: -81.5158, trend: 1.2 },
  { state: 'New York', totalCases: 6345678, activeCases: 89012, recovered: 6186666, deaths: 70000, vaccinated: 16000000, population: 19450000, lat: 42.1657, lng: -74.9481, trend: -2.1 },
  { state: 'Pennsylvania', totalCases: 3789012, activeCases: 67890, recovered: 3691122, deaths: 30000, vaccinated: 9000000, population: 12800000, lat: 41.2033, lng: -77.1945, trend: -0.9 },
  { state: 'Illinois', totalCases: 3901234, activeCases: 78901, recovered: 3782333, deaths: 40000, vaccinated: 8500000, population: 12670000, lat: 40.6331, lng: -89.3985, trend: -1.3 }
];

export const indiaStates = [
  { state: 'Maharashtra', totalCases: 8123456, activeCases: 45678, recovered: 7930778, deaths: 147000, vaccinated: 112000000, population: 112370000, lat: 19.7515, lng: 75.7139, trend: 0.5 },
  { state: 'Kerala', totalCases: 6789012, activeCases: 34567, recovered: 6632445, deaths: 122000, vaccinated: 35000000, population: 33410000, lat: 10.8505, lng: 76.2711, trend: 1.8 },
  { state: 'Karnataka', totalCases: 4012345, activeCases: 23456, recovered: 3948889, deaths: 40000, vaccinated: 68000000, population: 61130000, lat: 15.3173, lng: 75.7139, trend: -0.6 },
  { state: 'Tamil Nadu', totalCases: 3567890, activeCases: 19012, recovered: 3512878, deaths: 36000, vaccinated: 72000000, population: 72150000, lat: 11.1271, lng: 78.6569, trend: -1.2 },
  { state: 'Uttar Pradesh', totalCases: 2123456, activeCases: 12345, recovered: 2088111, deaths: 23000, vaccinated: 195000000, population: 199810000, lat: 26.8467, lng: 80.9462, trend: 0.3 },
  { state: 'Delhi', totalCases: 2034567, activeCases: 15678, recovered: 1992889, deaths: 26000, vaccinated: 19000000, population: 16790000, lat: 28.7041, lng: 77.1025, trend: -0.8 }
];
