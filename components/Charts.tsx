'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TimeSeriesData, StateData, PredictionData } from '@/types/covid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  predictions?: PredictionData[];
}

export function TimeSeriesChart({ data, predictions }: TimeSeriesChartProps) {
  const allData = [...data, ...(predictions || [])];
  const historicalLength = data.length;

  const chartData = {
    labels: allData.map((d, i) =>
      new Date(i < historicalLength ? data[i].date : predictions![i - historicalLength].date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Total Cases',
        data: allData.map((d, i) =>
          i < historicalLength ? data[i].cases : predictions![i - historicalLength].predictedCases
        ) as any,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: allData.map((_, i) => i < historicalLength - 1 ? 0 : 4) as any,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        segment: {
          borderDash: (ctx: any) => ctx.p0DataIndex >= historicalLength - 1 ? [5, 5] : undefined,
        },
      },
      {
        label: 'Deaths',
        data: allData.map((d, i) =>
          i < historicalLength ? data[i].deaths : predictions![i - historicalLength].predictedDeaths
        ) as any,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: allData.map((_, i) => i < historicalLength - 1 ? 0 : 4) as any,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        segment: {
          borderDash: (ctx: any) => ctx.p0DataIndex >= historicalLength - 1 ? [5, 5] : undefined,
        },
      },
      {
        label: 'Recovered',
        data: data.map(d => d.recovered) as any,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgb(203, 213, 225)',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgb(226, 232, 240)',
        bodyColor: 'rgb(203, 213, 225)',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          display: true,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          display: true,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          callback: function(tickValue) {
            return (tickValue as number).toLocaleString();
          }
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

interface RegionBarChartProps {
  data: StateData[];
}

export function RegionBarChart({ data }: RegionBarChartProps) {
  const sortedData = [...data].sort((a, b) => b.totalCases - a.totalCases).slice(0, 10);

  const chartData = {
    labels: sortedData.map(d => d.state),
    datasets: [
      {
        label: 'Total Cases',
        data: sortedData.map(d => d.totalCases),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Deaths',
        data: sortedData.map(d => d.deaths),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: 'Recovered',
        data: sortedData.map(d => d.recovered),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgb(203, 213, 225)',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgb(226, 232, 240)',
        bodyColor: 'rgb(203, 213, 225)',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: 'rgb(148, 163, 184)',
          callback: function(tickValue) {
            return (tickValue as number).toLocaleString();
          }
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

interface VaccinationChartProps {
  vaccinated: number;
  population: number;
}

export function VaccinationChart({ vaccinated, population }: VaccinationChartProps) {
  const unvaccinated = population - vaccinated;
  const vaccinationRate = (vaccinated / population) * 100;

  const chartData = {
    labels: ['Vaccinated', 'Unvaccinated'],
    datasets: [
      {
        data: [vaccinated, unvaccinated],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(148, 163, 184, 0.3)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(148, 163, 184)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'rgb(203, 213, 225)',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgb(226, 232, 240)',
        bodyColor: 'rgb(203, 213, 225)',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / population) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="relative h-full">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <p className="text-3xl font-bold text-white">{vaccinationRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-300">Vaccinated</p>
        </div>
      </div>
    </div>
  );
}
