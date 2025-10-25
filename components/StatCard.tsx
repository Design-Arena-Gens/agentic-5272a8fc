'use client';

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  trend?: number;
  color: string;
  icon: React.ReactNode;
  format?: 'number' | 'percentage';
}

export default function StatCard({ title, value, trend, color, icon, format = 'number' }: StatCardProps) {
  const formatValue = (val: number) => {
    if (format === 'percentage') {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString();
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend > 0) return <ArrowUp className="w-4 h-4" />;
    if (trend < 0) return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return 'text-gray-400';
    if (title.includes('Death') || title.includes('Active')) {
      return trend > 0 ? 'text-red-500' : 'text-green-500';
    }
    return trend > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
            {icon}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
        <p className="text-white text-3xl font-bold tracking-tight">
          {formatValue(value)}
        </p>
      </div>
    </motion.div>
  );
}
