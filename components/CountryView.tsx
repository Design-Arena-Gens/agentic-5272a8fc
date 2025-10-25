'use client';

import { motion } from 'framer-motion';
import { X, MapPin, Users, Activity, Heart, Skull, Syringe, TrendingUp, TrendingDown } from 'lucide-react';
import { CountryData, StateData } from '@/types/covid';
import { RegionBarChart, VaccinationChart } from './Charts';

interface CountryViewProps {
  country: CountryData;
  states: StateData[];
  onClose: () => void;
  onStateClick?: (state: StateData) => void;
}

export default function CountryView({ country, states, onClose, onStateClick }: CountryViewProps) {
  const vaccinationRate = (country.vaccinated / country.population) * 100;
  const deathRate = (country.deaths / country.totalCases) * 100;
  const recoveryRate = (country.recovered / country.totalCases) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{country.country}</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Detailed Statistics & Regional Breakdown</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm">Total Cases</p>
              </div>
              <p className="text-2xl font-bold text-white">{country.totalCases.toLocaleString()}</p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-orange-500/20">
                  <Heart className="w-5 h-5 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm">Active Cases</p>
              </div>
              <p className="text-2xl font-bold text-white">{country.activeCases.toLocaleString()}</p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-gray-400 text-sm">Recovered</p>
              </div>
              <p className="text-2xl font-bold text-white">{country.recovered.toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-1">{recoveryRate.toFixed(1)}% recovery rate</p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <Skull className="w-5 h-5 text-red-400" />
                </div>
                <p className="text-gray-400 text-sm">Deaths</p>
              </div>
              <p className="text-2xl font-bold text-white">{country.deaths.toLocaleString()}</p>
              <p className="text-xs text-red-400 mt-1">{deathRate.toFixed(2)}% fatality rate</p>
            </div>
          </div>

          {/* Vaccination & Population Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Syringe className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Vaccination Coverage</h3>
              </div>
              <div className="h-64">
                <VaccinationChart
                  vaccinated={country.vaccinated}
                  population={country.population}
                />
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Population Statistics</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total Population</span>
                    <span className="text-white font-semibold">{country.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Vaccinated</span>
                    <span className="text-green-400 font-semibold">{country.vaccinated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Vaccination Rate</span>
                    <span className="text-blue-400 font-semibold">{vaccinationRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Infection Rate</span>
                    <span className="text-orange-400 font-semibold">
                      {((country.totalCases / country.population) * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">7-Day Trend</span>
                    <div className={`flex items-center gap-1 ${country.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {country.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="font-semibold">{Math.abs(country.trend)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Breakdown */}
          {states.length > 0 && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Regional Breakdown</h3>
              <div className="h-80 mb-6">
                <RegionBarChart data={states} />
              </div>

              {/* States List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {states.map((state, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onStateClick?.(state)}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{state.state}</h4>
                      <div className={`flex items-center gap-1 text-xs ${state.trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {state.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{Math.abs(state.trend)}%</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cases:</span>
                        <span className="text-blue-400 font-medium">{state.totalCases.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Active:</span>
                        <span className="text-orange-400 font-medium">{state.activeCases.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Deaths:</span>
                        <span className="text-red-400 font-medium">{state.deaths.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
