'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, TrendingUp, Skull, Syringe, Upload, Brain, Globe as GlobeIcon, BarChart3 } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { TimeSeriesChart } from '@/components/Charts';
import CountryView from '@/components/CountryView';
import PredictionPanel from '@/components/PredictionPanel';
import UploadPanel from '@/components/UploadPanel';
import { CountryData, StateData, CovidData } from '@/types/covid';
import { sampleCountries, sampleTimeSeries, samplePredictions, usStates, indiaStates } from '@/lib/sampleData';

const Globe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

type ViewMode = 'dashboard' | 'predictions' | 'upload';

export default function Home() {
  const [countries, setCountries] = useState<CountryData[]>(sampleCountries);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [showUpload, setShowUpload] = useState(false);

  const globalStats = {
    totalCases: countries.reduce((sum, c) => sum + c.totalCases, 0),
    activeCases: countries.reduce((sum, c) => sum + c.activeCases, 0),
    recovered: countries.reduce((sum, c) => sum + c.recovered, 0),
    deaths: countries.reduce((sum, c) => sum + c.deaths, 0),
    vaccinated: countries.reduce((sum, c) => sum + c.vaccinated, 0),
    population: countries.reduce((sum, c) => sum + c.population, 0),
  };

  const vaccinationRate = (globalStats.vaccinated / globalStats.population) * 100;

  const handleDataUpload = (data: CovidData[]) => {
    const countryMap = new Map<string, CountryData>();

    data.forEach(item => {
      if (!countryMap.has(item.country)) {
        countryMap.set(item.country, {
          country: item.country,
          totalCases: 0,
          activeCases: 0,
          recovered: 0,
          deaths: 0,
          vaccinated: 0,
          population: 0,
          lat: item.lat,
          lng: item.lng,
          trend: 0,
        });
      }

      const country = countryMap.get(item.country)!;
      country.totalCases += item.totalCases;
      country.activeCases += item.activeCases;
      country.recovered += item.recovered;
      country.deaths += item.deaths;
      country.vaccinated += item.vaccinated;
      country.population += item.population;
    });

    setCountries(Array.from(countryMap.values()));
    setShowUpload(false);
  };

  const getStatesForCountry = (country: string): StateData[] => {
    if (country === 'United States') return usStates;
    if (country === 'India') return indiaStates;
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-slate-900/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">COVID-19 Global Analytics</h1>
                <p className="text-xs text-gray-400">Real-time Pandemic Monitoring Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  viewMode === 'dashboard'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <GlobeIcon className="w-4 h-4 inline mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setViewMode('predictions')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  viewMode === 'predictions'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Brain className="w-4 h-4 inline mr-2" />
                Predictions
              </button>
              <button
                onClick={() => setShowUpload(true)}
                className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload Data
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                  title="Total Cases"
                  value={globalStats.totalCases}
                  trend={1.2}
                  color="from-blue-500 to-blue-600"
                  icon={<Activity className="w-6 h-6 text-white" />}
                />
                <StatCard
                  title="Active Cases"
                  value={globalStats.activeCases}
                  trend={-0.8}
                  color="from-orange-500 to-orange-600"
                  icon={<Heart className="w-6 h-6 text-white" />}
                />
                <StatCard
                  title="Recovered"
                  value={globalStats.recovered}
                  trend={2.1}
                  color="from-green-500 to-green-600"
                  icon={<TrendingUp className="w-6 h-6 text-white" />}
                />
                <StatCard
                  title="Deaths"
                  value={globalStats.deaths}
                  trend={-1.5}
                  color="from-red-500 to-red-600"
                  icon={<Skull className="w-6 h-6 text-white" />}
                />
                <StatCard
                  title="Vaccination Rate"
                  value={vaccinationRate}
                  trend={3.2}
                  color="from-purple-500 to-purple-600"
                  icon={<Syringe className="w-6 h-6 text-white" />}
                  format="percentage"
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Globe */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <GlobeIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Global Overview</h2>
                      <p className="text-sm text-gray-400">Click on a country to view details</p>
                    </div>
                  </div>
                  <div className="h-[500px] rounded-xl overflow-hidden bg-slate-900/50">
                    <Globe
                      countries={countries}
                      onCountryClick={setSelectedCountry}
                      selectedCountry={selectedCountry}
                    />
                  </div>
                </motion.div>

                {/* Time Series Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                      <BarChart3 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Trend Analysis</h2>
                      <p className="text-sm text-gray-400">Last 6 months global statistics</p>
                    </div>
                  </div>
                  <div className="h-[500px]">
                    <TimeSeriesChart data={sampleTimeSeries} />
                  </div>
                </motion.div>
              </div>

              {/* Top Countries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Most Affected Countries</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {countries
                    .sort((a, b) => b.totalCases - a.totalCases)
                    .slice(0, 8)
                    .map((country, index) => (
                      <motion.div
                        key={country.country}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        onClick={() => setSelectedCountry(country)}
                        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {country.country}
                          </h3>
                          <span className="text-xs text-gray-400">#{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cases:</span>
                            <span className="text-blue-400 font-medium">{country.totalCases.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Deaths:</span>
                            <span className="text-red-400 font-medium">{country.deaths.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {viewMode === 'predictions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <PredictionPanel
                timeSeries={sampleTimeSeries}
                predictions={samplePredictions}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedCountry && (
          <CountryView
            country={selectedCountry}
            states={getStatesForCountry(selectedCountry.country)}
            onClose={() => setSelectedCountry(null)}
          />
        )}

        {showUpload && (
          <UploadPanel
            onDataUpload={handleDataUpload}
            onClose={() => setShowUpload(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
