'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, AlertCircle, CheckCircle, X } from 'lucide-react';
import Papa from 'papaparse';
import { CovidData } from '@/types/covid';

interface UploadPanelProps {
  onDataUpload: (data: CovidData[]) => void;
  onClose: () => void;
}

export default function UploadPanel({ onDataUpload, onClose }: UploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processCSV = useCallback((file: File) => {
    setIsProcessing(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const parsedData: CovidData[] = results.data
            .filter((row: any) => row.country && row.totalCases)
            .map((row: any) => ({
              country: row.country || row.Country || row.location || '',
              state: row.state || row.State || row.province || undefined,
              date: row.date || row.Date || new Date().toISOString().split('T')[0],
              totalCases: parseInt(row.totalCases || row.total_cases || row.cases || '0'),
              activeCases: parseInt(row.activeCases || row.active_cases || row.active || '0'),
              recovered: parseInt(row.recovered || row.Recovered || '0'),
              deaths: parseInt(row.deaths || row.Deaths || '0'),
              vaccinated: parseInt(row.vaccinated || row.Vaccinated || row.people_vaccinated || '0'),
              population: parseInt(row.population || row.Population || '1000000'),
              lat: parseFloat(row.lat || row.latitude || row.Latitude || '0'),
              lng: parseFloat(row.lng || row.longitude || row.Longitude || '0'),
            }));

          if (parsedData.length === 0) {
            throw new Error('No valid data found in CSV file');
          }

          onDataUpload(parsedData);
          setSuccess(true);
          setTimeout(() => {
            onClose();
          }, 1500);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to process CSV file');
        } finally {
          setIsProcessing(false);
        }
      },
      error: (error) => {
        setError(`CSV parsing error: ${error.message}`);
        setIsProcessing(false);
      },
    });
  }, [onDataUpload, onClose]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      processCSV(droppedFile);
    } else {
      setError('Please upload a valid CSV file');
    }
  }, [processCSV]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      processCSV(selectedFile);
    } else {
      setError('Please upload a valid CSV file');
    }
  }, [processCSV]);

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
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Upload COVID-19 Data</h2>
              <p className="text-gray-400 text-sm">
                Import your CSV file to visualize custom COVID-19 statistics
              </p>
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
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
              ${isDragging ? 'border-blue-400 bg-blue-500/10' : 'border-white/20 bg-white/5'}
              ${!isProcessing && !success ? 'hover:border-blue-400 hover:bg-blue-500/5 cursor-pointer' : ''}
            `}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing || success}
            />

            {!isProcessing && !success && !file && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-blue-500/20">
                    <Upload className="w-12 h-12 text-blue-400" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white mb-2">
                    Drop your CSV file here
                  </p>
                  <p className="text-gray-400 text-sm">
                    or click to browse from your computer
                  </p>
                </div>
              </div>
            )}

            {file && !success && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-purple-500/20">
                    <File className="w-12 h-12 text-purple-400" />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white mb-1">{file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                {isProcessing && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-400 font-medium">Processing...</p>
                  </div>
                )}
              </div>
            )}

            {success && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-green-500/20">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>
                <div>
                  <p className="text-xl font-semibold text-green-400 mb-2">
                    Upload Successful!
                  </p>
                  <p className="text-gray-400 text-sm">
                    Your data has been imported and visualizations are updating...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-400 mb-1">Upload Error</p>
                  <p className="text-sm text-gray-400">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* CSV Format Guide */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-3">Required CSV Format</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="font-mono text-xs bg-slate-950/50 p-2 rounded border border-white/10">
                country, totalCases, activeCases, recovered, deaths, vaccinated, population, lat, lng
              </p>
              <ul className="space-y-1 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>country</strong>: Country name (required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>totalCases</strong>: Total confirmed cases (required)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>state</strong>: State/region name (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span><strong>lat, lng</strong>: Coordinates for map plotting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
